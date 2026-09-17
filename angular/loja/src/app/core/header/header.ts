import { Component, input, output } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
    
  titulo = input.required<string>();
  textoSobre = output<string>();

  enviarSobre():void {
    this.textoSobre.emit('Técnicas de Programação I. Desenvolvido por Eric');
  }

  exibirMensagem(msg: string): void {
    alert(msg + ' clicado!');
  }
}

