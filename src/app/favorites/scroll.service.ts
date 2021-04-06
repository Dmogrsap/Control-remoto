import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';

export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
    constructor() {
      super(50, 250, 500);
    }
  }