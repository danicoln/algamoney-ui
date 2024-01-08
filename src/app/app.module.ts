import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PessoasModule } from './pessoas/pessoas.module';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { AppRoutingModule } from './app-routing.module';

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
    AppRoutingModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
