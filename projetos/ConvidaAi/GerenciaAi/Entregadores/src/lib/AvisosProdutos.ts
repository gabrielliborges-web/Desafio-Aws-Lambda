import { getAPIClient } from "./api";

const api = getAPIClient();

export const getAllAvisosProdutos = async (empreendimento_id: number) => {
  const response = await api.get(
    `/empreendimento/profile/notice/${empreendimento_id}`
  );
  return response.data;
};

export const getAllItensProdutos = async (empreendimento_id: number) => {
  const response = await api.get(
    `/empreendimento/profile/product/${empreendimento_id}`
  );
  return response.data;
};

export const getAllItemEmpreendimento = async (empreendimento_id: number) => {
  const response = await api.get(
    `/empreendimento/profile/${empreendimento_id}`
  );
  return response.data;
};

export const getAllNoticiasProdutos = async (empreendimento_id: number) => {
  const response = await api.get(
    `/empreendimento/profile/notice/${empreendimento_id}`
  );
  return response.data;
};

export const deleteItem = async (
  solicitante_id: number | null | any,
  empreendimento_id: number,
  id_Item: number
) => {
  const response = await api.delete(
    `/empreendimento/delete/notice/${solicitante_id}/${empreendimento_id}/${id_Item}`
  );
  return response.data;
};

export const updateItem = async (
  body: {
    quantidade: number;
    produto_id: number;
  },
  idSolicitante: number,
  idEmpreendimento: number,
  quantidade_id: number
) => {
  const response = await api.patch(
    `/empreendimento/update/notice/${idSolicitante}/${idEmpreendimento}/${quantidade_id}`,
    body
  );

  return response.data;
};

export const createItems = async (
  body: {
    quantidade: number;
    produto_id: number;
  },
  idSolicitante: number,
  idEmpreendimento: number
) => {
  const response = await api.post(
    `/empreendimento/create/notice/${idSolicitante}/${idEmpreendimento}`,
    body
  );

  return response.data;
};
