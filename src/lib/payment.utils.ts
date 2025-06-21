import { PayWayCustomFields, PayWayItem, PayWayPurchaseRequest } from "@/types";

import crypto from "crypto";

export const generatePayWayHash = (
  data: Omit<PayWayPurchaseRequest, "hash">,
  apiKey: string,
): string => {
  const {
    req_time,
    merchant_id,
    tran_id,
    amount,
    items,
    shipping,
    firstname,
    lastname,
    email,
    phone,
    type,
    payment_option,
    return_url,
    cancel_url,
    continue_success_url,
    return_deeplink,
    currency,
    custom_fields,
    return_params,
    payout,
    lifetime,
    additional_params,
    google_pay_token,
    skip_success_page,
  } = data;

  const b4hash = [
    req_time,
    merchant_id,
    tran_id,
    amount?.toString(),
    items,
    shipping?.toString(),
    firstname,
    lastname,
    email,
    phone,
    type,
    payment_option,
    return_url,
    cancel_url,
    continue_success_url,
    return_deeplink,
    currency,
    custom_fields,
    return_params,
    payout,
    lifetime?.toString(),
    additional_params,
    google_pay_token,
    skip_success_page?.toString(),
  ].join("");

  return Buffer.from(
    crypto.createHmac("sha512", apiKey).update(b4hash).digest(),
  ).toString("base64");
};

export const preparePayWayItems = (items: PayWayItem[]): string => {
  return Buffer.from(JSON.stringify(items)).toString("base64");
};

export const preparePayWayCustomFields = (
  fields: PayWayCustomFields,
): string => {
  return Buffer.from(JSON.stringify(fields)).toString("base64");
};

export const preparePayWayDeeplink = (
  iosScheme: string,
  androidScheme: string,
): string => {
  return Buffer.from(
    JSON.stringify({ ios_scheme: iosScheme, android_scheme: androidScheme }),
  ).toString("base64");
};
