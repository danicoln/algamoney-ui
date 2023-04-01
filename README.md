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
