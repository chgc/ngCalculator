import {AfterViewChecked, Component, ElementRef, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-auto-shrink',
  template: `
  <ng-content></ng-content>
  `
})
export class AutoShrinkComponent implements OnInit, AfterViewChecked {
  @Input() value;
  scale: number = 1;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    (<HTMLElement>this.el.nativeElement).style.transform =
        `scale(${this.scale},${this.scale})`;
  }

  ngAfterViewChecked() {
    const node: HTMLElement = this.el!.nativeElement;
    const parentNode: HTMLElement = <HTMLElement>node.parentNode;

    const avaliableWidth = parentNode.offsetWidth;
    const actualWidth = node.offsetWidth;
    let actualScale = avaliableWidth / actualWidth;
    if (this.scale === actualScale) {
      return;
    }
    if (actualScale < 1) {
      this.scale = actualScale;
    } else {
      this.scale = 1;
    }
    (<HTMLElement>this.el.nativeElement).style.transform =
        `scale(${this.scale},${this.scale})`;
  }
}
