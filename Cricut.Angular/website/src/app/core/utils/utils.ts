import { OrderStatus } from "../services/api.service/api.types";

export function mapOrderStatus(orderStatus: OrderStatus): string {
    switch (orderStatus) {
        case OrderStatus.pending:
            return "Pending";
        case OrderStatus.inProgress:
            return "In Progress";
        case OrderStatus.completed:
            return "Completed";
        default:
            return "Unknown";
    }
}
