"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import jsPDF from "jspdf";

import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/config";
import { useCart } from "@/components/cart/CartContext";

function OrderPickupThankYouContent() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [receiptData, setReceiptData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { clearCart } = useCart();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (typeof window === "undefined") return;

      // Clear cart when user returns from successful Stripe payment
      clearCart();

      // Get session_id from URL params or sessionStorage
      let sessionId = searchParams?.get("session_id");
      
      if (!sessionId) {
        // Try to get from sessionStorage (stored as orderNumber in orderReceipt)
        const receiptStored = sessionStorage.getItem("orderReceipt");
        if (receiptStored) {
          try {
            const stored = JSON.parse(receiptStored);
            // The orderNumber might be the session_id if it starts with "cs_"
            if (stored.orderNumber && (stored.orderNumber.startsWith("cs_") || stored.orderNumber.startsWith("cs_test_"))) {
              sessionId = stored.orderNumber;
            }
          } catch (err) {
            console.error("Failed to parse stored receipt:", err);
          }
        }
      }

      if (!sessionId) {
        // Fallback to sessionStorage data if no session_id
        const stored = sessionStorage.getItem("pendingOrder");
        if (stored) {
          try {
            setOrderDetails(JSON.parse(stored));
            sessionStorage.removeItem("pendingOrder");
          } catch (err) {
            console.error("Failed to parse order details:", err);
          }
        }
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Fetch checkout session data
        const response = await fetch(`/api/payment/checkout-session/${sessionId}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }

        const sessionData = await response.json();

        // Parse the session data
        const amountSubtotal = (sessionData.amount_subtotal || 0) / 100;
        const amountTotal = (sessionData.amount_total || 0) / 100;
        const tax = amountTotal - amountSubtotal; // Calculate tax from difference

        // Parse orderItems from metadata
        let orderItems = [];
        if (sessionData.metadata?.orderItems) {
          try {
            orderItems = JSON.parse(sessionData.metadata.orderItems);
          } catch (err) {
            console.error("Failed to parse orderItems:", err);
          }
        }

        // Get menu items and upsell config to map itemIds to names
        const { menuItems } = await import("@/lib/menuData");
        const { upsellConfig } = await import("@/lib/promotionsConfig");
        
        const itemsWithNames = orderItems.map((orderItem) => {
          let menuItem = menuItems.find((item) => item.id === orderItem.itemId);
          
          // Handle upsell items (e.g., "french-fries-upsell", "coke-can-upsell")
          if (!menuItem && orderItem.itemId.endsWith("-upsell")) {
            const baseId = orderItem.itemId.replace("-upsell", "");
            menuItem = menuItems.find((item) => item.id === baseId);
            
            // Get upsell name from config
            if (baseId === "french-fries") {
              return {
                ...orderItem,
                name: upsellConfig.products.fries.name,
                price: orderItem.unitPrice || 0,
                quantity: orderItem.quantity || 1,
              };
            } else if (baseId === "coke-can") {
              return {
                ...orderItem,
                name: upsellConfig.products.drink.name,
                price: orderItem.unitPrice || 0,
                quantity: orderItem.quantity || 1,
              };
            }
          }
          
          return {
            ...orderItem,
            name: menuItem?.name || orderItem.itemId,
            price: orderItem.unitPrice || 0,
            quantity: orderItem.quantity || 1,
          };
        });

        // Get pickupTime from metadata or sessionStorage fallback
        let pickupTime = sessionData.metadata?.pickupTime || sessionData.metadata?.pickup_time;
        if (!pickupTime || pickupTime === "N/A") {
          const stored = sessionStorage.getItem("pendingOrder");
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              pickupTime = parsed.pickupTime;
            } catch (err) {
              // Ignore
            }
          }
        }

        // Build receipt data
        const receipt = {
          orderNumber: sessionData.metadata?.orderNumber || sessionData.session_id,
          customerName: sessionData.customer_details?.name || "",
          customerEmail: sessionData.customer_details?.email || "",
          pickupTime: pickupTime || "N/A",
          items: itemsWithNames,
          itemTotal: amountSubtotal,
          subtotalAfterDiscounts: amountSubtotal,
          tax: tax,
          total: amountTotal,
          paymentStatus: sessionData.payment_status,
          paymentTransactionId: sessionData.payment_transaction_id,
        };

        setReceiptData(receipt);
        setOrderDetails({
          name: receipt.customerName,
          email: receipt.customerEmail,
          pickupTime: receipt.pickupTime,
          total: receipt.total,
        });

        // Clear sessionStorage after successful fetch
        sessionStorage.removeItem("pendingOrder");
        sessionStorage.removeItem("orderReceipt");
      } catch (err) {
        console.error("Error fetching checkout session:", err);
        setError("Failed to load order details. Please contact support.");
        
        // Fallback to sessionStorage data
        const stored = sessionStorage.getItem("pendingOrder");
        const receiptStored = sessionStorage.getItem("orderReceipt");
        if (stored) {
          try {
            setOrderDetails(JSON.parse(stored));
          } catch (parseErr) {
            console.error("Failed to parse order details:", parseErr);
          }
        }
        if (receiptStored) {
          try {
            setReceiptData(JSON.parse(receiptStored));
          } catch (parseErr) {
            console.error("Failed to parse receipt data:", parseErr);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCheckoutSession();
  }, [searchParams, clearCart]);

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
          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-red border-t-transparent mb-4" />
              <p className="text-base font-semibold text-brand-dark">
                Loading order details...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="rounded-2xl border-2 border-brand-red/30 bg-brand-red/10 p-6">
              <p className="text-base font-semibold text-brand-red">{error}</p>
            </div>
          )}

          {/* Receipt Information */}
          {!isLoading && (receiptData || orderDetails) && (
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

              {/* Order Items */}
              {receiptData?.items && receiptData.items.length > 0 && (
                <div className="pt-4 border-t border-neutral-200">
                  <span className="text-xs uppercase tracking-wide text-neutral-500">Items Ordered</span>
                  <div className="mt-2 space-y-2">
                    {receiptData.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-brand-dark">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-semibold text-brand-dark">
                          ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Totals */}
              {receiptData && (
                <div className="pt-4 border-t border-neutral-200 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-semibold text-brand-dark">
                      ${(receiptData.itemTotal || 0).toFixed(2)}
                    </span>
                  </div>
                  {receiptData.tax > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Tax (8.875%)</span>
                      <span className="font-semibold text-brand-dark">
                        ${(receiptData.tax || 0).toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-base pt-2 border-t border-neutral-200">
                    <span className="font-bold text-brand-dark">Total</span>
                    <span className="font-bold text-brand-dark">
                      ${(receiptData.total || 0).toFixed(2)}
                    </span>
                  </div>
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

export default function OrderPickupThankYou() {
  return (
    <Suspense
      fallback={
        <main className="flex flex-col">
          <Section background="red">
            <div className="space-y-4 text-white py-10">
              <p className="text-lg uppercase tracking-[0.4em] text-white">
                Gyro Cafe Pickup
              </p>
              <h1 className="text-4xl font-bold uppercase tracking-tight md:text-5xl">
                Payment Confirmed
              </h1>
            </div>
          </Section>
          <Section background="white">
            <div className="flex flex-col items-center justify-center py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-red border-t-transparent mb-4" />
              <p className="text-base font-semibold text-brand-dark">
                Loading...
              </p>
            </div>
          </Section>
        </main>
      }
    >
      <OrderPickupThankYouContent />
    </Suspense>
  );
}

