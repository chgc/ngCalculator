import {AfterContentChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

import {AutoShrinkComponent} from '../auto-shrink/auto-shrink.component';

@Component({
  selector: 'app-calculate-display',
  template: `
    <app-auto-shrink class="auto-scaling-text" [value]="value">
      {{ value | number }}
    </app-auto-shrink>
`
})
export class CalculateDisplayComponent implements OnInit {
  @Input('value') value;
  constructor() {}

  ngOnInit() {}
}
