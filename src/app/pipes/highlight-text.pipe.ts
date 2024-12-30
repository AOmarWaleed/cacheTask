import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlightText'
})
export class HighlightTextPipe implements PipeTransform {

  private _domSanitizer = inject(DomSanitizer);

  transform(value: any, searchText: string, classes: string): any {
    const normalizedValue = value.toString().trim().toLowerCase();
    const normalizedSearchText = searchText.trim().toLowerCase();

    // If either searchText or value is empty, return the original value
    if (!normalizedSearchText || !normalizedValue) return value;

    const index = normalizedValue.indexOf(normalizedSearchText);
    // If there's no match, return the original value
    if (index === -1) return value;

    // Preserve the original capitalization of characters
    const before = value.toString().substring(0, index);
    const match = value.toString().substring(index, index + normalizedSearchText.length);
    const after = value.toString().substring(index + normalizedSearchText.length);

    // Return the value with the highlighted match wrapped in a span with the given class
    return this._domSanitizer.bypassSecurityTrustHtml(`${before}<span class='${classes}'>${match}</span>${after}`);
  }

}
