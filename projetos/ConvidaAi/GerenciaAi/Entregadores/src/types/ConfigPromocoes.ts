export interface ConfigPromocao {
  id: number;
  diasParaVencer: number;
  porcentagem: number;
  produto_id: number;
  empreendimento_id: number;
  criado_em: Date;
  criado_por?: number;
  atualizado_em?: Date;
  atualizado_por?: number;
  empreendimento: any; // pode tipar depois
  produto: {
    id: number;
    titulo: string;
  };
}
