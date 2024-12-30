import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusFiltration'
})
export class StatusFiltrationPipe implements PipeTransform {

  transform(items: any[], status: string): any[] {
    if (!items) return [];
    if (!status || status === 'all') return items;
    return items.filter(item => item.status.toLowerCase() === status.toLowerCase());
  }

}
