import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from '../pessoas/pessoas.service';
import { CategoriaService } from '../categorias/categorias.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    FormsModule

  ],
  exports: [
    NavbarComponent,

    ToastModule,
    ConfirmDialogModule,
  ],
  providers:[
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    MessageService,
    ConfirmationService,
    DatePipe,
    {provide: localePt, useValue: 'pt-BR'},
    CategoriaService
  ]

})
export class CoreModule { }
