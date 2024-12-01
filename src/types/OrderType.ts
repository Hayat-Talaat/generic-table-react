export enum OrderStatus {
  Pending = "Pending",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
}

export interface Order {
  id: string;
  customerName: string;
  orderDate: string; // Use ISO string for date representation
  //   status: OrderStatus;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled"; // Enum values
  totalAmount: number;
}

export interface GetOrderDetailsResponse {
  id: string;
  customerName: string;
  orderDate: string;
  status: OrderStatus;
  totalAmount: number;
  items: { name: string; quantity: number; price: number }[];
}

export interface UpdateOrderStatusRequest {
  id: string;
  status: OrderStatus;
}
