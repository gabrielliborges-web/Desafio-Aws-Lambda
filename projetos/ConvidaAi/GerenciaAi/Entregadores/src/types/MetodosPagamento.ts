export type TipoPagamento =
  | "PIX"
  | "CARTAO_DEBITO"
  | "CARTAO_CREDITO"
  | "DINHEIRO"
  | "TRANSFERENCIA";

export type Status = "ATIVO" | "INATIVO";

export interface MetodoLog {
  id: number;
  acao: string;
  criado_em: string;
  valorAnterior?: string;
  valorAtual?: string;
}
export interface MetodoPagamento {
  id?: number;
  descricao: string;
  tipo_pagamento: TipoPagamento;
  bandeiras_aceitas: string[];
  chave_pix: string[];
  status: Status;
  empreendimento_id: number;
  ativo: boolean;
  criado_em: Date;
  criado_por?: number;
  atualizado_em?: Date;
  atualizado_por?: number;
  pedidos: any[];
  empreendimento: any;
  logs?: MetodoLog[];
}
