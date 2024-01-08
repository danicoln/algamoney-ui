import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';

import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { ToastModule } from 'primeng/toast';
import { LancamentosRoutingModule } from './lancamentos-routing.module';


@NgModule({
  declarations: [
    LancamentosPesquisaComponent,
    LancamentoCadastroComponent,


  ],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputNumberModule,
    InputMaskModule,
    HttpClientModule,
    ToastModule,
    SharedModule,

    LancamentosRoutingModule

  ],
  exports: []

})
export class LancamentosModule { }
