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

  criar(produto: Produto): Observable<any> {

    let body = {
      title: produto.nome,
      price: produto.preco,
      description: produto.descricao,
      image: produto.imageUrl,
      category: produto.categoria
    }

    return this.http.post(this.apiUrl, ProdutoMapper.toJson(produto));;
  }

}

