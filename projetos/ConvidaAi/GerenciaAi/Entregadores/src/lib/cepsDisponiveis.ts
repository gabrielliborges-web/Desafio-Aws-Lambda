import { getAPIClient } from "./api";

const api = getAPIClient();

export const getAllItens = async (empreendimento_id: number) => {
  const response = await api.get(
    `/empreendimento/profile/cep/${empreendimento_id}`
  );
  return response.data;
};

export const deleteItem = async (
  solicitante_id: number | null | any,
  empreendimento_id: number,
  id_Item: number
) => {
  const response = await api.delete(
    `/empreendimento/delete/cep/${solicitante_id}/${empreendimento_id}/${id_Item}`
  );
  return response.data;
};

export const updateItem = async (
  body: {
    ceps: string[];
  },
  idSolicitante: number,
  idEmpreendimento: number
) => {
  const response = await api.patch(
    `/empreendimento/update/cep/${idSolicitante}/${idEmpreendimento}`,
    body
  );

  return response.data;
};

export const createItems = async (
  body: {
    ceps: string[];
  },
  idSolicitante: number,
  idEmpreendimento: number
) => {
  const response = await api.post(
    `/empreendimento/create/cep/${idSolicitante}/${idEmpreendimento}`,
    body
  );

  return response.data;
};
