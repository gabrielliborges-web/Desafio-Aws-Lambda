import { getAPIClient } from "./api";

const api = getAPIClient();

export const getAllItens = async (empreendimento_id: number) => {
  const response = await api.get(
    `/empreendimento/profile/methodpayment/${empreendimento_id}`
  );
  return response.data;
};

export const createItems = async (
  body: any,
  idSolicitante: number,
  idEmpreendimento: number
) => {
  const response = await api.post(
    `/empreendimento/create/methodpayment/${idSolicitante}/${idEmpreendimento}`,
    body
  );
  return response.data;
};

export const updateItem = async (
  body: any,
  idSolicitante: number,
  idEmpreendimento: number
) => {
  const response = await api.patch(
    `/empreendimento/update/methodpayment/${idSolicitante}/${idEmpreendimento}`,
    body
  );

  return response.data;
};

export const deleteUser = async (
  solicitante_id: number | null | any,
  user_id: number
) => {
  const response = await api.delete(
    `/user/delete/${solicitante_id}/${user_id}`
  );
  return response.data;
};
