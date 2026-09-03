import { Component, computed, signal } from '@angular/core';
import { Produto } from '../../../model/produto';
import { CardProduto } from '../card-produto/card-produto';

@Component({
  selector: 'app-lista-produtos',
  imports: [CardProduto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {

  // flag de exibir apeas produtos em promoção
  apenasPromo = signal(false);

  // cria a lista de produtos a ser exibida com base na flag apenasPromo
  produtosExibidos = computed(() =>
    this.apenasPromo()
    ? this.produtos.filter(p => p.promo)
    : this.produtos
  );


  // defie se exibe apenas promo ou não
  altenarPromo() {
    this.apenasPromo.update(v => !v); // Alterna o valor do sinal apenasPromo entre true e false
  }
  
  produtos = <Produto[]>[
    {
      id: 1,
      nome: 'Patola Mp055',
      preco: 1001.00,
      descricao: 'Patola Mp055 é uma patola de alta qualidade, preta.',
      imageUrl: 'images/produto1.jpg',
      promo: false
    },
    {
      id: 2,
      nome: 'Patola Mp055',
      preco: 1002.00,
      descricao: 'Patola Mp055 é uma patola de alta qualidade, azul.',
      imageUrl: 'images/produto2.jpg',
      promo: false
    },
    {
      id: 3,
      nome: 'Patola Mp055',
      preco: 950.00,
      descricao: 'Patola Mp055 é uma patola de alta qualidade, vermelha.',
      imageUrl: 'images/produto3.jpg',
      promo: true
    }
  ]

  onViewProduct(id: number) {
    alert(`Visualizar produto com id: ${id}`);
  }

  onAddProduct(produto: {id: number, qtd: number}) {
    alert(`Adicionar ao carrinho o produto com id: ${produto.id} e quantidade: ${produto.qtd}`);
  }


}
