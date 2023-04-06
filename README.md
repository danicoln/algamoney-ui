# AlgamoneyUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Instalação do PrimeNG

Na versão 14 o PrimeNG não faz mais uso da biblioteca font-awesome. Foi criada uma biblioteca própria do PrimeNG para substituí-la, que é a PrimeIcons. Outra mudança foi a criação da biblioteca PrimeFlex, necessária para o uso do grid system do PrimeNG.

Para instalar os componentes do PrimeNG são necessários os seguintes comandos:
<pre>
  npm install primeng@14.0.0 --save

  npm install primeicons@5.0.0 --save

  npm install primeflex@3.2.1 --save
</pre>

Você verá que as dependências foram instaladas com sucesso no arquivo package.json

<pre>
  "dependencies": {
  // ...
  "primeflex": "^3.2.1",
  "primeicons": "^5.0.0",
  "primeng": "^14.0.0"
}
</pre>

## Importação das folhas de estilo do PrimeNG 12

Na aula é mostrado como inserir os estilos do PrimeNG no arquivo .angular-cli.json. No Angular 14 o arquivo .angular-cli.json foi renomeado para angular.json. Houveram mudanças em sua estrutura, porém ainda existe a propriedade styles, onde devemos inserir os valores que estão na documentação do PrimeNG.

Outra diferença é que neste arquivo o atributo "root" é configurado com o valor "" e não com "src", como era no formato antigo. Isso significa que não usaremos "../node_modules/", pois já estamos no diretóio raíz (o mesmo da pasta node_modules). Então devemos usar "node_modules/".

Devido à mudança do atributo "root" do angular.json e à inclusão das novas bibliotecas, são necessárias as importações das seguintes folhas de estilo:

<pre>
"styles": [
  // ...
  "node_modules/primeicons/primeicons.css",
  "node_modules/primeflex/primeflex.css",
  "node_modules/primeng/resources/themes/saga-blue/theme.css",
  "node_modules/primeng/resources/primeng.min.css",
]
</pre>


## Importação de módulos do PrimeNG 14

Os componentes no PrimeNG 14 são configurados como módulos. Uma vez que o PrimeNG está instalado e configurado, módulos e APIs podem ser importados com o padrão de path primeng/{module}. A documentação de cada componente apresenta a sua respectiva importação.

Segue exemplo da documentação do PrimeNG 14:

<pre>
  // accordion and accordion tab
  import { AccordionModule } from 'primeng/accordion'; 
  
  // api
  import { MenuItem } from 'primeng/api';    
</pre>

Nesta aula a alteração que deve ser feita é na importação do TabViewModule no AppModule:

<pre>
import { TabViewModule } from 'primeng/tabview';
</pre>


# Ajuste de layout para o PrimeFlex 3 e atualização para o Angular 14

## Importação de módulos do PrimeNG 14

Os componentes no PrimeNG 14 são configurados como módulos. Uma vez que o PrimeNG está instalado e configurado, módulos e APIs podem ser importados com o padrão de path primeng/{module}. A documentação de cada componente apresenta a sua respectiva importação.

Segue exemplo da documentação do PrimeNG 14:

<pre>
// accordion and accordion tab
import { AccordionModule } from 'primeng/accordion'; 

// api
import { MenuItem } from 'primeng/api';
</pre>

Nesta aula as alterações que devem ser feitas no AppModule são as seguintes:

<pre>
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
</pre>

## Classes CSS do PrimeNG 14 e do PrimeFlex V3

Algumas classes CSS do PrimeNG foram substituídas na versão 14. Anteriormente, por padrão, as classes CSS do PrimeNG tinham o prefixo ui- (ou p- na versão 2 do PrimeFlex), algumas classes agora a não ter prefixo. Além do prefixo são necessárias também algumas alterações em casos específicos, como o da classe ui-g que deve ser substituída pela classe grid.

<a href="https://www.primefaces.org/primeflex/migration
">Documentação sobre migração para o PrimeFlex V3</a>

## Angular CDK

Devido à dependência de outros componentes, será necessário instalar o Angular CDK em nosso projeto:

