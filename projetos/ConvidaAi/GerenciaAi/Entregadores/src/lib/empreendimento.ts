import { getAPIClient } from "./api";

const api = getAPIClient();

// profile
export const getProfileEmpreendimento = async (empreendimento_id: number) => {
  const response = await api.get(
    `/empreendimento/profile/${empreendimento_id}`
  );
  return response.data;
};

export const getProfileUser = async (id: string) => {
  const response = await api.get(`/user/profile/${id}`);
  return response.data;
};
export const updateUserProfile = async (
  body: any,
  IdUser: number,
  Idempreendimento: number
) => {
  const formData = new FormData();

  Object.keys(body).forEach((key) => {
    if (key === "imagem_perfil" && body[key]) {
      formData.append("imagem_perfil", body[key]);
    } else {
      formData.append(key, body[key]);
    }
  });

  const response = await api.patch(
    `/empreendimento/update/infos/${IdUser}/${Idempreendimento}`,
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
  // body: {
  //   nome: string;
  //   email: string;
  //   senha: string;
  //   telefone: string;
  //   cpf: string;
  //   tela?: string | null;
  //   logradouro: string;
  //   complemento: string;
  //   cep: string;
  //   numero: string;
  //   cidade: string;
  //   estado: string;
  //   pais: string;
  //   bairro: string;
  // },
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
