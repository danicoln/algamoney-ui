import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { PessoaService } from '../pessoas.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Pessoa } from 'src/app/core/model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit{


  pessoa: Pessoa = new Pessoa();
  ativo: boolean = false;

  constructor(
    private pessoaService: PessoaService,
    private mensagem: MessageService,
    private error: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title

    ){

  }

  ngOnInit(): void {
    const codigoPessoa = this.route.snapshot.params['codigo'];

    if(codigoPessoa){
      this.carregarPessoa(codigoPessoa);
    }
  }

  carregarPessoa(codigo: number){
    this.pessoaService.buscarPorCodigo(codigo)
    .then(objetoPessoa => {
      this.pessoa = objetoPessoa;
      this.atualizarTituloEdicao();

      if(this.pessoa?.endereco){
        const {endereco} = this.pessoa;

        endereco.logradouro = endereco.logradouro || '';
        endereco.numero = endereco.numero || '';
        endereco.complemento = endereco.complemento || '';
        endereco.bairro = endereco.bairro || '';
        endereco.cep = endereco.cep || '';
        endereco.cidade = endereco.cidade || '';
        endereco.estado = endereco.estado || '';

      }
    })
    .catch(erro => this.error.handle(erro));
  }

  salvar(pessoaForm: NgForm){
    if(this.editando){
      this.atualizar(pessoaForm);
    }else{
      this.adicionar(pessoaForm);
    }
  }

  atualizar(pessoaForm: NgForm){
    this.pessoaService.atualizar(this.pessoa)
    .then((pessoaAtualizada: any) => {
      this.pessoa = pessoaAtualizada;

      this.mensagem.add({ severity: 'success', summary: 'Sucesso', detail: 'Lançamento atualizado com sucesso!' });
      this.atualizarTituloEdicao();
      pessoaForm.reset();
      return this.pessoa;
    })
    .catch(erro => this.error.handle(erro));
  }

  adicionar(pessoaForm: NgForm){
    this.pessoaService.adicionar(this.pessoa)
    .then(() => {
      this.mensagem.add({severity: 'success', summary: 'Sucesso', detail: 'Pessoa cadastrada com sucesso'});
      pessoaForm.reset();
      this.pessoa = new Pessoa();
    })
    .catch(erro => this.error.handle(erro));
  }

  get editando(){
    return Boolean(this.pessoa.codigo);
  }

  onCheckboxChange(){
    console.log('Valor antes:', this.pessoa.ativo);
  this.pessoa.ativo = !this.pessoa.ativo;
  console.log('Valor depois:', this.pessoa.ativo);
  }

  novo(form: NgForm){
    form.reset();

    setTimeout(() => {
      this.pessoa = new Pessoa();
    }, 1);

    this.router.navigate(['pessoas/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }
}