<pre>
npm install @angular/cdk@14.1.1 --save
</pre>

Você verá que a dependência foi instalada com sucesso no seu arquivo package.json:

<pre>
"dependencies": {
  //...
  "@angular/cdk": "^14.1.1",
  //...
}
</pre>

# Componente Table do PrimeNG 14

O PrimeNG 14 não faz mais uso do componente DataTable, tendo sido este substituído na versão 6 pelo componente Table.

## Importação do TableModule

Antes de iniciarmos o desenvolvimento da nossa tabela, precisamos adicionar o módulo correspondente no AppModule.

<pre>
import { TableModule } from 'primeng/table';

//...

imports: [
  //...
  TableModule
],
//...
</pre>

## Implementação da tabela

A utilização do componente Table é bastante simples. O componente também possui a propriedade value, porém a forma de exibição das colunas é diferente.

Ele trabalha com o conceito de templates, onde podemos definir as seções da nossa tabela e também declarar variáveis. No nosso caso teremos dois templates: header e body. Vamos definir no header os nomes das propriedades que estão no AppComponent; no body adicionaremos os valores do nosso array.

<pre>
<div class="grid">
        <div class="col-12">
            <p-table [value]="lancamentos">
                <ng-template pTemplate="header">
                    <tr>
                        <th>Pessoa</th>
                        <th>Descrição</th>
                        <th class="col-data-header">Vencimento</th>
                        <th class="col-data-header">Pagamento</th>
                        <th class="col-valor-header">Valor</th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-lancamento>
                    <tr>
                        <td>{{ lancamento.pessoa }}</td>
                        <td>{{ lancamento.descricao }}</td>
                        <td class="col-data-content">{{ lancamento.dataVencimento }}</td>
                        <td class="col-data-content">{{ lancamento.dataPagamento }}</td>
                        <td class="col-valor-content">{{ lancamento.valor }}</td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    </div>
</pre>

Para declararmos a variável que será resultado da iteração de nosso array usamos a diretiva let-nome-da-variavel, onde o nome-da-variável será o objeto que utilizaremos para acessar os valores de nosso array.

No exemplo acima utilizamos let-lancamento, portanto cada item do nosso array lancamentos (atributo à propriedade value) poderá ter seus valores acessados por meio da variável lancamento:

<pre>
{{ lancamento.pessoa }}
</pre>

## CSS do Table

Diferente do DataTable, nosso novo componente especifica separadamente as colunas, por cabeçalho e conteúdo. Por esta razão precisaremos alterar o CSS para obtermos o mesmo resultado da aula.

<pre>
.col-valor-header {
  width: 120px;
}

.col-valor-content {
  text-align: right;
}

.col-data-header {
  width: 120px;
}

.col-data-content {
  text-align: center;
}
</pre>

Perceba que adicionamos regras CSS para os cabeçalhos e para os conteúdos. Dessa forma conseguimos atingir o resultado esperado.

# 10.6 Customizando colunas com ng-template
## PrimeNG 14
## Customizando o cabeçalho da tabela

<p>Como vimos anteriormente, o componente Table já trabalha baseado em templates, portanto o trabalho de customizar o cabeçalho ou o próprio conteúdo fica bem mais simples. </p>

<p>Como feito no início da aula, para adicionarmos um botão no cabeçalho da nossa tabela, precisaríamos apenas adicioná-lo dentro da tag th:</p>

<pre>
  <p-table [value]="lancamentos">
      <ng-template pTemplate="header">
        <tr>
          <!-- ... -->
          <th class="col-valor-header"> <button pButton label="Teste"></button></th>
          <!-- ... -->
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-lancamento>
        <tr>
          <!-- ... -->
        </tr>
      </ng-template>
    </p-table>
  </pre>

## CSS da tabela


Para aplicar o estilo condicional, também será bem mais fácil, pois já estamos utilizando template. Portanto, já temos o componente do body e temos a variável lancamento.

Neste caso, aplicaremos o estilo condicional da mesma forma, porém direto na tag td.

Claro que é possível também colocarmos uma tag span para o mesmo efeito:

