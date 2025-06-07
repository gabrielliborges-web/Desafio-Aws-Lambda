import { getAPIClient } from "./api";

const api = getAPIClient();

export const getAllItensPromotion = async (empreendimento_id: number) => {
  const response = await api.get(
    `/empreendimento/profile/promotion/${empreendimento_id}`
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

export const deleteItem = async (
  solicitante_id: number | null | any,
  empreendimento_id: number,
  id_Item: number
) => {
  const response = await api.delete(
    `/empreendimento/delete/promotion/${solicitante_id}/${empreendimento_id}/${id_Item}`
  );
  return response.data;
};

export const updateItem = async (
  body: {
    diasParaVencer: number;
    porcentagem: number;
    produto_id: number;
  },
  idSolicitante: number,
  idEmpreendimento: number,
  promocao_id: number
) => {
  const response = await api.patch(
    `/empreendimento/update/promotion/${idSolicitante}/${idEmpreendimento}/${promocao_id}`,
    body
  );

  return response.data;
};

export const createItems = async (
  body: {
    diasParaVencer: number;
    porcentagem: number;
    produto_id: number;
  },
  idSolicitante: number,
  idEmpreendimento: number
) => {
  const response = await api.post(
    `/empreendimento/create/promotion/${idSolicitante}/${idEmpreendimento}`,
    body
  );

  return response.data;
};
