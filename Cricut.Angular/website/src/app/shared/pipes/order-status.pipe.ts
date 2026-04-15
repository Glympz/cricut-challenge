import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '../../core/services/api.service/api.types';
import { mapOrderStatus } from '../../core/utils/utils';

@Pipe({
  name: 'mapOrderStatus',
  standalone: true
})
export class MapOrderStatusPipe implements PipeTransform {
  transform(value: OrderStatus | null | undefined): string {
    value ??= -1 as OrderStatus;

    return mapOrderStatus(value);
  }
}
