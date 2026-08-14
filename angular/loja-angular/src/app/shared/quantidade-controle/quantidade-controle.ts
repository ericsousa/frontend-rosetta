import { Component, model } from '@angular/core';

@Component({
  selector: 'app-quantidade-controle',
  imports: [],
  templateUrl: './quantidade-controle.html',
  styleUrl: './quantidade-controle.css',
})
export class QuantidadeControle {
  contador = model<number>(1);

  decrementar() {
    // retorna o maior valor entre 1 e o contador atual menos 1, garantindo que o contador nunca seja menor que 1
    this.contador.set(Math.max(1, this.contador() - 1)); 
  }

  incrementar() {
    // incrementa o contador em 1
    this.contador.update(v => v + 1);
  }
  
}
