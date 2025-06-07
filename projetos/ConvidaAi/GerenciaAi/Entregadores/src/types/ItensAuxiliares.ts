export type TipoGrupo = "checkbox" | "radio" | "quantidade";

export interface ItemAuxiliar {
  id: number;
  titulo: string;
  valor: number;
  gratuito?: boolean;
  quantidadeMaxima?: number;
}

export interface GrupoItemAuxiliar {
  id: number;
  nome: string;
  descricao?: string;
  obrigatorio: boolean;
  maximo?: number;
  tipo: TipoGrupo;
  itens: ItemAuxiliar[];
}

export interface ProdutoComGrupos {
  produtoId: number;
  produtoNome: string;
  grupos: GrupoItemAuxiliar[];
}
