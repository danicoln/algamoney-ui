import { Component } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {
  lancamentos = [
    /*Objetos em javascript */
    {nome: "Antonio José da Silva", cidade: "São Paulo", estado: "São Paulo", status: "Ativo"},
    {nome: "Maria Antônia", cidade: "São Paulo", estado: "São Paulo", status: "Ativo"},
    {nome: "José Maria Miranda", cidade: "Sumaré", estado: "São Paulo", status: "Inativo"},
    {nome: "Dirceu Villares", cidade: "Americana", estado: "São Paulo", status: "Ativo"},
    {nome: "Ricardo Galhardo Rute", cidade: "Piracicaba", estado: "São Paulo", status: "Ativo"},
    {nome: "Paulo Silva Oliveira", cidade: "Sumaré", estado: "São Paulo", status: "Ativo"},
    {nome: "João Antonio Matos", cidade: "Hortolândia", estado: "São Paulo", status: "Inativo"},
    {nome: "Danilo Balbuino", cidade: "Nova Odessa", estado: "São Paulo", status: "Inativo"},
    {nome: "Juliana Maria", cidade: "Jundiaí", estado: "São Paulo", status: "Ativo"},
    {nome: "Amanda Julia", cidade: "Campinas", estado: "São Paulo", status: "Ativo"},
    {nome: "Andrezza Viera", cidade: "Hortolândia", estado: "São Paulo", status: "Inativo"},
    {nome: "Piccolo Namekuzein", cidade: "Valinhos", estado: "São Paulo", status: "Ativo"},
    {nome: "Madson Fut", cidade: "Valinhos", estado: "São Paulo", status: "Ativo"},
    {nome: "Rachel Silva", cidade: "Vinhedo", estado: "São Paulo", status: "Inativo"},
    {nome: "Julia Maria", cidade: "Valinhos", estado: "São Paulo", status: "Ativo"},
    {nome: "Bernardo Silva", cidade: "Vinhedo", estado: "São Paulo", status: "Inativo"},
    {nome: "Cristiano Ronaldo", cidade: "Socorro", estado: "São Paulo", status: "Ativo"},
    {nome: "Lionel Messi", cidade: "Indaiatuba", estado: "São Paulo", status: "Inativo"},
    {nome: "Ronaldo Fenômeno", cidade: "Indaiatuba", estado: "São Paulo", status: "Ativo"},
    {nome: "Lucas Matos de Oliveira", cidade: "Caarapó", estado: "MS", status: "Inativo"},
    {nome: "Suzana Oliveira", cidade: "Caarapó", estado: "MS", status: "Ativo"}

  ]
}
