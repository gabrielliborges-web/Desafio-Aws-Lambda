import { File } from "buffer";

export interface ProdutoCategoria {
  produto: {
    id: number;
    titulo: string;
    valor_venda: number;
    valor_compra: number;
    descricao: string;
    status: string;
    maioridade: boolean;
    qtd_item: number;
    validade: string;
    imagem_perfil: string;
  };
}

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
  imagem_perfil: string;
}

export interface CategoriaProduto {
  id: number;
  titulo: string;
  imagem_perfil: string | File;
  criado_em?: string;
  criado_por?: number;
  atualizado_em?: string;
  atualizado_por?: number;
  empreendimento_id?: number;
  produtosCategorias: ProdutoCategoria[];
  produtos?: Produto[];
}
