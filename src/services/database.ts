import { Order, OrderStatus, OrderFilters, OrderStats } from "@/types/order";

// Для демонстрации используем localStorage, в продакшене нужна реальная БД
class DatabaseService {
  private storageKey = "digiseller_orders";
  private duplicateProtectionKey = "processed_codes";

  private getOrders(): Order[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveOrders(orders: Order[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(orders));
  }

  private getProcessedCodes(): Set<string> {
    const data = localStorage.getItem(this.duplicateProtectionKey);
    return new Set(data ? JSON.parse(data) : []);
  }

  private saveProcessedCodes(codes: Set<string>): void {
    localStorage.setItem(
      this.duplicateProtectionKey,
      JSON.stringify([...codes]),
    );
  }

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const processedCodes = this.getProcessedCodes();

    if (orderData.uniqueCode && processedCodes.has(orderData.uniqueCode)) {
      throw new Error("Код уже был обработан ранее");
    }

    const orders = this.getOrders();
    const newOrder: Order = {
      id: crypto.randomUUID(),
      uniqueCode: orderData.uniqueCode || "",
      status: OrderStatus.PROCESSING,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...orderData,
    };

    orders.push(newOrder);
    this.saveOrders(orders);

    // Добавляем код в список обработанных
    if (newOrder.uniqueCode) {
      processedCodes.add(newOrder.uniqueCode);
      this.saveProcessedCodes(processedCodes);
    }

    return newOrder;
  }

  async updateOrderStatus(
    orderId: string,
    status: OrderStatus,
    errorMessage?: string,
  ): Promise<Order> {
    const orders = this.getOrders();
    const orderIndex = orders.findIndex((o) => o.id === orderId);

    if (orderIndex === -1) {
      throw new Error("Заказ не найден");
    }

    orders[orderIndex] = {
      ...orders[orderIndex],
      status,
      updatedAt: new Date(),
      processedAt:
        status === OrderStatus.COMPLETED
          ? new Date()
          : orders[orderIndex].processedAt,
      errorMessage: status === OrderStatus.ERROR ? errorMessage : undefined,
    };

    this.saveOrders(orders);
    return orders[orderIndex];
  }

  async getOrders(filters?: OrderFilters): Promise<Order[]> {
    let orders = this.getOrders();

    if (filters?.status) {
      orders = orders.filter((o) => o.status === filters.status);
    }

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      orders = orders.filter(
        (o) =>
          o.uniqueCode.toLowerCase().includes(search) ||
          o.productInfo?.name.toLowerCase().includes(search),
      );
    }

    if (filters?.dateFrom) {
      orders = orders.filter((o) => new Date(o.createdAt) >= filters.dateFrom!);
    }

    if (filters?.dateTo) {
      orders = orders.filter((o) => new Date(o.createdAt) <= filters.dateTo!);
    }

    return orders.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  async getOrderStats(): Promise<OrderStats> {
    const orders = this.getOrders();
    return {
      total: orders.length,
      processing: orders.filter((o) => o.status === OrderStatus.PROCESSING)
        .length,
      completed: orders.filter((o) => o.status === OrderStatus.COMPLETED)
        .length,
      error: orders.filter((o) => o.status === OrderStatus.ERROR).length,
    };
  }

  async deleteOrder(orderId: string): Promise<void> {
    const orders = this.getOrders();
    const filteredOrders = orders.filter((o) => o.id !== orderId);
    this.saveOrders(filteredOrders);
  }

  async isDuplicateCode(uniqueCode: string): Promise<boolean> {
    const processedCodes = this.getProcessedCodes();
    return processedCodes.has(uniqueCode);
  }
}

export const database = new DatabaseService();
