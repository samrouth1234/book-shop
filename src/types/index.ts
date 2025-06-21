export interface BookType {
  bookId: number;
  title: string;
  description: string;
  price: string;
  stock: number;
  categoryName: string;
  authorName: string;
}

export interface AuthorType {
  id: number;
  name: string;
  bio: string;
}

export interface CategoriesType {
  id: number;
  name: string;
}

export interface PayWayPurchaseRequest {
  req_time: string;
  merchant_id: string;
  tran_id: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  type?: string;
  payment_option?: string;
  items?: string;
  shipping?: number;
  amount: number;
  currency?: string;
  return_url?: string;
  cancel_url?: string;
  skip_success_page?: number;
  continue_success_url?: string;
  return_deeplink?: string;
  custom_fields?: string;
  return_params?: string;
  view_type?: string;
  payment_gate?: number;
  payout?: string;
  additional_params?: string;
  lifetime?: number;
  google_pay_token?: string;
  hash: string;
}

export interface PayWayItem {
  name: string;
  quantity: number;
  price: number;
}

export interface PayWayCustomFields {
  [key: string]: string;
}

export interface PayWayDeeplink {
  ios_scheme: string;
  android_scheme: string;
}
