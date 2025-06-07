import { getAPIClient } from "./api";

const api = getAPIClient();

export const getAllItens = async (empreendimento_id: number) => {
  const response = await api.get(
    `/empreendimento/profile/time/${empreendimento_id}`
  );
  return response.data;
};

export const deleteItem = async (
  solicitante_id: number | null | any,
  empreendimento_id: number,
  id_Item: number
) => {
  const response = await api.delete(
    `/empreendimento/delete/time/${solicitante_id}/${empreendimento_id}/${id_Item}`
  );
  return response.data;
};

export const updateItem = async (
  body: any,
  idSolicitante: number,
  idEmpreendimento: number,
  horario_id: number
) => {
  const response = await api.patch(
    `/empreendimento/update/time/${idSolicitante}/${idEmpreendimento}/${horario_id}`,
    body
  );

  return response.data;
};

export const createItems = async (
  body: any,
  idSolicitante: number,
  idEmpreendimento: number
) => {
  const response = await api.post(
    `/empreendimento/create/time/${idSolicitante}/${idEmpreendimento}`,
    body
  );

  return response.data;
};
