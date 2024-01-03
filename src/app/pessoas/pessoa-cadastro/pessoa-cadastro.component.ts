import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { PessoaService } from '../pessoas.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Pessoa } from 'src/app/core/model';

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
    private route: ActivatedRoute
    ){

  }

  ngOnInit(): void {
  }

  salvar(pessoaForm: NgForm){
    this.pessoaService.adicionar(this.pessoa)
    .then(() => {
      this.mensagem.add({severity: 'success', summary: 'Sucesso', detail: 'Pessoa cadastrada com sucesso'});
      pessoaForm.reset();
      this.pessoa = new Pessoa();
    })
    .catch(erro => this.error.handle(erro));
  }

  onCheckboxChange(){
    console.log('Valor antes:', this.pessoa.ativo);
  this.pessoa.ativo = !this.pessoa.ativo;
  console.log('Valor depois:', this.pessoa.ativo);
  }
}
