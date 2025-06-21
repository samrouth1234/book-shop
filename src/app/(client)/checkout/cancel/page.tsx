"use client";

import { useRouter } from "next/navigation";

const PaymentCancelPage = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Payment Cancelled</h1>
      <div className="mb-4 rounded border border-yellow-400 bg-yellow-100 px-4 py-3 text-yellow-700">
        You cancelled the payment process.
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

export default PaymentCancelPage;
