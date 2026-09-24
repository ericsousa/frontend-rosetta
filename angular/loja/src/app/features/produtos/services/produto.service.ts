import { inject, Injectable} from '@angular/core';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { Produto, ProdutoMapper } from '../../../model/produto';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/internal/operators/delay';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
    providedIn: 'root',
})

export class ProdutoService {
    private logger = inject(LoggerService);
    private http = inject(HttpClient);

    private apiUrl = 'https://fakestoreapi.com/products';

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

  listar(): Observable<Produto[] | null> {
    this.logger.info("[PRODUTO SERVICE] - Retornando lista de produtos")

    return this.http.get<any[]>(this.apiUrl).pipe(
      map(lista => lista.map(prod => ProdutoMapper.fromJson(prod))),
      catchError((erro) => {
        this.logger.error("[PRODUTO SERVICE] - Erro ao buscar lista de produtos", erro);
        return of(null);
      })
    );
  }

  getById(id: number): Observable<Produto | undefined>{
    this.logger.info("[PRODUTO SERVICE] - Retornando produto por ID: " + id)
    //return of(this.listaMock.find(p => p.id === id)).pipe(delay(500));

    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(prod => prod ? ProdutoMapper.fromJson(prod) : undefined),
      catchError((erro) => {
        this.logger.error("[PRODUTO SERVICE] - Erro ao buscar produto por ID", erro);
        return of(undefined);
      })
    );
  }

}

