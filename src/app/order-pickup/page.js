import { Metadata } from "next";

import OrderPickupView from "@/components/order/OrderPickupView";

export const metadata = {
  title: "Order Pickup · Gyro Cafe",
  description:
    "Build your Gyro Cafe pickup order, apply promotions, and secure your meal with online or in-store payment options.",
};

export default function OrderPickupPage() {
  return <OrderPickupView />;
}

