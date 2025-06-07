export interface Produto {
  id: number;
  titulo: string;
  valor_venda: number;
  valor_compra: number;
  descricao: string;
  status: string;
  maioridade: boolean;
  qtd_item: number;
  validade: string;
  imagem_produto: string;
}

export interface FornecedorProduto {
  id: number;
  titulo: string;
  telefone: String;
  Status: string;
  path: string;

  cep: string;
  logradouro: string;
  complemento?: string;
  numero: string;
  cidade: string;
  estado: string;
  pais: string;
  bairro: string;

  pedido_minimo: number;

  criado_em: string;
  criado_por?: number;
  atualizado_em?: string;
  atualizado_por?: number;

  empreendimento_id: number;
  Produtos: Produto[];
}
