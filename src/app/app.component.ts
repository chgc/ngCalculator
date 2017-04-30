import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayValue: string = '0';
  constructor() {}
  ngOnInit() {}

  inputDigit(digit: number) {
    this.displayValue = this.displayValue === '0' ?
        String(digit) :
        this.displayValue + String(digit);
  }

  inputDot() {
    if (this.displayValue.indexOf('.') === -1) {
      this.displayValue += '.';
    }
  }

  clearDisplay() {
    this.displayValue = '0';
  }

  toggleSign() {
    this.displayValue = this.displayValue.charAt(0) === '-' ?
        this.displayValue.substr(1) :
        '-' + this.displayValue;
  }

  inputPercent() {
    this.displayValue = String(parseFloat(this.displayValue) / 100);
  }
}
