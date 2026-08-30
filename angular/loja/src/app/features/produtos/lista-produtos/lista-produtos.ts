import { Component } from '@angular/core';
import { Produto } from '../../../model/produto';
import { CardProduto } from '../card-produto/card-produto';

@Component({
  selector: 'app-lista-produtos',
  imports: [CardProduto],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {

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
