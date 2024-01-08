import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/categorias/categorias.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Categoria, Lancamento, Pessoa } from 'src/app/core/model';
import { PessoaService } from 'src/app/pessoas/pessoas.service';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';



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
  formulario?: NgForm;

  constructor(
    private categoriaService: CategoriaService,
    private pessoasService: PessoaService,
    private error: ErrorHandlerService,
    private lancamentoService: LancamentoService,
    private message: MessageService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if(codigoLancamento){ // se tiver o codigo
      this.carregarLancamento(codigoLancamento); //carregamos o lancamento passando o codigo
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: NgForm){
    if(this.editando){
      this.atualizarLancamento(form);
    }else{

      this.adicionarLancamento(form);
    }
  }

  atualizarLancamento(form:NgForm){
    this.lancamentoService.atualizar(this.lancamento)
    .then((lancamentoAtualizado: any) => {
      this.lancamento = lancamentoAtualizado;

      this.message.add({severity: 'success', summary: 'Sucesso', detail: 'Lançamento atualizado com sucesso!'});

      form.reset();
      return this.lancamento;
    },
    (erro: any) => {
      this.error.handle(erro);
    });
  }

  adicionarLancamento(lancamentoForm: NgForm) {

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

  get editando(){
    //quando tiver um codigo no lancamento, quer dizer que estamos
    //editando
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number){
    this.lancamentoService.buscarPorCodigo(codigo)
    .then(objetoLancamento => {
      this.lancamento = objetoLancamento;
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
