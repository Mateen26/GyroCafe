"use client";

import { useEffect, useLayoutEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import jsPDF from "jspdf";

import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/config";
import { useCart } from "@/components/cart/CartContext";
import { menuCategories } from "@/lib/menuData";
import { getApiEndpoint } from "@/lib/utils";

function OrderPickupThankYouContent() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [receiptData, setReceiptData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { clearCart } = useCart();
  const searchParams = useSearchParams();

  // Clear cart immediately on mount to prevent restoration from localStorage
  // Use useLayoutEffect to run synchronously before browser paint, ensuring it runs before CartContext initialization
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    
    const STORAGE_KEY = "gyro-cafe-cart";
    // Clear localStorage immediately and synchronously
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn("Failed to clear cart from localStorage:", error);
    }
    
    // Clear cart state
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (typeof window === "undefined") return;

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

        // Fetch checkout session data (uses proxy on Vercel, direct on other hosts)
        const response = await fetch(getApiEndpoint(`checkout-session/${sessionId}`));
        
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }

        const sessionData = await response.json();

        // Parse the session data
        // metadata.amount is the Grand Total, metadata.tax is the tax
        const metadataAmount = parseFloat(sessionData.metadata?.amount) || 0;
        const metadataTax = parseFloat(sessionData.metadata?.tax) || 0;
        const amountSubtotal = (sessionData.amount_subtotal || 0) / 100;
        const amountTotal = (sessionData.amount_total || 0) / 100;
        const tax = amountTotal - amountSubtotal; // Calculate tax from difference (fallback)

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
          
          // Handle large platter items (e.g., "chicken-gyro-platter-large")
          if (!menuItem && orderItem.itemId.endsWith("-large")) {
            const baseId = orderItem.itemId.replace("-large", "");
            menuItem = menuItems.find((item) => item.id === baseId);
            
            // If found, use base platter's name with " - Large" suffix and category
            if (menuItem) {
              return {
                ...orderItem,
                name: `${menuItem.name} - Large`,
                price: orderItem.unitPrice || 0,
                quantity: orderItem.quantity || 1,
                category: menuItem.category || "platters",
              };
            }
          }
          
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
                category: menuItem?.category || "appetizers",
              };
            } else if (baseId === "coke-can") {
              return {
                ...orderItem,
                name: upsellConfig.products.drink.name,
                price: orderItem.unitPrice || 0,
                quantity: orderItem.quantity || 1,
                category: menuItem?.category || "drinks",
              };
            }
          }
          
          return {
            ...orderItem,
            name: menuItem?.name || orderItem.itemId,
            price: orderItem.unitPrice || 0,
            quantity: orderItem.quantity || 1,
            category: menuItem?.category || "other",
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

        // Build receipt data - use metadata values if available, otherwise calculate
        // metadata.amount = Grand Total, metadata.tax = Tax, Subtotal = amount - tax
        const grandTotal = metadataAmount || amountTotal;
        const taxAmount = metadataTax || tax;
        const subtotal = metadataAmount && metadataTax ? (metadataAmount - metadataTax) : (parseFloat(sessionData.metadata?.subtotal) || amountSubtotal);
        
        const receipt = {
          orderNumber: sessionData.metadata?.orderNumber || sessionData.session_id,
          customerName: sessionData.customer_details?.name || "",
          customerEmail: sessionData.customer_details?.email || "",
          pickupTime: pickupTime || "N/A",
          notes: sessionData.metadata?.notes || "",
          items: itemsWithNames,
          itemTotal: parseFloat(sessionData.metadata?.itemTotal) || amountSubtotal,
          subtotalAfterDiscounts: subtotal,
          tax: taxAmount,
          total: grandTotal,
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

  // Helper function to group items by category (matching cart drawer logic)
  const groupItemsByCategory = (items) => {
    const groups = {};
    
    items.forEach((item) => {
      const category = item.category || "other";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
    });

    // Sort categories by menu order
    const sortedGroups = {};
    menuCategories.forEach((cat) => {
      if (groups[cat.id]) {
        sortedGroups[cat.id] = groups[cat.id];
      }
    });
    
    // Add any categories not in menuCategories (like "other")
    Object.keys(groups).forEach((catId) => {
      if (!sortedGroups[catId]) {
        sortedGroups[catId] = groups[catId];
      }
    });

    return sortedGroups;
  };

  // Helper function to get category name
  const getCategoryName = (categoryId) => {
    const category = menuCategories.find((cat) => cat.id === categoryId);
    return category?.name || categoryId;
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const receipt = receiptData || {
      orderNumber: orderDetails?.name || "N/A",
      customerName: orderDetails?.name || "N/A",
      customerEmail: orderDetails?.email || "N/A",
      pickupTime: orderDetails?.pickupTime || "N/A",
      notes: "",
      total: orderDetails?.total || 0,
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
        
        // Add logo to PDF (top left)
        const logoWidth = 25;
        const logoHeight = 25;
        const logoX = 20; // Left margin
        const logoY = 10;
        doc.addImage(imgData, "JPEG", logoX, logoY, logoWidth, logoHeight);
        
        // "Order Receipt" title next to logo
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, "bold");
        doc.text("Order Receipt", logoX + logoWidth + 8, logoY + 12);
        
        // Order number in top-right
        doc.setFontSize(10);
        doc.setFont(undefined, "normal");
        doc.setTextColor(0, 0, 0);
        const orderNumText = `Order #${receipt.orderNumber}`;
        const pageWidth = doc.internal.pageSize.getWidth();
        const orderNumX = pageWidth - 20;
        doc.text(orderNumText, orderNumX, logoY + 8, { align: "right" });
        
        // Green "Paid" badge below order number
        const badgeY = logoY + 14;
        const badgeWidth = 20;
        const badgeHeight = 8;
        doc.setFillColor(34, 197, 94); // Green color
        doc.roundedRect(orderNumX - badgeWidth, badgeY - 4, badgeWidth, badgeHeight, 2, 2, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.setFont(undefined, "bold");
        doc.text("Paid", orderNumX - badgeWidth / 2, badgeY + 1, { align: "center" });
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, "normal");
        
        let yPos = logoY + logoHeight + 12;
        
        // Customer & Pickup Info Box (light gray background) - Two columns layout
        const infoBoxY = yPos;
        const infoBoxHeight = 35;
        const infoBoxWidth = pageWidth - 40;
        doc.setFillColor(243, 244, 246); // Light gray
        doc.roundedRect(20, infoBoxY, infoBoxWidth, infoBoxHeight, 3, 3, "F");
        
        // Calculate column positions
        const leftColumnX = 25;
        const separatorX = 20 + infoBoxWidth / 2; // Middle of the box
        const rightColumnX = separatorX + 5; // Right column starts after separator
        
        // Vertical separator line
        doc.setDrawColor(200, 200, 200); // Light gray line
        doc.setLineWidth(0.5);
        doc.line(separatorX, infoBoxY + 3, separatorX, infoBoxY + infoBoxHeight - 3);
        
        // Left column: Customer info
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        let leftY = infoBoxY + 7;
        doc.text(`Customer: ${receipt.customerName}`, leftColumnX, leftY);
        leftY += 6;
        
        // Email
        doc.setFontSize(9);
        doc.text(`Email: ${receipt.customerEmail}`, leftColumnX, leftY);
        leftY += 6;
        
        // Phone
        doc.text(`Phone: ${siteConfig.phone}`, leftColumnX, leftY);
        
        // Right column: Pickup info
        let rightY = infoBoxY + 7;
        doc.setFontSize(10);
        doc.text(`Pickup Time: ${receipt.pickupTime}`, rightColumnX, rightY);
        rightY += 6;
        
        // Pickup location - split after Brooklyn to wrap
        doc.setFontSize(9);
        doc.text(`Pickup Location: 580 Coney Island Ave, Brooklyn,`, rightColumnX, rightY);
        rightY += 6;
        doc.text(`NY 11218`, rightColumnX, rightY);
        
        yPos = infoBoxY + infoBoxHeight + 8;
        
        // Special Instructions Box (light yellow background) - only if notes exist
        if (receipt.notes && receipt.notes.trim()) {
          const notesBoxY = yPos;
          const notesBoxHeight = 12;
          const notesBoxWidth = pageWidth - 40;
          doc.setFillColor(254, 252, 232); // Light yellow
          doc.roundedRect(20, notesBoxY, notesBoxWidth, notesBoxHeight, 3, 3, "F");
          
          // Notes text
          doc.setFontSize(9);
          doc.setTextColor(0, 0, 0);
          doc.text(`Notes: ${receipt.notes}`, 25, notesBoxY + 7);
          
          yPos = notesBoxY + notesBoxHeight + 10;
        } else {
          yPos += 5;
        }

        // Helper function to add a new page with header
        const addNewPage = () => {
          doc.addPage();
        // Add logo to new page
        doc.addImage(imgData, "JPEG", logoX, logoY, logoWidth, logoHeight);
        // "Order Receipt" title
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, "bold");
        doc.text("Order Receipt", logoX + logoWidth + 8, logoY + 12);
        return logoY + logoHeight + 12; // Return starting yPos for new page
        };

        // Items grouped by category
        if (receipt.items && receipt.items.length > 0) {
          const groupedItems = groupItemsByCategory(receipt.items);
          const pageHeight = 280; // A4 page height in mm
          const bottomMargin = 40; // Space needed for totals and footer
          
          // "ITEMS ORDERED" heading in red
          doc.setFontSize(14);
          doc.setTextColor(220, 38, 38); // Red
          doc.setFont(undefined, "bold");
          doc.text("ITEMS ORDERED", 20, yPos);
          yPos += 10;
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);
          doc.setFont(undefined, "normal");
          
          // Iterate through grouped items
          Object.entries(groupedItems).forEach(([categoryId, categoryItems]) => {
            // Check if we need a new page before adding category header
            if (yPos > pageHeight - bottomMargin - 15) {
              yPos = addNewPage();
            }
            
            // Category header (bold, slightly larger)
            doc.setFontSize(11);
            doc.setFont(undefined, "bold");
            doc.setTextColor(0, 0, 0);
            doc.text(getCategoryName(categoryId), 20, yPos);
            yPos += 8;
            doc.setFontSize(10);
            doc.setFont(undefined, "normal");
            
            // Items in this category
            categoryItems.forEach((item) => {
              // Check if we need a new page before adding item
              if (yPos > pageHeight - bottomMargin - 10) {
                yPos = addNewPage();
                // Re-add category header if we're on a new page
                doc.setFontSize(11);
                doc.setFont(undefined, "bold");
                doc.setTextColor(0, 0, 0);
                doc.text(getCategoryName(categoryId), 20, yPos);
                yPos += 8;
                doc.setFontSize(10);
                doc.setFont(undefined, "normal");
              }
              
              const itemText = item.quantity > 1 
                ? `${item.name} (x${item.quantity})`
                : item.name;
              const itemPrice = `$${(item.price * item.quantity).toFixed(2)}`;
              
              // Draw dotted line from item name to price
              const itemStartX = 25;
              const itemEndX = 170;
              const priceX = 180;
              const lineY = yPos - 2;
              
              // Draw dotted line (simulate with small dashes)
              doc.setDrawColor(200, 200, 200);
              doc.setLineWidth(0.1);
              for (let x = itemStartX + doc.getTextWidth(itemText) + 2; x < priceX - 2; x += 1.5) {
                doc.line(x, lineY, x + 0.8, lineY);
              }
              
              doc.text(itemText, itemStartX, yPos);
              doc.text(itemPrice, priceX, yPos, { align: "right" });
              yPos += 7;
            });
            
            yPos += 3; // Space between categories
          });
          
          yPos += 5; // Space after items
        }

        // Totals - ensure they're on the last page
        const pageHeight = 280;
        const totalsHeight = 50; // Approximate height needed for totals
        if (yPos > pageHeight - totalsHeight) {
          yPos = addNewPage();
        }
        
        // Calculate totals
        const grandTotal = receipt.total || 0;
        const taxAmount = receipt.tax || 0;
        const subtotal = receipt.subtotalAfterDiscounts || (grandTotal - taxAmount);
        const totalItems = receipt.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
        
        // Items count and subtotal
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, "normal");
        doc.text(`Items (${totalItems}): $${subtotal.toFixed(2)}`, 20, yPos);
        yPos += 7;
        
        // Tax with percentage
        const taxPercent = taxAmount > 0 ? ((taxAmount / subtotal) * 100).toFixed(3) : "8.875";
        doc.text(`Tax (${taxPercent}%): $${taxAmount.toFixed(2)}`, 20, yPos);
        yPos += 7;
        
        // GRAND TOTAL in bold red
        doc.setFontSize(12);
        doc.setTextColor(220, 38, 38); // Red
        doc.setFont(undefined, "bold");
        doc.text(`GRAND TOTAL: $${grandTotal.toFixed(2)}`, 20, yPos);
        yPos += 15;

        // Footer
        doc.setFont(undefined, "normal");
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        const footerText = `Thanks for choosing Gyro Cafe. Questions? Call us at ${siteConfig.phone}`;
        doc.text(footerText, pageWidth / 2, yPos, { align: "center", maxWidth: pageWidth - 40 });

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
      const pageWidth = doc.internal.pageSize.getWidth();
      
      // "Order Receipt" title
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, "bold");
      doc.text("Order Receipt", 20, 20);
      
      // Order number in top-right
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.setTextColor(0, 0, 0);
      const orderNumText = `Order #${receipt.orderNumber}`;
      const orderNumX = pageWidth - 20;
      doc.text(orderNumText, orderNumX, 18, { align: "right" });
      
      // Green "Paid" badge
      const badgeY = 24;
      const badgeWidth = 20;
      const badgeHeight = 8;
      doc.setFillColor(34, 197, 94); // Green
      doc.roundedRect(orderNumX - badgeWidth, badgeY - 4, badgeWidth, badgeHeight, 2, 2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.setFont(undefined, "bold");
      doc.text("Paid", orderNumX - badgeWidth / 2, badgeY + 1, { align: "center" });
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, "normal");
      
      let yPos = 35;
      
      // Customer & Pickup Info Box (light gray background) - Two columns layout
      const infoBoxY = yPos;
      const infoBoxHeight = 35;
      const infoBoxWidth = pageWidth - 40;
      doc.setFillColor(243, 244, 246); // Light gray
      doc.roundedRect(20, infoBoxY, infoBoxWidth, infoBoxHeight, 3, 3, "F");
      
      // Calculate column positions
      const leftColumnX = 25;
      const separatorX = 20 + infoBoxWidth / 2; // Middle of the box
      const rightColumnX = separatorX + 5; // Right column starts after separator
      
      // Vertical separator line
      doc.setDrawColor(200, 200, 200); // Light gray line
      doc.setLineWidth(0.5);
      doc.line(separatorX, infoBoxY + 3, separatorX, infoBoxY + infoBoxHeight - 3);
      
      // Left column: Customer info
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      let leftY = infoBoxY + 7;
      doc.text(`Customer: ${receipt.customerName}`, leftColumnX, leftY);
      leftY += 6;
      
      // Email
      doc.setFontSize(9);
      doc.text(`Email: ${receipt.customerEmail}`, leftColumnX, leftY);
      leftY += 6;
      
      // Phone
      doc.text(`Phone: ${siteConfig.phone}`, leftColumnX, leftY);
      
      // Right column: Pickup info
      let rightY = infoBoxY + 7;
      doc.setFontSize(10);
      doc.text(`Pickup Time: ${receipt.pickupTime}`, rightColumnX, rightY);
      rightY += 6;
      
      // Pickup location - split after Brooklyn to wrap
      doc.setFontSize(9);
      doc.text(`Pickup Location: 580 Coney Island Ave, Brooklyn,`, rightColumnX, rightY);
      rightY += 6;
      doc.text(`NY 11218`, rightColumnX, rightY);
      
      yPos = infoBoxY + infoBoxHeight + 8;
      
      // Special Instructions Box (light yellow background) - only if notes exist
      if (receipt.notes && receipt.notes.trim()) {
        const notesBoxY = yPos;
        const notesBoxHeight = 12;
        const notesBoxWidth = pageWidth - 40;
        doc.setFillColor(254, 252, 232); // Light yellow
        doc.roundedRect(20, notesBoxY, notesBoxWidth, notesBoxHeight, 3, 3, "F");
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        doc.text(`Notes: ${receipt.notes}`, 25, notesBoxY + 7);
        yPos = notesBoxY + notesBoxHeight + 10;
      } else {
        yPos += 5;
      }

      // Helper function to add a new page with header (fallback version)
      const addNewPageFallback = () => {
        doc.addPage();
        // "Order Receipt" title
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, "bold");
        doc.text("Order Receipt", 20, 20);
        return 35; // Return starting yPos for new page
      };

      // Items grouped by category
      if (receipt.items && receipt.items.length > 0) {
        const groupedItems = groupItemsByCategory(receipt.items);
        const pageHeight = 280;
        const bottomMargin = 40;
        
        // "ITEMS ORDERED" heading in red
        doc.setFontSize(14);
        doc.setTextColor(220, 38, 38); // Red
        doc.setFont(undefined, "bold");
        doc.text("ITEMS ORDERED", 20, yPos);
        yPos += 10;
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, "normal");
        
        // Iterate through grouped items
        Object.entries(groupedItems).forEach(([categoryId, categoryItems]) => {
          // Check if we need a new page before adding category header
          if (yPos > pageHeight - bottomMargin - 15) {
            yPos = addNewPageFallback();
          }
          
          // Category header (bold, slightly larger)
          doc.setFontSize(11);
          doc.setFont(undefined, "bold");
          doc.setTextColor(0, 0, 0);
          doc.text(getCategoryName(categoryId), 20, yPos);
          yPos += 8;
          doc.setFontSize(10);
          doc.setFont(undefined, "normal");
          
          // Items in this category
          categoryItems.forEach((item) => {
            // Check if we need a new page before adding item
            if (yPos > pageHeight - bottomMargin - 10) {
              yPos = addNewPageFallback();
              // Re-add category header if we're on a new page
              doc.setFontSize(11);
              doc.setFont(undefined, "bold");
              doc.setTextColor(0, 0, 0);
              doc.text(getCategoryName(categoryId), 20, yPos);
              yPos += 8;
              doc.setFontSize(10);
              doc.setFont(undefined, "normal");
            }
            
            const itemText = item.quantity > 1 
              ? `${item.name} (x${item.quantity})`
              : item.name;
            const itemPrice = `$${(item.price * item.quantity).toFixed(2)}`;
            
            // Draw dotted line from item name to price
            const itemStartX = 25;
            const itemEndX = 170;
            const priceX = 180;
            const lineY = yPos - 2;
            
            // Draw dotted line (simulate with small dashes)
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.1);
            for (let x = itemStartX + doc.getTextWidth(itemText) + 2; x < priceX - 2; x += 1.5) {
              doc.line(x, lineY, x + 0.8, lineY);
            }
            
            doc.text(itemText, itemStartX, yPos);
            doc.text(itemPrice, priceX, yPos, { align: "right" });
            yPos += 7;
          });
          
          yPos += 3; // Space between categories
        });
        
        yPos += 5; // Space after items
      }

      // Totals - ensure they're on the last page
      const pageHeight = 280;
      const totalsHeight = 50;
      if (yPos > pageHeight - totalsHeight) {
        yPos = addNewPageFallback();
      }
      
      // Calculate totals
      const grandTotal = receipt.total || 0;
      const taxAmount = receipt.tax || 0;
      const subtotal = receipt.subtotalAfterDiscounts || (grandTotal - taxAmount);
      const totalItems = receipt.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
      
      // Items count and subtotal
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, "normal");
      doc.text(`Items (${totalItems}): $${subtotal.toFixed(2)}`, 20, yPos);
      yPos += 7;
      
      // Tax with percentage
      const taxPercent = taxAmount > 0 ? ((taxAmount / subtotal) * 100).toFixed(3) : "8.875";
      doc.text(`Tax (${taxPercent}%): $${taxAmount.toFixed(2)}`, 20, yPos);
      yPos += 7;
      
      // GRAND TOTAL in bold red
      doc.setFontSize(12);
      doc.setTextColor(220, 38, 38); // Red
      doc.setFont(undefined, "bold");
      doc.text(`GRAND TOTAL: $${grandTotal.toFixed(2)}`, 20, yPos);
      yPos += 15;

      // Footer
      doc.setFont(undefined, "normal");
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      const footerText = `Thanks for choosing Gyro Cafe. Questions? Call us at ${siteConfig.phone}`;
      doc.text(footerText, pageWidth / 2, yPos, { align: "center", maxWidth: pageWidth - 40 });

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

              {/* Notes */}
              {receiptData?.notes && (
                <div>
                  <span className="text-xs uppercase tracking-wide text-neutral-500">Notes</span>
                  <p className="text-base text-brand-dark mt-1">
                    {receiptData.notes}
                  </p>
                </div>
              )}

              {/* Order Items - Grouped by Category */}
              {receiptData?.items && receiptData.items.length > 0 && (() => {
                const groupedItems = groupItemsByCategory(receiptData.items);
                
                return (
                  <div className="pt-4 border-t border-neutral-200">
                    <span className="text-xs uppercase tracking-wide text-neutral-500">Items Ordered</span>
                    <div className="mt-3 space-y-4">
                      {Object.entries(groupedItems).map(([categoryId, categoryItems]) => (
                        <div key={categoryId} className="space-y-2">
                          <h4 className="text-xs font-semibold uppercase tracking-wide text-brand-dark">
                            {getCategoryName(categoryId)}
                          </h4>
                          <div className="space-y-2 pl-2">
                            {categoryItems.map((item, index) => (
                              <div key={`${categoryId}-${index}`} className="flex justify-between text-sm">
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
                      ))}
                    </div>
                    {/* Total Items Count */}
                    <div className="pt-2 border-t border-neutral-200">
                      <div className="flex justify-between text-sm font-semibold text-brand-dark">
                        <span>Total Items:</span>
                        <span>
                          {receiptData.items.reduce((sum, item) => sum + (item.quantity || 1), 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Order Totals */}
              {receiptData && (() => {
                // Use receipt values: total is Grand Total, tax is Tax, subtotal is calculated
                const grandTotal = receiptData.total || 0;
                const taxAmount = receiptData.tax || 0;
                const subtotal = receiptData.subtotalAfterDiscounts || (grandTotal - taxAmount);
                
                return (
                  <div className="pt-4 border-t border-neutral-200 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Subtotal</span>
                      <span className="font-semibold text-brand-dark">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Tax (8.875%)</span>
                      <span className="font-semibold text-brand-dark">
                        ${taxAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-base pt-2 border-t border-neutral-200">
                      <span className="font-bold text-brand-dark">Grand Total</span>
                      <span className="font-bold text-brand-dark">
                        ${grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })()}
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

