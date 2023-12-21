import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { LancamentosModule } from './core/lancamentos/lancamentos.module';
import { LancamentoService } from './core/lancamentos/lancamento.service';
import { PessoasModule } from './core/pessoas/pessoas.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LancamentosModule,
    PessoasModule

  ],
  providers: [LancamentoService], //precisamos informar nos providers nossos services
  bootstrap: [AppComponent]
})
export class AppModule { }
