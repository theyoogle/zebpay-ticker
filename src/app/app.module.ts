import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material/material.module';

import { AppComponent } from 'src/app/components/main/app.component';
import { HeaderComponent } from './components/header/header.component';
import { TickerComponent } from './components/ticker/ticker.component';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TickerComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,

    MaterialModule
  ],

  providers: [
    DataService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
