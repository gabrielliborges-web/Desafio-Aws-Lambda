export interface Entregador {
  id: number;

  nome: string;
  telefone: string;
  veiculo: string;
  cpf: string;
  ativo: boolean;
  imagem_perfil: string;

  logradouro: string;
  complemento?: string;
  cep: string;
  cidade: string;
  numero: string;
  estado: string;
  pais: string;
  bairro: string;

  empreendimento_id: number;
  criado_em: Date;
  criado_por?: number;
  atualizado_em?: Date;
  atualizado_por?: number;
  empreendimento: any;
  Pedidos: any[];
  entregas: any[];
}
