import localePt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from '../pessoas/pessoas.service';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule

  ],
  exports: [
    NavbarComponent,

    ToastModule,
    ConfirmDialogModule
  ],
  providers:[
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    MessageService,
    ConfirmationService,
    DatePipe,
    {provide: localePt, useValue: 'pt-BR'}
  ]

})
export class CoreModule { }
