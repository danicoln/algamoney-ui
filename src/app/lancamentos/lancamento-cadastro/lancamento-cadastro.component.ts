import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/categorias/categorias.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Categoria, Lancamento, Pessoa } from 'src/app/core/model';
import { PessoaService } from 'src/app/pessoas/pessoas.service';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';



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
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Novo lançamento");
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) { // se tiver o codigo
      this.carregarLancamento(codigoLancamento); //carregamos o lancamento passando o codigo
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {

      this.adicionarLancamento(form);
    }
  }

  atualizarLancamento(form: NgForm) {
    this.lancamentoService.atualizar(this.lancamento)
      .then((lancamentoAtualizado: any) => {
        this.lancamento = lancamentoAtualizado;

        this.message.add({ severity: 'success', summary: 'Sucesso', detail: 'Lançamento atualizado com sucesso!' });
        this.atualizarTituloEdicao();
        form.reset();
        return this.lancamento;
      },
        (erro: any) => {
          this.error.handle(erro);
        });
  }

  adicionarLancamento(lancamentoForm: NgForm) {

    this.lancamentoService.adicionar(this.lancamento)
      .then((lancamentoAdicionado) => {
        this.message.add({ severity: 'success', summary: 'Sucesso', detail: 'Lançamento salvo com sucesso!' });

        //navegação imperativa
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);

      })
      .catch(erro => this.error.handle(erro));
  }

  get editando() {
    //quando tiver um codigo no lancamento, quer dizer que estamos
    //editando
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(objetoLancamento => {
        this.lancamento = objetoLancamento;
        this.atualizarTituloEdicao();
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
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.error.handle(erro));
  }

  novo(form: NgForm) {
    form.reset();

    /*Ao clicar em "novo", o form.reset setava
    todos os campos do formulário como null,
    fazendo com que o botão de receita não
    estivesse selecionado mesmo inicializando um novo Lançamento.
    Para contornar o problema de carregamento, implementamos
    o setTimeout. */
    setTimeout(() => {
      this.lancamento = new Lancamento();

    }, 1);

    //Implementação de navegação imperativa
    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

}
