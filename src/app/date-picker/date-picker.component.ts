import localePt from '@angular/common/locales/pt';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { format, isValid } from 'date-fns';

@Component({
  selector: 'app-date-picker',
  template: `
  <div class="col-12 md-6 col-3 p-fluid">
    <b>{{ titulo }}</b>
    <p-calendar
      dataType="string"
      dateFormat="dd/mm/yy"
      [showIcon]="showIcon"
      [name]="name"
      [required]="required"
      [(ngModel)]="dateModel"
      #dataHtml="ngModel"
      (ngModelChange)="onDateModelChange($event)"
      >
    </p-calendar>
    <app-message [control]="dataHtml.control" [error]="error" [text]="message"></app-message>
      <!--
      -->

  </div>`,
  styles: [``],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
    DatePipe,
    { provide: localePt, useValue: 'pt-BR' },
  ],

})
export class DatePickerComponent implements ControlValueAccessor, OnInit {

  @Input() titulo: string = '';
  @Input() showIcon: boolean = true; // Mostrar ícone no p-calendar
  @Input() name: string = ''; // Nome do campo
  @Input() required: boolean = true; // Campo obrigatório
  dateModel?: Date; // Modelo de data
  @Input() error: string = 'required'; // Tipo de erro para app-message
  @Input() message: string = 'Informe uma data'; // Mensagem de erro para app-message

  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  private minDate: Date | null = new Date();
  private maxDate: Date | null = new Date();
  private invalidDates: Array<Date> = new Array();

  constructor(
    private config: PrimeNGConfig,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.config.setTranslation({
      accept: 'Accept',
      reject: 'Cancel',
      "dayNames": ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      "dayNamesShort": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
      "dayNamesMin": ["Do", "Se", "Te", "Qa", "Qi", "Sx", "Sa"],
      "monthNames": ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      "monthNamesShort": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      "today": "Hoje",
      "weekHeader": "Sem"
    });

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];
  }

  onDateModelChange(value: any) {

    if(this.dateModel instanceof Date || this.dateModel === null){
      this.onChange(this.dateModel);
    }

    this.onTouched(); // Notifica sobre mudanças de estado ao alterar a data

  }

  private parseDateString(dateString: string): Date | null{
    const dateParts = dateString.split('/');
    if(dateParts.length ===3){
      const ano = parseInt(dateParts[2], 10);
      const mes = parseInt(dateParts[1], 10) - 1;
      const dia = parseInt(dateParts[0], 10);
      const parsedDate = new Date(ano, mes, dia);
      if(!isNaN(parsedDate.getTime())){
        return parsedDate;
      }
    }
    return null;
  }


  writeValue(value: any): void {
    this.dateModel = value;


  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
    console.log('foi tocado: ' ,fn)
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }


}
