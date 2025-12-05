"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";

import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/config";
import { useCart } from "@/components/cart/CartContext";

export default function OrderPickupThankYou() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [receiptData, setReceiptData] = useState(null);
  const { clearCart } = useCart();

  useEffect(() => {
    // Retrieve order details from sessionStorage
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("pendingOrder");
      if (stored) {
        try {
          setOrderDetails(JSON.parse(stored));
          // Clear the stored data after reading
          sessionStorage.removeItem("pendingOrder");
        } catch (err) {
          console.error("Failed to parse order details:", err);
        }
      }
      
      // Load receipt data
      const receiptStored = sessionStorage.getItem("orderReceipt");
      if (receiptStored) {
        try {
          setReceiptData(JSON.parse(receiptStored));
        } catch (err) {
          console.error("Failed to parse receipt data:", err);
        }
      }
    }
    
    // Clear cart when user returns from successful Stripe payment
    clearCart();
  }, [clearCart]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    const receipt = receiptData || {
      orderNumber: orderDetails?.name || "N/A",
      customerName: orderDetails?.name || "N/A",
      customerEmail: orderDetails?.email || "N/A",
      pickupTime: orderDetails?.pickupTime || "N/A",
      total: orderDetails?.total || 0,
      items: [],
      itemTotal: 0,
      subtotalAfterDiscounts: 0,
      tax: 0,
    };

    // Header
    doc.setFontSize(20);
    doc.setTextColor(220, 38, 38); // brand-red
    doc.text("GYRO CAFE", 105, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Order Receipt", 105, 30, { align: "center" });
    
    // Order Details
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
    doc.text(`Tax (8.875%): $${(receipt.tax || 0).toFixed(2)}`, 20, yPos);
    yPos += 7;
    
    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.text(`TOTAL: $${(receipt.total || 0).toFixed(2)}`, 20, yPos);
    yPos += 15;

    // Footer
    doc.setFont(undefined, "normal");
    doc.setFontSize(8);
    doc.text("Thank you for your order!", 105, yPos, { align: "center" });
    yPos += 5;
    doc.text("Payment confirmed via Stripe.", 105, yPos, { align: "center" });

    // Save PDF
    doc.save(`GyroCafe-Receipt-${receipt.orderNumber}.pdf`);
  };

  return (
    <main className="flex flex-col">
      <Section background="red">
        <div className="space-y-4 text-white py-10">
          <p className="text-lg uppercase tracking-[0.4em] text-white">
            Gyro Cafe Pickup
          </p>
          <h1 className="text-4xl font-bold uppercase tracking-tight md:text-5xl">
            Payment Confirmed
          </h1>
          <p className="text-base leading-relaxed text-white/80 md:text-lg">
            Your payment is secured. We&apos;re firing up the grill so your order
            is ready when you arrive.
          </p>
        </div>
      </Section>

      <Section background="white">
        <div className="space-y-6 text-sm text-neutral-600 py-10">
          {/* Receipt Information */}
          {(receiptData || orderDetails) && (
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
              
              {receiptData?.orderNumber && (
                <div>
                  <span className="text-xs uppercase tracking-wide text-neutral-500">Order Number</span>
                  <p className="text-xl font-bold text-brand-dark mt-1">{receiptData.orderNumber}</p>
                </div>
              )}
              
              {(receiptData?.customerName || orderDetails?.name) && (
                <div>
                  <span className="text-xs uppercase tracking-wide text-neutral-500">Customer Name</span>
                  <p className="text-base font-semibold text-brand-dark mt-1">
                    {receiptData?.customerName || orderDetails?.name}
                  </p>
                </div>
              )}
              
              {(receiptData?.customerEmail || orderDetails?.email) && (
                <div>
                  <span className="text-xs uppercase tracking-wide text-neutral-500">Email</span>
                  <p className="text-base font-semibold text-brand-dark mt-1">
                    {receiptData?.customerEmail || orderDetails?.email}
                  </p>
                </div>
              )}
              
              {(receiptData?.pickupTime || orderDetails?.pickupTime) && (
                <div>
                  <span className="text-xs uppercase tracking-wide text-neutral-500">Pickup Time</span>
                  <p className="text-base font-semibold text-brand-dark mt-1">
                    {receiptData?.pickupTime || orderDetails?.pickupTime}
                  </p>
                </div>
              )}
            </div>
          )}
          
          {orderDetails?.name ? (
            <p className="text-base font-semibold uppercase tracking-wide text-brand-dark">
              Thank you, {orderDetails.name}!
            </p>
          ) : (
            <p className="text-base font-semibold uppercase tracking-wide text-brand-dark">
              Thank you for your order!
            </p>
          )}
          <p>
            <span className="font-semibold text-brand-dark">Pickup location:</span>{" "}
            {siteConfig.address}
          </p>
          <p>
            Need to make changes? Call us at{" "}
            <a href={`tel:${siteConfig.phone}`} className="text-brand-red">
              {siteConfig.phone}
            </a>{" "}
            and we&apos;ll help you out.
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            <Button href="/menu" variant="outline">
              Order More Food
            </Button>
            <Button href="/" variant="outline">
              Back to Home
            </Button>
          </div>

          <p className="text-xs uppercase tracking-widest text-neutral-500">
            A receipt has been sent to your email from Stripe.
          </p>
        </div>
      </Section>
    </main>
  );
}

