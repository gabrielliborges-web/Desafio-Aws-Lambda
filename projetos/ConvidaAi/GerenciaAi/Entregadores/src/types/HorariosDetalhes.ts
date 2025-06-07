export type Horario = {
  tipo_atendimento: "LOJA" | "DELIVERY";
  dia: string;
  id: number;
  dia_da_semana: string;
  horario_inicio: string;
  horario_fim: string;
};

export type HorarioFuncionamento = {
  id: number;
  dia_da_semana: string;
  tipo_atendimento: string;
  horario_inicio: string;
  horario_fim: string;
  empreendimento_id: number;
  criado_em: string;
  criado_por: number;
  atualizado_em: string | null;
  atualizado_por: number | null;
};

export type HorariosAgrupados = {
  dia_da_semana: string;
  turnos: HorarioFuncionamento[];
};
