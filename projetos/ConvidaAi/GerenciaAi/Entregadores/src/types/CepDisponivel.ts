export interface CepDisponivel {
  id: number;
  cep: string;

  logradouro: string;
  cidade: string;
  estado: string;
  pais: string;
  bairro: string;

  empreendimento_id: number;
  criado_em: Date;
  criado_por?: number;
  atualizado_em?: Date;
  atualizado_por?: number;
  empreendimento: any;
}
