import { NgModule } from "@angular/core";
import { PaginaNaoEncontradaComponent } from "./core/pagina-nao-encontrada.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