<pre>
  <td class="col-valor-content" [ngStyle]="{ color: lancamento.tipo === 'DESPESA' ? 'red' : 'blue'}">{{lancamento.valor}}</td>

  <!-- ou... -->

  <td class="col-valor-content" [style.color]="lancamento.tipo === 'DESPESA' ? 'red' : 'blue'">{{lancamento.valor}}</td>

  <!-- ou... -->

  <td class="col-valor-content">
    <span [style.color]="lancamento.tipo === 'DESPESA' ? 'red' : 'blue'">{{lancamento.valor}} </span>
  </td>
</pre>

## Ícones

Na versão mostrada na aula, utilizamos font-awesome para nossos ícones, mas como falamos anteriormente, o PrimeNG agora nos fornece sua própria biblioteca de ícones.

Para usá-la, não muda muita coisa. Precisamos apenas adptar o prefixo fa para pi. Além disso, antes do nome do ícone devemos colocar o prefixo pi de forma isolada:


<pre>
  <code>
    <td class="col-acoes">
      <a pButton icon="pi pi-pencil"></a>
      <button pButton icon="pi pi-trash"></button>
    </td>
    </code>
</pre>


É necessário alterar o estilo geral para a classe col-acoes, para que o tamanho fique de acordo com os dois botões colocados na coluna

<pre>
.col-acoes {
    width: 120 px
}
</pre>

Além disso, os botões do pincel e da lixeira ficam colados um ao outro, devido às configurações padrões do pButton. Para separá-los utilize o seguinte código CSS

<code>
<pre>
  .col-acoes > a {
    margin-right: 5px;
  }
</pre>
</code>

# 10.7 Fazendo paginação de dados

## PrimeNG 14

## Paginação com o componente Table

<p>O Table usa os mesmos atributos para criar um paginador:</p>

<code>
<pre>

  <p-table [value]="lancamentos" [paginator]="true" [rows]="2">
  <!-- ... -->
  </p-table>
 
</pre>
 </code>

 # CSS

 <p>É necessário adicionar uma regra CSS para configurar a margem direita dos botões e links do PrimeNG:</p>

 <pre>
  .p-button {
    margin-right: .25em
  }
 </pre>

 ## As classes <strong>ui-md-x</strong>

 <p>A partir da versão 3 do Prime Flex, não é mais utilizado, conforme mostrado na aula, os prefixos <strong>ui-md-</strong> para trabalhar com a responsividade nas páginas HTML.</p>
 <p>Assim como é demonstrado na documentação, que terá o link posto logo abaixo, os prefixos utilizados passam a ser <strong>md:col-x</strong>, ou, para telas grandes, <strong>lg:col-x</strong>, onde o x deve ser trocado pela quantidade de colunas que deseja colocar (de 1 até 12). Existe ainda o <strong>xl:col-x</strong> e o <strong>sm:col-x</strong>, para respectivamente telas muito grandes ou pequenas</p>

 <a href="https://www.primefaces.org/primeflex/gridsystem">Documentação do Prime Flex</a>


# 13.2. Adicionando seletor de data (componente Calendar)

<p>Para o calendar funcionar, foi necessário inserir <strong>BrowserAnimationsModule</strong> no app.module, como feito na video-aula.</p>

<p>Usei as propriedades <strong>dateFormat</strong> e <strong>[showIcon]</strong></p>

<p>Ver mais na <a href="https://primeng.org/calendar">Documentação do Calendário</a></p>

# SelectButton

<p>Acesse a documentação <a href="https://primeng.org/selectbutton">aqui</a></p>


# Dropdown

<p>Acesse a documentação <a href="https://primeng.org/dropdown">aqui</a></p>


## Componente Dropdown
<p>A propriedade <strong>autoWidth</strong> foi removida a partir da versão 12 do PrimeNG. Como não há mudanças no que foi proposto na aula, basta remover a propriedade do nosso código.</p>

<p>Outro ponto que não é mais necessário é a regra CSS para o filtro do nosso dropdown, pois este componente já vem por padrão com largura de 100%.</p>
