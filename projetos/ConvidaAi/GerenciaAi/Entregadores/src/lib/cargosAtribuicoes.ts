import { getAPIClient } from "./api";

const api = getAPIClient();

export const getAllItens = async (empreendimento_id: number) => {
  const response = await api.get(
    `/empreendimento/profile/roles/${empreendimento_id}`
  );
  return response.data;
};

export const createItems = async (
  body: any,
  idSolicitante: number,
  idEmpreendimento: number
) => {
  const response = await api.post(
    `/empreendimento/create/roles/${idSolicitante}/${idEmpreendimento}`,
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
    `/empreendimento/delete/roles/${solicitante_id}/${empreendimento_id}/${id_Item}`
  );
  return response.data;
};

export const updateItem = async (
  body: {
    titulo: string;
    atribuicoes: string;
  },
  idSolicitante: number,
  idEmpreendimento: number,
  cargoId: number
) => {
  const response = await api.patch(
    `/empreendimento/update/roles/${idSolicitante}/${idEmpreendimento}/${cargoId}`,
    body
  );

  return response.data;
};
