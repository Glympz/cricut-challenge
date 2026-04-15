
export interface CustomerViewModel {
    id: number;
    email: string;
    name: string;
    address?: string;
}

export interface OrderViewModel {
    id: number;
    status: OrderStatus;
    customer: CustomerViewModel;
    orderItems: OrderItemViewModel[];
    total: number;
}

export interface OrderItemViewModel {
    product: ProductViewModel;
    quantity: number;
}

export interface ProductViewModel {
    id: number;
    name?: string | null;
    price: number;
}

export const enum OrderStatus {
    pending = 0,
    inProgress = 1,
    completed = 2,
}

export interface NewOrderViewModel extends Omit<OrderViewModel, 'id' | 'status' | 'total'> {
    customer: Omit<CustomerViewModel, 'address'>;
}
