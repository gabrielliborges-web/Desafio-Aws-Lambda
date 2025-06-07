import { getAPIClient } from "./api";

const api = getAPIClient();

export const getAllItensProdutos = async (empreendimento_id: number) => {
  const response = await api.get(
    `/empreendimento/profile/product/${empreendimento_id}`
  );
  return response.data;
};

export const getAllItensEmpreendimento = async (empreendimento_id: number) => {
  const response = await api.get(
    `/empreendimento/profile/${empreendimento_id}`
  );
  return response.data;
};

export const getAllSubProdutos = async (empreendimento_id: number) => {
  const response = await api.get(
    `/empreendimento/search/product/subprodutos/${empreendimento_id}`
  );
  return response.data;
};

export const deleteItem = async (
  solicitante_id: number | null | any,
  empreendimento_id: number,
  id_Item: number
) => {
  const response = await api.delete(
    `/empreendimento/delete/product/${solicitante_id}/${empreendimento_id}/${id_Item}`
  );
  return response.data;
};

export const updateItem = async (
  formData: FormData,
  idSolicitante: number,
  idEmpreendimento: number,
  idCategoria: number
) => {
  const response = await api.patch(
    `/empreendimento/update/product/${idSolicitante}/${idEmpreendimento}/${idCategoria}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const createItems = async (
  formData: FormData,
  idSolicitante: number,
  idEmpreendimento: number
) => {
  const response = await api.post(
    `/empreendimento/create/product/${idSolicitante}/${idEmpreendimento}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
