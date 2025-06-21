import { NextRequest, NextResponse } from "next/server";

import { generatePayWayHash } from "@/lib/payment.utils";
import { PayWayPurchaseRequest } from "@/types";

import axios from "axios";
import FormData from "form-data";

const PAYWAY_CONFIG = {
  merchant_id: process.env.NEXT_PUBLIC_PAYWAY_MERCHANT_ID || "",
  api_key: process.env.PAYWAY_API_KEY || "",
  base_url:
    process.env.NEXT_PUBLIC_PAYWAY_BASE_URL ||
    "https://payway-stg.ababank.com/api/payment-gateway/v1/payments/purchase",
};

export async function POST(req: NextRequest) {
  try {
    const paymentData: Omit<
      PayWayPurchaseRequest,
      "merchant_id" | "req_time" | "hash"
    > = await req.json();
    console.log("Payment Request Data:", paymentData); // Debug: Log request data

    // Validate environment variables
    if (
      !PAYWAY_CONFIG.merchant_id ||
      !PAYWAY_CONFIG.api_key ||
      !PAYWAY_CONFIG.base_url
    ) {
      throw new Error("Missing PayWay configuration");
    }

    // Use client-provided tran_id if available, otherwise generate
    const tran_id =
      paymentData.tran_id ||
      `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // Generate required fields
    const req_time = new Date()
      .toISOString()
      .replace(/[-:T.Z]/g, "")
      .slice(0, 14); // YYYYMMDDHHmmss

    // Prepare complete request data
    const requestData: Omit<PayWayPurchaseRequest, "hash"> = {
      ...paymentData,
      merchant_id: PAYWAY_CONFIG.merchant_id,
      req_time,
      tran_id,
    };

    // Generate hash
    const hash = generatePayWayHash(requestData, PAYWAY_CONFIG.api_key);
    console.log("Generated Hash:", hash); // Debug: Log hash
    console.log("Transaction ID:", tran_id); // Debug: Log tran_id

    // Create form data
    const formData = new FormData();
    for (const [key, value] of Object.entries({ ...requestData, hash })) {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    }

    // Make the API request
    const response = await axios.post(PAYWAY_CONFIG.base_url, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    console.log("PayWay Response:", response.data); // Debug: Log full response

    // Check transaction status via API (optional, if supported)
    if (response.data.tran_id) {
      try {
        const statusResponse = await axios.get(
          `${PAYWAY_CONFIG.base_url.replace("/purchase", "")}/check/transaction/${PAYWAY_CONFIG.merchant_id}/${response.data.tran_id}`,
          {
            headers: { Authorization: `Bearer ${PAYWAY_CONFIG.api_key}` },
          },
        );
        console.log("Transaction Status:", statusResponse.data); // Debug: Log status
      } catch (statusError) {
        console.error("Transaction Status Check Error:", statusError);
      }
    }

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("PayWay Error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      return NextResponse.json(
        {
          message:
            error.response?.data?.message || "Failed to initiate payment",
        },
        { status: error.response?.status || 500 },
      );
    }
    console.error("Server Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
