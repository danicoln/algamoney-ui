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

# 10.3. Criando o projeto do curso e instalando o PrimeNG

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

# 13.5. Adicionando máscara de dinheiro com ng2-mask-money

## Currency Mask

<p>Não há alterações relativas à implementação do módulo CurrencyMask em relação ao que é mostrado na aula.
</p>

<p>Para instalar, basta digitar o seguinte comando:</p>

<pre>
  npm install ng2-currency-mask --save
</pre>

<p>Não esquecer de fazer o import</p>


<p>Eu usei o componente inputNumber</p>

## Componente InputNumber

<p>O PrimeNG 14 possui o componente InputNumber, citado no vídeo. Para utilizá-lo é necessário fazer a importação no AppModule.</p>

<p>A documentação deste componente pode ser acessada em <a href="https://primeng.org/inputnumber">aqui</a></p>


# 13.7. Adicionando campo com máscara (componente InputMask)

<p>Utilizei este componente no desafio anterior 13.6.</p>

<p>Acesse a documentação <a href="https://primeng.org/inputmask"> aqui. </a></p>

# 13.8 Validando controles de formulário com PrimeNG

## Propriedade errors

<p>Como esta propriedade errors pode ser nula, o Typescript reporta um problema na compilação do código. É necessário realizar a seguinte alteração nos pontos em que aparece a propriedade errors.</p>

<pre>
  descricao.errors?
</pre>

<p>A colocação da ? indica que essa propriedade é opcional, ou seja, quando ela for nula o interpretador para a execução naquele ponto, sem tentar avaliar as propriedades encadeadas (required e minlength neste exemplo ). Caso não seja nulo as propriedades serão avaliadas.
</p>

## Propriedade minlength
<p>Uma outra alteração necessária, é que o Typescript acusará um erro se você tentar acessar a propriedade minlength diretamente. O erro será.</p>
<pre>
  Property 'minlength' comes from an index signature, so it must be accessed with ['minlength'].
</pre>

<p>Isso se dá pelo fato da configuração noPropertyAccessFromIndexSignature estar ligada. Segundo a própria documentação, o objetivo dessa configuração é garantir o uso correto de propriedades dentro de objetos, sinalizando explicitamente que você conhece a propriedade dentro dele.
</p>

<p>Existem duas opções para resolver o problema. Você pode envolver a propriedade minlength com colchetes antes do requiredLength e actualLength, ou, desligar essa configuração.
</p>

## Opção 1

<p>Para continuar sem mexer nas configurações, o código deve ficar, respectivamente.</p>

<pre>
  {{name.errors?.['minlength'].requiredLength}}
</pre>

<pre>
  {{name.errors?.['minlength'].actualLength}}
</pre>

## Opção 2
<pre>
  {
    // Outras configs

  "compilerOptions": {
    // Outras configs

    "strict": true,
    "noPropertyAccessFromIndexSignature": false,

    // Outras configs
  },

  // Outras configs
}
</pre>

<p>Se fizer dessa forma, então não será necessário envolver as propriedades com colchetes, ficando exatamente como na aula.
</p>

<a href="https://www.typescriptlang.org/tsconfig#noPropertyAccessFromIndexSignature"> Documentação da configuração noPropertyAccessFromIndexSignature</a>

## Componente p-message
<p>É possível implementar a mensagem de erro utilizando o módulo de mensagens do PrimeNG. Para isso, é necessário adicionar o módulo <strong>MessageModule</strong> na aplicação.</p>

<p>O código para utilizar o componente para visualizar as mensagens de erro é o seguinte:</p>

<pre>
  <code>
    <span><</span><span>p-message</span> *ngIf="descricao.hasError('required') && descricao.dirty" severity="error" text="Informe uma descrição"<span>></span><span><</span><span>/p-message</span><span>></span>
  </code>
</pre>
<pre>
  <code>    
    <span><</span><span>p-message</span> *ngIf="descricao.hasError('minlength') && descricao.dirty" severity="error" text="Mínimo de {{ descricao.errors?.minlength.requiredLength }} caracteres. Você digitou apenas {{ descricao.errors?.minlength.actualLength }}"<span>></span><span><</span><span>/p-message</span><span>></span>
  </code>
</pre>

# 13.9 Criando componente de mensagem de erro de validação

<p>Para a criação do componente de mensagem, além do arquivo de teste spec, não queríamos o arquivo de html e também o css, então foi colocado na linha de comando os seguintes parâmetros:</p>

<pre>
  <strong>ng</strong> g c message --skip-tests --inline-template --inline-style
</pre>

<p>Estava com um problema na propriedade <strong>[control]</strong>. Foi resolvido da seguinte forma no html:</p>

<pre>
  [control]="cidade.control" 
</pre>

<p>Como a variável control pode estar indefinida em algumas situações, é interessante adaptar o código do componente de mensagem para esse caso:</p>

<pre>
  @Input() error: string = '';
  @Input() control?: FormControl;
  @Input() text: string = '';

  temErro(): boolean {
    return this.control ? this.control.hasError(this.error) && this.control.dirty : true;
  }
</pre>


## 14.10. O que é Core Module?

No AppModule, temos o NavbarComponent e AppComponent.

O NavbarComponent não faz parte de um módulo de funcionalidade, ou seja, um FeatureModule, e nem de um SharedModule, não é compartilhado entre os modulos. 

O NavbarComponent é usado apenas no AppComponent. Então, elementos que são usados apenas no módulo raíz da aplicação, devem ser usados em um módulo CoreModule. 

CoreModule acomoda elementos usados apenas pelo AppModule, como se fosse uma extensão do AppModule. Assim, o AppModule fica mais limpo.


## 17.2. Criando o serviço de consulta de lançamentos


## 17.5. Implementando a paginação no serviço de lançamentos

No HTML de lancamentos-pesquisa, alterei o row para 5, igual o que está no codigo da aula. 

Ao analisar o Network no console do navegador na linha: 
"lancamentos?resumo", em Headers, a Request URL não esta vindo os parâmentros de paginação igual na video aula.
