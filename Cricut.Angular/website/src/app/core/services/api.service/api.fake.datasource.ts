import { CustomerViewModel, NewOrderViewModel, OrderItemViewModel, OrderStatus, OrderViewModel, ProductViewModel } from "./api.types";

export function getCustomerViewModel(customerId: number): CustomerViewModel {
    let customer: CustomerViewModel | undefined = fakeCustomers.find(customer => customer.id === customerId);

    if (!customer) {
        customer = createCustomer(customerId, undefined);
        fakeCustomers.push(customer);
    }

    return customer;
}

export function getCustomerByEmail(email: string): CustomerViewModel {
    const lowerEmail = email.toLowerCase();

    let customer: CustomerViewModel | undefined = fakeCustomers.find(customer => customer.email.toLowerCase() === lowerEmail);

    if (!customer) {
        customer = createCustomer(undefined, email);
        fakeCustomers.push(customer);
    }

    return customer;
}

export function getOrderViewModelsByCustomer(customerId: number): OrderViewModel[]
{
    const customerOrders = fakeCustomerOrders.get(customerId);

    return customerOrders ?? [];
}

export function getOrderViewModel(orderId: number): OrderViewModel | undefined {
    const order = fakeOrders.get(orderId);

    return order;
}

export function submitOrderViewModel(newOrder: NewOrderViewModel): OrderViewModel {
    const orderId = Array.from(fakeOrders.keys()).reduce((maxOrderId, orderId) => Math.max(maxOrderId, orderId), 0) + 1;
    const order = mapNewOrderToOrder(newOrder, orderId);

    const customerOrders = fakeCustomerOrders.get(order.customer.id) ?? [];

    if (customerOrders.length === 0) {
        fakeCustomerOrders.set(order.customer.id, customerOrders);
    }

    customerOrders.push(order);

    fakeOrders.set(order.id, order);

    return order;
}

export function deleteOrder(orderId: number): void {
    for (const orders of fakeCustomerOrders.values()) {
        const orderIdx = orders.findIndex(order => order.id === orderId);

        if (orderIdx >= 0) {
            orders.splice(orderIdx, 1);
        }
    }

    fakeOrders.delete(orderId);
}

const fakeCustomers: CustomerViewModel[] = [];

const fakeCustomerOrders: Map<number, OrderViewModel[]> = ((customerIds: number[]) => {
    const fo = new Map<number, OrderViewModel[]>();

    let orderGroupNumber = 0;

    for (const customerId of customerIds) {
        const customer: CustomerViewModel = getCustomerViewModel(customerId);
        orderGroupNumber += 1000;
        const customerOrders: OrderViewModel[] = [];

        for (let i = 0; i < 10; i++) {
            const orderItems: OrderItemViewModel[] = createOrderItems();

            const order: OrderViewModel = {
                id: orderGroupNumber + i,
                status: OrderStatus.pending,
                customer,
                orderItems,
                total: calculateOrderTotal(orderItems),
            };

            customerOrders.push(order);
        }

        fo.set(customerId, customerOrders);
    }

    return fo;
})([12345, 54321]);

const fakeOrders: Map<number, OrderViewModel> = Array.from(fakeCustomerOrders.values())
    .reduce((allOrders, orders) => allOrders.concat(orders), [])
    .reduce((map, order) => map.set(order.id, order) , new Map<number, OrderViewModel>());

function mapNewOrderToOrder(newOrder: NewOrderViewModel, orderId: number): OrderViewModel {
    return {
        ...newOrder,
        id: orderId,
        status: OrderStatus.pending,
        customer: {
            ...newOrder.customer,
            address: getCustomerViewModel(newOrder.customer.id).address,
        },
        total: calculateOrderTotal(newOrder.orderItems),
    };
}

function calculateOrderTotal(orderItems: OrderItemViewModel[]): number {
    return orderItems.reduce<number>((p, item) => p + item.product.price * item.quantity, 0);
}

function createCustomer(customerId: number | undefined, email: string | undefined): CustomerViewModel {
    const newCustomerId = customerId ?? (fakeCustomers.reduce((maxCustomerId, customer) => Math.max(maxCustomerId, customer.id), 0) + 1);
    const newCustomerEmail = email ?? `${newCustomerId}@example.com`;

    return {
        id: newCustomerId,
        email: newCustomerEmail,
        name: `Joe ${newCustomerId} Customer `,
        address: `1234 Street`
    };
}

function createOrderItems(): OrderItemViewModel[] {
    const orderItems: OrderItemViewModel[] = [];

    for (let i = 0; i < 5; i++) {
        orderItems.push({
            product: createProduct(),
            quantity: randIntInRange(1, 10),
        });
    }

    return orderItems;
}

export function createProduct(): ProductViewModel {
    const id = randIntInRange(1000, 10000);
    const price = randIntInRange(100, 3000) / 100;

    return {
        id,
        name: `Product ${id}`,
        price,
    };
}

function randIntInRange(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (max < min) {
    [max, min] = [min, max];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

