import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'decorateBoolean' })
export class DecorateBooleanPipe implements PipeTransform {
  transform(value: boolean, mode: string): string {
    if (mode == 'reversed') {
      value = !value;
    }
    if ( value ) {
      return "Yes";
    }
    return "No";
  }
}


@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}