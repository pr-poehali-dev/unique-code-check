export interface Order {
  id: string;
  uniqueCode: string;
  status: OrderStatus;
  productInfo?: DigisellerProduct;
  verificationResult?: DigisellerVerification;
  createdAt: Date;
  updatedAt: Date;
  processedAt?: Date;
  errorMessage?: string;
  customerInfo?: {
    email?: string;
    phone?: string;
  };
}

export enum OrderStatus {
  PROCESSING = "processing",
  COMPLETED = "completed",
  ERROR = "error",
}

export interface DigisellerProduct {
  id: number;
  name: string;
  seller: string;
  price: number;
  currency: string;
}

export interface DigisellerVerification {
  valid: boolean;
  productId: number;
  sellerId: number;
  purchaseDate: string;
  transactionId: string;
  amount: number;
  currency: string;
}

export interface DigisellerApiResponse {
  success: boolean;
  data?: DigisellerVerification;
  error?: string;
  errorCode?: number;
}

export interface OrderFilters {
  status?: OrderStatus;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}

export interface OrderStats {
  total: number;
  processing: number;
  completed: number;
  error: number;
}
