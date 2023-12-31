import localePt from '@angular/common/locales/pt';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-date-picker',
  template: `
  <div class="col-12 md-6 col-3 p-fluid">
    <b>{{ titulo }}</b>
    <p-calendar
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
  dateModel: Date | null = null; // Modelo de data
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

  onDateModelChange(value: any) {
    if (value instanceof Date) {
      // Se já é uma instância de Date, não precisamos fazer mais nada
      this.onChange(value);
    } else if (typeof value === 'string') {
      // Se é uma string, tentamos converter para uma data antes de emitir
      const data = new Date(value);
      if (!isNaN(data.getTime())) {
        this.onChange(data);
      } else {
      // Se a conversão falhar, emitimos null ou algum valor indicativo de inválido
      this.onChange(null);
      }
    } else {
    // Se não for uma instância de Date ou uma string, emitimos null ou valor indicativo
    this.onChange(null);
    }

    this.onTouched(); // Notifica sobre mudanças de estado ao alterar a data

  }


  writeValue(value: any): void {
    if (value instanceof Date) {
      const timestamp = value.getTime();
      this.dateModel = new Date(timestamp);
    } else {
      console.error('O valor não é uma instância válida de Date: ', value);
      this.dateModel = null;
    }

  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = (value: any) => {
      let convertedValue: Date | null;

    if (typeof value === 'number') {
      convertedValue = new Date(value);
    } else if (value instanceof Date) {
      convertedValue = value;
    } else {
      console.error('O valor não é uma instância válida de Date ou um timestamp numérico: ', value);
      convertedValue = null;
    }
    const formattedDate = convertedValue ? this.datePipe.transform(convertedValue, 'dd/MM/yyyy') : null;
    fn(formattedDate);
    };
  }


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
}
