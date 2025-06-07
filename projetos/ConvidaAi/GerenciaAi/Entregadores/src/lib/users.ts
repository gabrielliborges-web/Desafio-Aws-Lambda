import { getAPIClient } from "./api";

interface ApiResponse {
  status: number;
  mensagem: string;
  data?: any;
}

const api = getAPIClient();

export const loginUser = async (body: {
  telefone?: string;
  email?: string;
  senha: string;
}) => {
  const response = await api.post("/deliveryman/login", body);

  return response;
};
export const createUser = async (body: {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  cpf: string;
  tela?: string | null;
}) => {
  const response = await api.post("/user/create", body);
  return response;
};

export const enviarCodigoValidacao = async (body: any) => {
  const response = await api.post("/user/remember/codigo/email", body);
  return response.data;
};
export const enviarCodigoValidacaoSenha = async (body: any) => {
  const response = await api.post("/user/remember/codigo/senha", body);
  return response.data;
};
export const validarCodigoEnviado = async (
  email?: string,
  telefone?: string,
  codigo?: string
) => {
  try {
    const response = await api.get("/user/validate/codigo", {
      params: {
        email: email?.trim(),
        telefone: telefone?.trim(),
        codigo: codigo?.trim(),
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao verificar código de recuperação:", error);
    throw error;
  }
};
export const updateUserSenha = async (senha: string, id: string | number) => {
  const response = await api.patch(`/user/update/senha/${id}`, { senha });
  return response.data;
};

// profile
export const getProfileUser = async (id: string) => {
  const response = await api.get(`/empreendimento/profile/deliveryman/${id}`);
  return response.data;
};
export const getUserSearch = async (query: string) => {
  const response = await api.get(`/user/search?${query}`);
  return response.data;
};
export const getUserProfile = async () => {
  const response = await api.get("/users/perfil");
  return response.data;
};
export const updateUserProfile = async (body: any, id: number) => {
  const formData = new FormData();

  Object.keys(body).forEach((key) => {
    if (key === "imagem_perfil" && body[key]) {
      formData.append("imagem_perfil", body[key]);
    } else {
      formData.append(key, body[key]);
    }
  });

  const response = await api.patch(
    `/user/update/infos/profile/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
export const removeImagePerfil = async (id: number) => {
  const response = await api.delete(`/user/delete/imagemPerfil/${id}`);
  return response.data;
};

// TELA DE USUARIOS
export const getAllUsers = async (empreendimento_id: number) => {
  const response = await api.get(`/user/all/${empreendimento_id}`);
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
export const updateUser = async (
  body: any,
  idSolicitante: number,
  idUsuario: number
) => {
  const response = await api.patch(
    `/user/update/infos/${idSolicitante}/${idUsuario}`,
    body
  );

  return response.data;
};
export const createUserEmpreendimento = async (
  body: any,
  idEmpreendimento: number,
  idSolicitante: number
) => {
  const response = await api.post(
    `/user/create/${idEmpreendimento}/${idSolicitante}`,
    body
  );
  return response.data;
};
