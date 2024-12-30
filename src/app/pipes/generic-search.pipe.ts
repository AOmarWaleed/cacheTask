import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genericSearch',
})
export class GenericSearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any {
    
    // If there are no items or the items array is empty, return an empty array
    if (!items || items.length === 0) return [];
    
    // If the search text is empty, return the original items
    if (!searchText.trim().toLowerCase()) return items;
    
    return items.filter((item) => {
      // If any value of a property includes the search text, return the item
      return Object.values(item).some((value: any) =>
        value.toString().toLowerCase().includes(searchText.trim().toLowerCase())
      );
    });
  }
}
