import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categorias/categorias.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

export interface Categoria {
  codigo: number,
  nome: string
}

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'},
  ];


  pessoas = [
    {label: 'João das Couves', value: 1},
    {label: 'Sebastião das Alfaces', value: 2},
    {label: 'Maria dos Tomates', value: 3}
  ];

  categorias: [] = [];

    constructor(
      private categoriaService: CategoriaService,
      private error: ErrorHandlerService
    ) {}

    ngOnInit(): void {
        this.carregarCategorias();
    }

    carregarCategorias(){
      return this.categoriaService.listarTodas()
      .then((categoria: any) => {
        this.categorias = categoria.map((c: Categoria) =>  ({ label: c.nome, value: c.codigo}));
        console.log('Objeto:' , categoria);
      })
      .catch(erro => this.error.handle(erro));
    }

}
