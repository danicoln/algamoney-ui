import localePt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { PessoasModule } from './pessoas/pessoas.module';
import { CoreModule } from './core/core.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { SharedModule } from './shared/shared.module';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    PessoasModule,
    CoreModule,
    SharedModule,
    LancamentosModule,
    CalendarModule,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
