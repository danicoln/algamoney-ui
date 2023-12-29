import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categorias/categorias.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoas.service';

export interface Categoria {
  codigo: number,
  nome: string
}

export interface Pessoa {
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
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];


  pessoas: [] = [];

  categorias: [] = [];

  constructor(
    private categoriaService: CategoriaService,
    private pessoasService: PessoaService,
    private error: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.carregarCategorias(); // precisa inserir o método para ser inicializado
    this.carregarPessoas();
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then((categoria: any) => {
        this.categorias = categoria.map((c: Categoria) => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.error.handle(erro));
  }

  carregarPessoas() {
    return this.pessoasService.listarPessoas()
    .then((pessoa: any) => {
      this.pessoas = pessoa.content.map((p: Pessoa) => ({ label: p.nome, value: p.codigo }));
    })
    .catch(erro => this.error.handle(erro));
  }
}
