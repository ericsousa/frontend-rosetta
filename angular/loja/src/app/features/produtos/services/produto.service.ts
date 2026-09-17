import { inject, Injectable} from '@angular/core';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { Produto } from '../../../model/produto';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/internal/operators/delay';

@Injectable({
    providedIn: 'root',
})

export class ProdutoService {
    private logger = inject(LoggerService);

    private readonly listaMock = <Produto[]>[
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

  listar(): Observable<Produto[]> {
    this.logger.info("[PRODUTO SERVICE] - Retornando lista de produtos")
    return of(this.listaMock).pipe(
        delay(250)
    );
  }

  getById(id: number): Observable<Produto | undefined>{
    return of(this.listaMock.find(p => p.id === id)).pipe(delay(500));
  }

}

