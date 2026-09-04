import { Component, computed, inject, signal } from '@angular/core';
import { Produto } from '../../../model/produto';
import { CardProduto } from '../card-produto/card-produto';
import { ProdutoService } from '../services/produto.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-lista-produtos',
  imports: [CardProduto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {


  private produtoService = inject(ProdutoService);
  private produtos = toSignal<Produto[], Produto[]>(this.produtoService.listar(),{ initialValue: [] }); 

  // flag de exibir apeas produtos em promoção
  apenasPromo = signal(false);

  // cria a lista de produtos a ser exibida com base na flag apenasPromo
  produtosExibidos = computed(() =>
    this.apenasPromo()
    ? this.produtos().filter(p => p.promo)
    : this.produtos()
  );


  // defie se exibe apenas promo ou não
  altenarPromo() {
    this.apenasPromo.update(v => !v); // Alterna o valor do sinal apenasPromo entre true e false
  }
  
  

  onViewProduct(id: number) {
    alert(`Visualizar produto com id: ${id}`);
  }

  onAddProduct(produto: {id: number, qtd: number}) {
    alert(`Adicionar ao carrinho o produto com id: ${produto.id} e quantidade: ${produto.qtd}`);
  }


}
