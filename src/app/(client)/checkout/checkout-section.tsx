"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  preparePayWayCustomFields,
  preparePayWayItems,
} from "@/lib/payment.utils";
import { PayWayItem, PayWayPurchaseRequest } from "@/types";

export default function CheckoutSection() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const route = useRouter();

  // Sample order data for modal display (replace with your actual cart data)
  const orderItems: PayWayItem[] = [
    { name: "Product 1", quantity: 1, price: 10.0 },
    { name: "Product 2", quantity: 2, price: 5.0 },
  ];
  const shipping = 2.0;
  const totalAmount =
    orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0) +
    shipping;

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Prepare items
      const items = preparePayWayItems(orderItems);

      // Prepare custom fields
      const customFields = preparePayWayCustomFields({
        order_reference: "ORDER123",
        customer_id: "CUST456",
      });

      // Prepare deeplink
      // const returnDeeplink = preparePayWayDeeplink(
      //   `${window.location.origin}/checkout/cancel`,
      //   `${window.location.origin}/checkout/cancel`,
      // );

      // Prepare payment data
      const paymentData: Omit<
        PayWayPurchaseRequest,
        "merchant_id" | "req_time" | "tran_id" | "hash"
      > = {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        phone: "85512345678",
        type: "purchase",
        payment_option: "", // Empty to allow all payment options
        items,
        shipping,
        amount: totalAmount,
        currency: "USD",
        // return_url: `${window.location.origin}/checkout/success`,
        // cancel_url: `${window.location.origin}/checkout/cancel`,
        skip_success_page: 1,
        // continue_success_url: `${window.location.origin}/checkout/success`,
        // return_deeplink: returnDeeplink,
        custom_fields: customFields,
        return_params: "order_id=123&customer_id=456",
        view_type: "popup",
        payment_gate: 0,
        lifetime: 1440, // 24 hours
      };

      console.log("Sending Payment Data:", paymentData); // Debug: Log payment data

      // Initiate payment via API route
      const response = await fetch("/api/payway", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();
      console.log("PayWay API Response:", data); // Debug: Log response

      if (!response.ok) {
        throw new Error(data.message || "Failed to initiate payment");
      }

      route.push("/checkout/success");

      // if (!data.checkout_url) {
      //   throw new Error("No checkout URL provided in response");
      // }

      // console.log("Redirecting to:", data.checkout_url); // Debug: Log redirect URL
      // window.location.href = data.checkout_url;
    } catch (err) {
      console.error("Payment Error:", err); // Debug: Log error
      setError(err instanceof Error ? err.message : "Payment failed");
      setIsProcessing(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const confirmPayment = () => {
    closeModal();
    handlePayment();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Make a Payment</h1>

      {error && (
        <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md">
        <p className="mb-4">
          Youre about to pay ${totalAmount.toFixed(2)} for your order.
        </p>

        <button
          onClick={openModal}
          disabled={isProcessing}
          className={`focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none ${
            isProcessing ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h2 className="mb-4 text-xl font-bold">Confirm Payment</h2>
            <p className="mb-4">
              Please review your order details before proceeding:
            </p>
            <ul className="mb-4">
              {orderItems.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
              <li className="mt-2 flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </li>
              <li className="mt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </li>
            </ul>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmPayment}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
