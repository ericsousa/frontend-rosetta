import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProdutoService } from '../services/produto.service';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Produto } from '../../../model/produto';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-produto-form',
  imports: [CommonModule, FormsModule, ],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.css',
})
export class ProdutoForm {

  private produtoService = inject(ProdutoService);
  private router = inject(Router);

  enviando = signal(false);
  mensagem = signal('');

  private produtos = toSignal(this.produtoService.listar(), { initialValue: [] });

  categorias = computed(() => {
    const lista = this.produtos()?.map(p => p.categoria).filter(Boolean);
    const unicas = Array.from(new Set(lista)).sort();
    return [...unicas, 'Outra'];
  });
  
  categoriaSelecionada = signal('');
  novaCategoria = signal('');

  mostrarNovaCategoria = computed(() => this.categoriaSelecionada() === 'Outra');

  novoProduto: Produto = {
    id: 0,
    nome: '',
    preco: 0,
    descricao: '',
    categoria: '',
    imageUrl: ''
  }
  
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.mensagem.set('Preencha todos os campos obrigatórios.');
      return;
    }

    this.novoProduto.categoria = this.categoriaSelecionada() === 'Outra' 
      ? this.novoProduto.categoria 
      : this.categoriaSelecionada();

      this.enviando.set(true);
      this.mensagem.set('Enviando produto...');

      this.produtoService.criar(this.novoProduto).pipe(
        finalize(() => this.enviando.set(false))
      ).subscribe({
        next: (resp) => { // Sucesso na criação do produto
          this.mensagem.set('Produto criado com sucesso!');
          form.resetForm();
          setTimeout(() => {
            this.router.navigateByUrl('/produto');
          }, 1200);
        },
        error: (err) => { // Erro ao criar o produto
          console.error('Erro ao criar produto:', err); 
          this.mensagem.set('Erro ao criar produto.');
        }
      });
  }
}
