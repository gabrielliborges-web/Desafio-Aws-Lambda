export interface SetorEstoque {
  id: number;
  titulo: string;
  descricao: string;
  empreendimento_id: number;
  criado_em: Date;
  criado_por?: number;
  atualizado_em?: Date;
  atualizado_por?: number;
  Produtos: any[];
  empreendimento: any;
}
