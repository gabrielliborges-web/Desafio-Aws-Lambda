import { getAPIClient } from "./api";

const api = getAPIClient();

export const getAllItens = async (empreendimento_id: number) => {
  const response = await api.get(
    `/empreendimento/full-questions/${empreendimento_id}`
  );
  return response.data;
};

export const createItems = async (
  body: any,
  idSolicitante: number,
  idEmpreendimento: number
) => {
  const response = await api.post(
    `/empreendimento/create/full-question/${idSolicitante}/${idEmpreendimento}`,
    body
  );

  return response.data;
};

export const deleteItem = async (
  solicitante_id: number | null | any,
  empreendimento_id: number,
  id_Item: number
) => {
  const response = await api.delete(
    `/empreendimento/delete/full-question/${solicitante_id}/${empreendimento_id}/${id_Item}`
  );
  return response.data;
};

export const updateItem = async (
  body: any,
  idSolicitante: number,
  idEmpreendimento: number,
  avisoId: number
) => {
  const response = await api.patch(
    `/empreendimento/update/full-question/${idSolicitante}/${idEmpreendimento}/${avisoId}`,
    body
  );

  return response.data;
};
