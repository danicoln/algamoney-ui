import localePt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { PessoasModule } from './pessoas/pessoas.module';
import { CoreModule } from './core/core.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { registerLocaleData } from '@angular/common';

//registro do pacote locale na classe
registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PessoasModule,
    CoreModule,
    LancamentosModule,
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
