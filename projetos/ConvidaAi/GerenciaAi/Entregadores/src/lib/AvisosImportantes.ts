import { getAPIClient } from "./api";

const api = getAPIClient();

export const getAllItens = async (empreendimento_id: number) => {
  const response = await api.get(
    `/empreendimento/profile/importantnotices/${empreendimento_id}`
  );
  return response.data;
};

export const createItems = async (
  body: any,
  idSolicitante: number,
  idEmpreendimento: number
) => {
  const response = await api.post(
    `/empreendimento/create/importantnotices/${idSolicitante}/${idEmpreendimento}`,
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
    `/empreendimento/delete/importantnotices/${solicitante_id}/${empreendimento_id}/${id_Item}`
  );
  return response.data;
};

export const updateItem = async (
  body: {
    titulo: string;
    descricao?: string;
    importancia: "baixa" | "media" | "alta";
    data_inicio: string;
    data_fim: string;
    usuarios_ids?: number[];
  },
  idSolicitante: number,
  idEmpreendimento: number,
  avisoId: number
) => {
  const response = await api.patch(
    `/empreendimento/update/importantnotices/${idSolicitante}/${idEmpreendimento}/${avisoId}`,
    body
  );

  return response.data;
};

export const getAvisosImportantesUser = async (
  empreendimento_id: number,
  idUser: number
) => {
  const response = await api.get(
    `/empreendimento/profile/importantnotices/${empreendimento_id}/${idUser}`
  );
  return response.data;
};

export const getAvisosImportantesUserConfimacao = async (
  empreendimento_id: number,
  idUser: number
) => {
  const response = await api.get(
    `/empreendimento/profile/importantnotices-confirm/${empreendimento_id}/${idUser}`
  );
  return response.data;
};

export const confirmAvisoItem = async (
  idSolicitante: number,
  avisoId: number
) => {
  const response = await api.post(
    `/important-notices/confirm/${avisoId}/${idSolicitante}`
  );

  return response.data;
};
