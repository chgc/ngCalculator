import { EventManager } from '@angular/platform-browser';
import { ChangeDetectorRef, Component } from '@angular/core';

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

  operations = {
    '/': (preValue, nextValue) => preValue / nextValue,
    '*': (preValue, nextValue) => preValue * nextValue,
    '-': (preValue, nextValue) => preValue - nextValue,
    '+': (preValue, nextValue) => preValue + nextValue,
    '=': (preValue, nextValue) => nextValue,
  };


  constructor(private eventManager: EventManager) {
    eventManager.addGlobalEventListener('window', 'keydown', (e: KeyboardEvent) => {
      this.handleKeyDown(e);
    });
  }

  get displayClear() {
    return this.displayValue !== '0' ? 'C' : 'AC';
  };

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

  clearLastChar() {
    let currentValue = this.displayValue.substring(0, this.displayValue.length - 1) || '0';
    if (currentValue.length === 1 && currentValue === '-') {
      currentValue = '0';
    }
    this.displayValue = currentValue;
  }

  clearAll() {
    this.value = undefined;
    this.displayValue = '0';
    this.operator = '';
    this.waitingForOperand = false;
  }

  toggleSign() {
    this.displayValue = this.displayValue.charAt(0) === '-' ?
      this.displayValue.substr(1) :
      '-' + this.displayValue;
  }

  inputPercent() {
    const currentValue = parseFloat(this.displayValue);
    if (currentValue === 0) {
      return;
    }
    const fixedDigits = this.displayValue.replace(/^-?\d*\.?/, '');
    const newValue = parseFloat(this.displayValue) / 100
    this.displayValue = String(newValue.toFixed(fixedDigits.length + 2));
  }

  performOperator(nextOperator: string) {
    const nextValue = parseFloat(this.displayValue);

    if (this.value == undefined) {
      this.value = nextValue;
    } else if (this.operator) {
      const currentValue = this.value || 0;
      const computedValue = this.operations[this.operator](currentValue, nextValue);
      this.value = computedValue;
      this.displayValue = String(computedValue);
    }

    this.waitingForOperand = true;
    this.operator = nextOperator;
  }

  /*
  * 處理keyboard事件，數字按鍵對應到相對的功能上
  */
  handleKeyDown(event: KeyboardEvent) {
    let { key } = event;
    console.log(key);
    if (key === 'Enter') {
      key = '='
    }

    if ((/\d/).test(key)) {
      event.preventDefault()
      this.inputDigit(parseInt(key, 10))
    } else if (key in this.operations) {
      event.preventDefault()
      this.performOperator(key)
    } else if (key === '.') {
      event.preventDefault()
      this.inputDot()
    } else if (key === '%') {
      event.preventDefault()
      this.inputPercent()
    } else if (key === 'Backspace') {
      event.preventDefault()
      this.clearLastChar()
    } else if (key === 'Escape') {
      event.preventDefault()
      if (this.displayValue !== '0') {
        this.clearDisplay()
      } else {
        this.clearAll()
      }
    }
  }
}
