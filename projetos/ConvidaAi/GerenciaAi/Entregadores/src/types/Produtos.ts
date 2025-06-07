export interface Produto {
  id: number;
  titulo: string;
  imagem_perfil: string | File;

  marca: string;
  valor_venda: number;

  status_estoque: "DISPONIVEL" | "INDISPONIVEL" | string;
  maioridade: boolean;
  codigo_produto?: string;
  qtd_minima_estoque: number;
  descricao?: string;
  eh_subproduto: boolean;
  empreendimento_id?: number;
  criado_em?: string;
  criado_por?: number;
  atualizado_em?: string;
  atualizado_por?: number;

  categorias?: ProdutoCategoria[];
  produtofornecedor?: ProdutoFornecedor[];
  setor_armazenado_id?: number | null;

  categoria_ids?: number[];
  fornecedor_ids?: number[];
  setor_id?: number;
}

export interface ProdutoCategoria {
  id?: number;
  produto_id?: number;
  categoria_id: number;
  categoria?: Categoria;
}

export interface Categoria {
  id: number;
  titulo: string;
  imagem_perfil?: string;
  empreendimento_id?: number;
  criado_em?: string;
  criado_por?: number;
  atualizado_em?: string;
  atualizado_por?: number;
}

export interface ProdutoFornecedor {
  id?: number;
  produto_id?: number;
  fornecedor_id: number;
  fornecedor?: Fornecedor;
}

export interface Fornecedor {
  id: number;
  titulo: string;
  telefone?: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  pais?: string;
  cep?: string;
  empreendimento_id?: number;
  criado_em?: string;
  criado_por?: number;
  atualizado_em?: string;
  atualizado_por?: number;
}

export interface Setor {
  id: number;
  titulo: string;
  descricao?: string;
  empreendimento_id?: number;
  criado_em?: string;
  criado_por?: number;
  atualizado_em?: string;
  atualizado_por?: number;
}
