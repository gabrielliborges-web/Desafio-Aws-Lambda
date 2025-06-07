type Recorrencia = "UNICO" | "DIARIO" | "SEMANAL" | "MENSAL" | "ANUAL";
type Status = "ATIVO" | "INÁTIVO" | "CONCLUÍDO" | "PAUSADO";
type Permissao = "PRIVADO" | "PÚBLICO";
type Tipo = "PRIVADO" | "PÚBLICO";

export interface Evento {
  id: number;
  criador_id: number;
  recorrencia: Recorrencia;
  status: Status;
  Permissao: Permissao;
  Tipo: Tipo;
  nome: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
  idade_minima: number;
  qtd_max_convidados: number;
  data_max_resposta: string | null;
  atualizado_em: string;
  criado_em: string;
  atualizado_por: number;
}

export type StatData = {
  title: string;
  value: string | number;
  change: string;
  dateCalc: string;
};

export interface EmpreendimentoProps {
  id: number;
  natureza_juridica?: string;
  nome: string;
  email?: string;
  imagem_perfil: string | null;
  imagens: string[];
  telefone: string;
  cnpj?: string;
  descricao?: string;
  whatsapp_cliente: string;
  whatsapp_proprietario: string;

  logradouro: string;
  complemento?: string;
  cep: string;
  numero: string;
  cidade: string;
  estado: string;
  pais: string;
  bairro: string;
  Status: string;

  pedido_minimo: number;
  qtd_funcionarios: number;

  instagram?: string;
  facebook?: string;

  criado_em: string;
  criado_por?: {
    Nome: string;
  };
  atualizado_em?: string;
  atualizado_por?: number;
}
