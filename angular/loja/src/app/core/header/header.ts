import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CarrinhoService } from '../../features/carrinho/services/carrinho.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
    
  titulo = input.required<string>();
  textoSobre = output<string>();
  private carrinho = inject(CarrinhoService);

  qtdCarrinho = this.carrinho.qtdItens;

  enviarSobre():void {
    this.textoSobre.emit('Técnicas de Programação I. Desenvolvido por Eric');
  }

  exibirMensagem(msg: string): void {
    alert(msg + ' clicado!');
  }
}

