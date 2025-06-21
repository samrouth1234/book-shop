"use client";

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

const PaymentSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // You can process the query parameters here
    const tran_id = searchParams.get("tran_id");
    const status = searchParams.get("status");
    // If you want to get all params:
    const rest: Record<string, string | null> = {};
    searchParams.forEach((value, key) => {
      if (key !== "tran_id" && key !== "status") {
        rest[key] = value;
      }
    });
    console.log("Payment success data:", { tran_id, status, ...rest });
  }, [searchParams]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Payment Successful</h1>
      <div className="mb-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700">
        Your payment was processed successfully.
      </div>
      <button
        onClick={() => router.push("/")}
        className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
      >
        Return to Home
      </button>
    </div>
  );
};

export default PaymentSuccessPage;
