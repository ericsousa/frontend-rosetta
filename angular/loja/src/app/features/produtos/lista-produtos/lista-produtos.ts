import { Component, computed, inject, signal } from '@angular/core';
import { Produto } from '../../../model/produto';
import { CardProduto } from '../card-produto/card-produto';
import { ProdutoService } from '../services/produto.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs/internal/operators/finalize';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-produtos',
  imports: [CardProduto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {

   carregando = signal(true);

  private produtoService = inject(ProdutoService);
  private router = inject(Router);
  private produtos = toSignal<Produto[] | null, Produto[] | null>(this.produtoService
    .listar().pipe(finalize(() => this.carregando.set(false))),{ initialValue: [] });

  erroAoCarregar = computed(() => this.produtos() === null);

  // flag de exibir apeas produtos em promoção
  apenasPromo = signal(false);

  // categorias
  categoriaSelecionada = signal('');

  // Monta a lista de categorias disponíveis a partir dos produtos.
  // Cada categoria aparece uma única vez e a lista fica em ordem alfabética.
  // O computed atualiza essa lista quando os produtos mudam.
  categoria = computed(() => {
    const lista: string[] = [];

    for (const produto of this.produtos() ?? []) {
      const categorias = produto.categoria;

      if(categorias && !lista.includes(categorias)){
        lista.push(categorias);
      }
    }

    return lista.sort();
  });
    

  // cria a lista de produtos a ser exibida com base na flag apenasPromo
  produtosExibidos = computed(() =>
  (this.produtos() ?? []).filter(produto =>
    (!this.apenasPromo() || produto.promo) &&
    (!this.categoriaSelecionada() ||
      produto.categoria === this.categoriaSelecionada())
  )
);


  // defie se exibe apenas promo ou não
  altenarPromo() {
    this.apenasPromo.update(v => !v); // Alterna o valor do sinal apenasPromo entre true e false
  }
  
  

  onViewProduct(id: number) {
    this.router.navigate(['/produto', id]);
  }

  onAddProduct(produto: {id: number, qtd: number}) {
    alert(`Adicionar ao carrinho o produto com id: ${produto.id} e quantidade: ${produto.qtd}`);
  }


}
