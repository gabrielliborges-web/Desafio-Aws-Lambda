import { getAPIClient } from "./api";

const api = getAPIClient();

export const getAllItens = async (empreendimento_id: number) => {
  const response = await api.get(
    `/empreendimento/profile/recebimento/${empreendimento_id}`
  );
  return response.data;
};

export const deleteItem = async (
  solicitante_id: number | null | any,
  empreendimento_id: number,
  id_Item: number
) => {
  const response = await api.delete(
    `/empreendimento/delete/recebimento/${solicitante_id}/${empreendimento_id}/${id_Item}`
  );
  return response.data;
};

export const createItems = async (
  body: {
    titulo: string;
    telefone: string;
    logradouro?: string;
    complemento?: string;
    cep?: string;
    numero?: string;
    cidade?: string;
    estado?: string;
    pais?: string;
    bairro?: string;
    produto_ids?: number[];
  },
  idSolicitante: number,
  idEmpreendimento: number
) => {
  const response = await api.post(
    `/empreendimento/create/recebimento/${idSolicitante}/${idEmpreendimento}`,
    body
  );

  return response.data;
};

export const updateRecebimento = async (
  formData: FormData,
  idSolicitante: number,
  idEmpreendimento: number,
  idRecebimento: number
) => {
  const response = await api.patch(
    `/empreendimento/update/recebimento/${idSolicitante}/${idEmpreendimento}/${idRecebimento}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteDocumentoRecebimento = async (documentoId: number) => {
  const response = await api.delete(`/recebimento/documentos/${documentoId}`);
  return response.data;
};

export const updateDocumentoRecebimento = async (
  documentoId: number,
  file: File
) => {
  const formData = new FormData();
  formData.append("documento", file);

  const response = await api.patch(
    `/recebimento/documentos/${documentoId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const addDocumentosRecebimento = async (
  idRecebimento: number,
  arquivos: File[]
) => {
  const formData = new FormData();
  arquivos.forEach((arquivo) => {
    formData.append("documentos", arquivo);
  });

  const response = await api.post(
    `/recebimento/${idRecebimento}/documentos`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
