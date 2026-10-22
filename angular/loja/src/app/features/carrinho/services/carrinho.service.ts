import { computed, effect, Service, signal } from '@angular/core';
import { itemPedido } from '../../../model/item-pedido';
import { Produto } from '../../../model/produto';

@Service()
export class CarrinhoService {
    
    private _listaItens = signal<itemPedido[]>(this._carregarProdutos());

    itens = this._listaItens.asReadonly();
    qtdItens = computed(() => this._listaItens().reduce((soma_qtd, item) => soma_qtd + item.quantidade, 0));
    valorTotal = computed(() => this._listaItens().reduce((soma_valor, item) => soma_valor + (item.produto.preco * item.quantidade), 0));

    constructor() { 
        
        // Conferir se o codigo esta correto
        this._listaItens.set(this._carregarProdutos());
        
        effect(() => {
            try {
                localStorage.setItem('loja_angular_carrinho', JSON.stringify(this._listaItens()));
            } 
            catch(e) {
                // inserir a exceção d logger
                // ou exibir uma mensagem de erro
            }
        });
    }

    private _carregarProdutos(): itemPedido[] {
        try {
            const conteudo = localStorage.getItem('loja_angular_carrinho');
            if (!conteudo) {
                return [];
            }
            const lista = JSON.parse(conteudo) as itemPedido[];
            return lista;
        } 
        catch(e) {
            // tratamento de erro 
            return [];
        }
    }

    adicionar(produto: Produto, quantidade: number = 1): void {

        if (!produto)
            return;
        if (quantidade <= 0)
            return;

        const itens = this._listaItens();
        const idx = itens.findIndex(item => item.produto.id === produto.id);

        if (idx >= 0) {
            itens[idx] = {...itens[idx], quantidade: itens[idx].quantidade + quantidade};
            this._listaItens.set(itens);
        }
        else {
            const novoProd: itemPedido = {quantidade, produto};
            this._listaItens.set([...itens, novoProd]);
        }
    }

    remover(id: number): void {
        this._listaItens.set(this._listaItens().filter(item => item.produto.id !== id));
    }

    atualizarQtd(id: number, quantidade: number): void {
        if(quantidade <= 0) {
            this.remover(id);
            return;
        }

        const itens = this._listaItens();
        const idx = itens.findIndex(item => item.produto.id === id);

        if (idx >= 0) {
            
            itens[idx] = {...itens[idx], quantidade};
            this._listaItens.set(itens);
        }
    }

    limpar(): void {
        this._listaItens.set([]);
    }
}
