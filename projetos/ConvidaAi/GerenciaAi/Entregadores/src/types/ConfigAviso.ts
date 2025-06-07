export interface ConfigAviso {
  id: number;
  produto_id: number;
  quantidade: number;
  empreendimento_id: number;
  created_at: Date;
  updated_at?: Date;
  created_by?: number;
  updated_by?: number;
  empreendimento: any;
  produto: {
    id: number;
    titulo: string;
  };
}
