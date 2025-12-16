"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import jsPDF from "jspdf";

import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/config";
import { useCart } from "@/components/cart/CartContext";

function OrderPickupSuccessContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const method = searchParams?.get("method") ?? "pay_in_store";
  const name = searchParams?.get("name");
  const email = searchParams?.get("email");
  const pickupTime = searchParams?.get("pickupTime");
  const orderId = searchParams?.get("order");
  const [receiptData, setReceiptData] = useState(null);

  useEffect(() => {
    // Clear cart for both payment methods when user lands on success page
    clearCart();
    
    // Load receipt data from sessionStorage
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("orderReceipt");
      if (stored) {
        try {
          setReceiptData(JSON.parse(stored));
        } catch (err) {
          console.error("Failed to parse receipt data:", err);
        }
      }
    }
  }, [clearCart]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    const receipt = receiptData || {
      orderNumber: orderId || "N/A",
      customerName: name || "N/A",
      customerEmail: email || "N/A",
      pickupTime: pickupTime || "N/A",
      total: 0,
      items: [],
      itemTotal: 0,
      subtotalAfterDiscounts: 0,
      tax: 0,
    };

    // Load and add logo
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    const addLogoToPDF = () => {
      try {
        // Convert image to base64
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const imgData = canvas.toDataURL("image/jpeg");
        
        // Add logo to PDF (top left, 30px height)
        const logoWidth = 30;
        const logoHeight = 30;
        const logoX = 20; // Left margin
        doc.addImage(imgData, "JPEG", logoX, 10, logoWidth, logoHeight);
        
        // Header text below logo
        doc.setFontSize(20);
        doc.setTextColor(220, 38, 38); // brand-red
        doc.text("GYRO CAFE", 105, 50, { align: "center" });
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text("Order Receipt", 105, 58, { align: "center" });
        
        // Order Details
        doc.setFontSize(10);
        let yPos = 70;
        
        doc.text(`Order Number: ${receipt.orderNumber}`, 20, yPos);
        yPos += 8;
        doc.text(`Customer Name: ${receipt.customerName}`, 20, yPos);
        yPos += 8;
        doc.text(`Email: ${receipt.customerEmail}`, 20, yPos);
        yPos += 8;
        doc.text(`Pickup Time: ${receipt.pickupTime}`, 20, yPos);
        yPos += 8;
        doc.text(`Pickup Location: ${siteConfig.address}`, 20, yPos);
        yPos += 8;
        doc.text(`Phone: ${siteConfig.phone}`, 20, yPos);
        yPos += 15;

        // Items
        if (receipt.items && receipt.items.length > 0) {
          doc.setFontSize(12);
          doc.text("Items Ordered:", 20, yPos);
          yPos += 8;
          doc.setFontSize(10);
          
          receipt.items.forEach((item) => {
            const itemText = `${item.quantity}x ${item.name}`;
            const itemPrice = `$${(item.price * item.quantity).toFixed(2)}`;
            doc.text(itemText, 20, yPos);
            doc.text(itemPrice, 180, yPos, { align: "right" });
            yPos += 7;
          });
          yPos += 5;
        }

        // Totals
        doc.setFontSize(10);
        doc.text(`Item Total: $${(receipt.itemTotal || 0).toFixed(2)}`, 20, yPos);
        yPos += 7;
        
        if (receipt.bogoPitaPromo?.discount > 0) {
          doc.text(`BOGO 50% Off Pita: -$${receipt.bogoPitaPromo.discount.toFixed(2)}`, 20, yPos);
          yPos += 7;
        }
        
        if (receipt.promotion?.discount > 0) {
          doc.text(`Promotion: -$${receipt.promotion.discount.toFixed(2)}`, 20, yPos);
          yPos += 7;
        }
        
        doc.text(`Subtotal: $${(receipt.subtotalAfterDiscounts || 0).toFixed(2)}`, 20, yPos);
        yPos += 7;
        // Calculate tax as 8.875% of subtotal if not provided
        const calculatedTax = receipt.tax || (receipt.subtotalAfterDiscounts || 0) * 0.08875;
        doc.text(`Tax (8.875%): $${calculatedTax.toFixed(2)}`, 20, yPos);
        yPos += 7;
        
        doc.setFontSize(12);
        doc.setFont(undefined, "bold");
        // Calculate total if not provided
        const calculatedTotal = receipt.total || (receipt.subtotalAfterDiscounts || 0) + calculatedTax;
        doc.text(`TOTAL: $${calculatedTotal.toFixed(2)}`, 20, yPos);
        yPos += 15;

        // Footer
        doc.setFont(undefined, "normal");
        doc.setFontSize(8);
        doc.text("Thank you for your order!", 105, yPos, { align: "center" });
        yPos += 5;
        doc.text("Please pay in-store when you arrive.", 105, yPos, { align: "center" });

        // Save PDF
        doc.save(`GyroCafe-Receipt-${receipt.orderNumber}.pdf`);
      } catch (error) {
        console.error("Error adding logo to PDF:", error);
        // Fallback: save PDF without logo
        doc.save(`GyroCafe-Receipt-${receipt.orderNumber}.pdf`);
      }
    };
    
    img.onload = addLogoToPDF;
    img.onerror = () => {
      // Fallback if logo fails to load - create PDF without logo
      doc.setFontSize(20);
      doc.setTextColor(220, 38, 38);
      doc.text("GYRO CAFE", 105, 20, { align: "center" });
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("Order Receipt", 105, 30, { align: "center" });
      
      doc.setFontSize(10);
      let yPos = 45;
      
      doc.text(`Order Number: ${receipt.orderNumber}`, 20, yPos);
      yPos += 8;
      doc.text(`Customer Name: ${receipt.customerName}`, 20, yPos);
      yPos += 8;
      doc.text(`Email: ${receipt.customerEmail}`, 20, yPos);
      yPos += 8;
      doc.text(`Pickup Time: ${receipt.pickupTime}`, 20, yPos);
      yPos += 8;
      doc.text(`Pickup Location: ${siteConfig.address}`, 20, yPos);
      yPos += 8;
      doc.text(`Phone: ${siteConfig.phone}`, 20, yPos);
      yPos += 15;

      // Items
      if (receipt.items && receipt.items.length > 0) {
        doc.setFontSize(12);
        doc.text("Items Ordered:", 20, yPos);
        yPos += 8;
        doc.setFontSize(10);
        
        receipt.items.forEach((item) => {
          const itemText = `${item.quantity}x ${item.name}`;
          const itemPrice = `$${(item.price * item.quantity).toFixed(2)}`;
          doc.text(itemText, 20, yPos);
          doc.text(itemPrice, 180, yPos, { align: "right" });
          yPos += 7;
        });
        yPos += 5;
      }

      // Totals
      doc.setFontSize(10);
      doc.text(`Item Total: $${(receipt.itemTotal || 0).toFixed(2)}`, 20, yPos);
      yPos += 7;
      
      if (receipt.bogoPitaPromo?.discount > 0) {
        doc.text(`BOGO 50% Off Pita: -$${receipt.bogoPitaPromo.discount.toFixed(2)}`, 20, yPos);
        yPos += 7;
      }
      
      if (receipt.promotion?.discount > 0) {
        doc.text(`Promotion: -$${receipt.promotion.discount.toFixed(2)}`, 20, yPos);
        yPos += 7;
      }
      
      doc.text(`Subtotal: $${(receipt.subtotalAfterDiscounts || 0).toFixed(2)}`, 20, yPos);
      yPos += 7;
      // Calculate tax as 8.875% of subtotal if not provided
      const calculatedTax = receipt.tax || (receipt.subtotalAfterDiscounts || 0) * 0.08875;
      doc.text(`Tax (8.875%): $${calculatedTax.toFixed(2)}`, 20, yPos);
      yPos += 7;
      
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      // Calculate total if not provided
      const calculatedTotal = receipt.total || (receipt.subtotalAfterDiscounts || 0) + calculatedTax;
      doc.text(`TOTAL: $${calculatedTotal.toFixed(2)}`, 20, yPos);
      yPos += 15;

      // Footer
      doc.setFont(undefined, "normal");
      doc.setFontSize(8);
      doc.text("Thank you for your order!", 105, yPos, { align: "center" });
      yPos += 5;
      doc.text("Please pay in-store when you arrive.", 105, yPos, { align: "center" });

      // Save PDF
      doc.save(`GyroCafe-Receipt-${receipt.orderNumber}.pdf`);
    };
    
    // Start loading the image
    img.src = "/logo.jpeg";
    
    // If image is already cached, onload might not fire, so check complete
    if (img.complete) {
      addLogoToPDF();
    }
  };

  useEffect(() => {
    // Clear cart for both payment methods when user lands on success page
    clearCart();
  }, [clearCart]);

  const heading =
    method === "pay_online"
      ? "Payment Confirmed"
      : "Pickup Order Received";

  return (
    <main className="flex flex-col ">
      <Section background="red">
        <div className="space-y-4 text-white py-10">
          <p className="text-lg uppercase tracking-[0.4em] text-white">
            Gyro Cafe Pickup
          </p>
          <h1 className="text-4xl font-bold uppercase tracking-tight md:text-5xl">
            {heading}
          </h1>
          <p className="text-base leading-relaxed text-white/80 md:text-lg">
            {method === "pay_online"
              ? "Your payment is secured. We’re firing up the grill so your order is ready when you arrive."
              : "We’ve got your pickup order queued. Swing by the counter and pay in-store when you arrive."}
          </p>
        </div>
      </Section>

      <Section background="white">
        <div className="space-y-6 text-sm text-neutral-600 py-10">
          {/* Receipt Information */}
          <div className="rounded-2xl border-2 border-brand-red/20 bg-brand-red/5 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold uppercase tracking-wide text-brand-dark">
                Order Receipt
              </h3>
              <Button 
                onClick={downloadPDF}
                variant="outline"
                className="text-xs px-4 py-2"
              >
                Download Receipt PDF
              </Button>
            </div>
            
            {orderId ? (
              <div>
                <span className="text-xs uppercase tracking-wide text-neutral-500">Order Number</span>
                <p className="text-xl font-bold text-brand-dark mt-1">{orderId}</p>
              </div>
            ) : null}
            
            {name ? (
              <div>
                <span className="text-xs uppercase tracking-wide text-neutral-500">Customer Name</span>
                <p className="text-base font-semibold text-brand-dark mt-1">{name}</p>
              </div>
            ) : null}
            
            {email ? (
              <div>
                <span className="text-xs uppercase tracking-wide text-neutral-500">Email</span>
                <p className="text-base font-semibold text-brand-dark mt-1">{email}</p>
              </div>
            ) : null}
            
            {pickupTime ? (
              <div>
                <span className="text-xs uppercase tracking-wide text-neutral-500">Pickup Time</span>
                <p className="text-base font-semibold text-brand-dark mt-1">{pickupTime}</p>
              </div>
            ) : null}
          </div>
          
          {name ? (
            <p className="text-base font-semibold uppercase tracking-wide text-brand-dark">
              Thank you, {name}!
            </p>
          ) : null}
          <p>
            <span className="font-semibold text-brand-dark">Pickup location:</span>{" "}
            {siteConfig.address}
          </p>
          <p>
            Need to make changes? Call us at{" "}
            <a href={`tel:${siteConfig.phone}`} className="text-brand-red">
              {siteConfig.phone}
            </a>{" "}
            and we’ll help you out.
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            <Button href="/menu" variant="outline">
              Order More Food
            </Button>
            <Button href="/" variant="outline">
              Back to Home
            </Button>
          </div>

          {method === "pay_online" ? (
            <p className="text-xs uppercase tracking-widest text-neutral-500">
              A receipt has been sent to your email from Stripe.
            </p>
          ) : (
            <p className="text-xs uppercase tracking-widest text-neutral-500">
              Pay at Gyro Cafe when you arrive. Card & cash accepted in-store.
            </p>
          )}
        </div>
      </Section>
    </main>
  );
}

export default function OrderPickupSuccess() {
  return (
    <Suspense fallback={
      <main className="flex flex-col">
        <Section background="red">
          <div className="space-y-4 text-white py-10">
            <p className="text-lg uppercase tracking-[0.4em] text-white">
              Gyro Cafe Pickup
            </p>
            <h1 className="text-4xl font-bold uppercase tracking-tight md:text-5xl">
              Loading...
            </h1>
          </div>
        </Section>
      </main>
    }>
      <OrderPickupSuccessContent />
    </Suspense>
  );
}

