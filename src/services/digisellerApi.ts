import { DigisellerApiResponse, DigisellerVerification } from "@/types/order";

const DIGISELLER_API_BASE = "https://api.digiseller.ru/api";
const API_KEY = process.env.VITE_DIGISELLER_API_KEY || "";
const SELLER_ID = process.env.VITE_DIGISELLER_SELLER_ID || "";

class DigisellerApiService {
  private async makeRequest(endpoint: string, data: any): Promise<any> {
    const response = await fetch(`${DIGISELLER_API_BASE}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...data,
        seller_id: SELLER_ID,
        api_key: API_KEY,
        timestamp: Math.floor(Date.now() / 1000),
      }),
    });

    if (!response.ok) {
      throw new Error(`Digiseller API error: ${response.status}`);
    }

    return response.json();
  }

  async verifyUniqueCode(uniqueCode: string): Promise<DigisellerApiResponse> {
    try {
      const response = await this.makeRequest("/orders/verify", {
        unique_code: uniqueCode,
      });

      if (response.retval === 0) {
        return {
          success: true,
          data: {
            valid: true,
            productId: response.product_id,
            sellerId: response.seller_id,
            purchaseDate: response.purchase_date,
            transactionId: response.transaction_id,
            amount: response.amount,
            currency: response.currency,
          },
        };
      } else {
        return {
          success: false,
          error: this.getErrorMessage(response.retval),
          errorCode: response.retval,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  async markCodeAsProcessed(uniqueCode: string): Promise<boolean> {
    try {
      const response = await this.makeRequest("/orders/mark_processed", {
        unique_code: uniqueCode,
      });
      return response.retval === 0;
    } catch (error) {
      console.error("Error marking code as processed:", error);
      return false;
    }
  }

  private getErrorMessage(errorCode: number): string {
    const errorMessages: Record<number, string> = {
      1: "Неверный API ключ",
      2: "Неверный ID продавца",
      3: "Код не найден",
      4: "Код уже использован",
      5: "Код недействителен",
      6: "Превышен лимит запросов",
      7: "Внутренняя ошибка сервера",
    };
    return errorMessages[errorCode] || "Неизвестная ошибка";
  }
}

export const digisellerApi = new DigisellerApiService();
