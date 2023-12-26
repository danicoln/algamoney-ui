import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentoService } from './lancamentos/lancamento.service';
import { CoreModule } from './core/core.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoaService } from './pessoas/pessoas.service';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PessoasModule,
    CoreModule,
    LancamentosModule

  ],
  providers: [PessoaService], //precisamos informar nos providers nossos services
  bootstrap: [AppComponent]
})
export class AppModule { }
