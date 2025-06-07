import { getAPIClient } from "./api";

const api = getAPIClient();

export const getAllConversas = async (empreendimento_id: number) => {
  const response = await api.get(
    `/conversations/${empreendimento_id}`
  );
  return response.data;
};

export const enviarMensagem = async (
  body: {
    mensagem: string;
    conversaId: number;
    usuarioId: number;
  },
  idEmpreendimento: number
) => {
  const response = await api.post(
 
    `/client/conversation/${body.conversaId}/messages`,
    {
      mensagem: body.mensagem,
      remetente: "EMPREENDIMENTO", 
      usuarioId: body.usuarioId,    
      idEmpreendimento: idEmpreendimento,
    }
  );

  return response.data;
};

export const marcarConversaComoLida = async (
  conversaId: number,
  tipo: "CLIENTE" | "EMPREENDIMENTO" | "ENTREGADOR"
) => {
  const response = await api.patch(`/conversas/${conversaId}/leitura`, {
    tipo: tipo,
  });

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

