import { getAPIClient } from "./api";

const api = getAPIClient();

export const getAllItens = async (empreendimento_id: number) => {
  const response = await api.get(
    `/empreendimento/profile/category/${empreendimento_id}`
  );
  return response.data;
};

export const deleteItem = async (
  solicitante_id: number | null | any,
  empreendimento_id: number,
  id_Item: number
) => {
  const response = await api.delete(
    `/empreendimento/delete/category/${solicitante_id}/${empreendimento_id}/${id_Item}`
  );
  return response.data;
};

export const updateItem = async (
  body: FormData,
  idSolicitante: number,
  idEmpreendimento: number,
  idCategoria: number
) => {
  const response = await api.patch(
    `/empreendimento/update/category/${idSolicitante}/${idEmpreendimento}/${idCategoria}`,
    body,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const createItems = async (
  body: FormData,
  idSolicitante: number,
  idEmpreendimento: number
) => {
  const response = await api.post(
    `/empreendimento/create/category/${idSolicitante}/${idEmpreendimento}`,
    body,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
