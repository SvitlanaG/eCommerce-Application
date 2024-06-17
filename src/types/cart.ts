export interface LineItem {
  id: string;
  productId: string;
  quantity: number;
}

export interface Cart {
  id: string;
  version: number;
  productIds: string[];
  lineItems: LineItem[];
}
