import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AutoShrinkComponent } from './auto-shrink/auto-shrink.component';
import { CalculateDisplayComponent } from './calculate-display/calculate-display.component';

@NgModule({
  declarations: [
    AppComponent,
    AutoShrinkComponent,
    CalculateDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
