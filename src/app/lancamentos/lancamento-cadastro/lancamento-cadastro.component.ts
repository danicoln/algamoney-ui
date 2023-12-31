import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriaService } from 'src/app/categorias/categorias.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Categoria, Lancamento, Pessoa } from 'src/app/core/model';
import { PessoaService } from 'src/app/pessoas/pessoas.service';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';



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
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoasService: PessoaService,
    private error: ErrorHandlerService,
    private lancamentoService: LancamentoService,
    private message: MessageService
  ) { }

  ngOnInit(): void {
    this.carregarCategorias(); // precisa inserir o método para ser inicializado
    this.carregarPessoas();
  }

  salvar(lancamentoForm: NgForm) {

    this.lancamentoService.adicionar(this.lancamento)
    .then(() => {
      this.message.add({severity: 'success', summary: 'Sucesso', detail: 'Lançamento salvo com sucesso!'});

      //precisamos resetar o formulário para ficar vazio.
      lancamentoForm.reset();

      //instanciamos um novo lancamento, pra ter um novo objeto para ficar vazio
      this.lancamento = new Lancamento();

    })
    .catch(erro => this.error.handle(erro));
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
