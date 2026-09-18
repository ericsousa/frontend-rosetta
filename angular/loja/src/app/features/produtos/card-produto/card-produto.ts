import { Component, input, output, signal } from '@angular/core';
import { Produto } from '../../../model/produto';
import { QuantidadeControle } from '../../../shared/quantidade-controle/quantidade-controle';
import { CurrencyPipe } from '@angular/common';
import { DescontoPipe } from '../../../shared/pipes/desconto-pipe';
import { Truncar } from '../../../shared/pipes/truncar-pipe';

@Component({
  selector: 'app-card-produto',
  imports: [QuantidadeControle, CurrencyPipe, DescontoPipe, Truncar],
  templateUrl: './card-produto.html',
  styleUrl: './card-produto.css',
})
export class CardProduto {
  produto = input.required<Produto>();
  quantidade = signal<number>(1);

  add = output<{id: number, qtd: number}>();
  view = output<number>();

  // função add onAdd é chamada quando o usuário clica no botão de adicionar ao carrinho. 
  // Ela emite um evento com o id do produto e a quantidade selecionada.
  onAdd() {
    // produto é um signal, então para pegar o valor dele, precisa chamar a função produto() 
    this.add.emit({id: this.produto().id, qtd: this.quantidade()});
  }

  // função view onView é chamada quando o usuário clica no botão de ver detalhes do produto.
  // Ela emite um evento com o id do produto.
  onView() {
    this.view.emit(this.produto().id);
  }
}
