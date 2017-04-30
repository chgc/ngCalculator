import {ChangeDetectorRef, Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayValue: string = '0';
  private value?: number;
  private waitingForOperand: boolean = false;
  private operator: string = '';

  constructor() {}
  inputDigit(digit: number) {
    if (this.waitingForOperand) {
      this.waitingForOperand = false;
      this.displayValue = String(digit);
    } else {
      this.displayValue = this.displayValue === '0' ?
          String(digit) :
          this.displayValue + String(digit);
    }
  }

  inputDot() {
    if (this.waitingForOperand) {
      this.waitingForOperand = false;
      this.displayValue = '0.';
    } else {
      if (this.displayValue.indexOf('.') === -1) {
        this.displayValue += '.';
      }
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

  performOperator(nextOperator: string) {
    const nextValue = parseFloat(this.displayValue);
    const operations = {
      '/': (preValue, nextValue) => preValue / nextValue,
      '*': (preValue, nextValue) => preValue * nextValue,
      '-': (preValue, nextValue) => preValue - nextValue,
      '+': (preValue, nextValue) => preValue + nextValue,
      '=': (preValue, nextValue) => nextValue,
    };

    if (this.value == undefined) {
      this.value = nextValue;
    } else if (this.operator) {
      const currentValue = this.value || 0;
      const computedValue = operations[this.operator](currentValue, nextValue);
      this.value = computedValue;
      this.displayValue = String(computedValue);
    }

    this.waitingForOperand = true;
    this.operator = nextOperator;
  }
}
