import { Component } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent {

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'},
  ];

  categorias = [
      {label: 'Alimentação', value: 1},
      {label: 'Transporte', value: 2}
    ];

    pessoas = [
      {label: 'João das Couves', value: 1},
      {label: 'Sebastião das Alfaces', value: 2},
      {label: 'Maria dos Tomates', value: 3}
    ];

    constructor() {}

    
}
