import { Routes } from '@angular/router';
import { ListaProdutos } from './features/produtos/lista-produtos/lista-produtos';
import { Home } from './features/home/home';
import { Sobre } from './features/sobre/sobre';
import { ProdutoDetalhe } from './features/produtos/produto-detalhe/produto-detalhe';
import { ProdutoForm } from './features/produtos/produto-form/produto-form';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'produto', component: ListaProdutos},
    {path: 'produto/novo', component: ProdutoForm},
    {path: 'produto/:id', component: ProdutoDetalhe},
    {path: 'sobre', component: Sobre},
    {path: '**', redirectTo: ''}         
];
