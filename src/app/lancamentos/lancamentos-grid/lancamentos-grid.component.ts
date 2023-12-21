import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

  /**Precisa declarar as listas que compõem a tabela */
  @Input() lancamentos: any[] = [];
  @Input() pessoas: any[] = [];

}
