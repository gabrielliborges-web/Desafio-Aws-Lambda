export type Usuario = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  cpf: string;

  imagem_perfil: string;
  status?: "ATIVO" | "INATIVO" | "";
  perfil_usuario?: "ADMINISTRADOR" | "FUNCIONARIO" | "MASTER" | "";

  logradouro: string;
  complemento: string;
  cep: string;
  cidade: string;
  numero: string;
  estado: string;
  pais: string;
  bairro: string;

  atualizado_em?: string;
  criado_em?: string;
  empreendimentoId: number;
  empreendimentos: {
    criado_em: string;
    empreendimentoId: number;
    usuarioId: number;
  }[];
  empreendimento: {
    criado_em: string;
    id: number;
    nome:string;
  };
  logs?: {
    acao: string;
    criado_em: string;
    empreendimentoId: null;
    id: number;
    Usuario: {
      imagem_perfil: string | null;
      nome: string;
    };
    usuarioId: number;
    valorAnterior: null;
    valorAtual: string;
  }[];
};
