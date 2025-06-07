import { getAPIClient } from "./api";

const api = getAPIClient();

export const getAllPedidos = async (empreendimento_id: number) => {
  const response = await api.get(
    `/empreendimento/profile/all/order/${empreendimento_id}`
  );
  return response.data;
};

export const getAllPedidosRangeTime = async (
  empreendimento_id: number,
  dataInicio: string,
  dataFim: string
) => {
  const response = await api.get(
    `/empreendimento/order/time/${empreendimento_id}`
  );
  return response.data;
};

export const deleteItem = async (
  solicitante_id: number | null | any,
  empreendimento_id: number,
  id_Item: number
) => {
  const response = await api.delete(
    `/empreendimento/delete/sector/${solicitante_id}/${empreendimento_id}/${id_Item}`
  );
  return response.data;
};

export const createItems = async (
  body: {
    titulo: string;
    telefone: string;
    logradouro?: string;
    complemento?: string;
    cep?: string;
    numero?: string;
    cidade?: string;
    estado?: string;
    pais?: string;
    bairro?: string;
    produto_ids?: number[];
  },
  idSolicitante: number,
  idEmpreendimento: number
) => {
  const response = await api.post(
    `/empreendimento/create/sector/${idSolicitante}/${idEmpreendimento}`,
    body
  );

  return response.data;
};

export const updateItemPedido = async (
  body: any,
  idSolicitante: number
  // idEmpreendimento: number
) => {
  const response = await api.patch(
    `/empreendimento/update/order/${idSolicitante}`,
    body
  );

  return response.data;
};
