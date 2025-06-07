import { AuthContext } from "@/src/contexts/AuthContext";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import imgNotFound from "../../../../assets/SemFoto.png";
import {
  getProfileUser,
  removeImagePerfil,
  updateUserProfile,
} from "@/src/lib/users";
import toast from "react-hot-toast";
import { Usuario } from "@/src/types/Usuarios";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import router from "next/router";
import Image from "next/image";
dayjs.locale("pt-br");

export default function InformacoesPessoais() {
  let { user, setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState<any>({
    id: 0,
    nome: "",
    email: "",
    imagem_perfil: "",
    telefone: "",
    cpf: "",
    status: "",
    perfil_usuario: "",
    logradouro: "",
    complemento: "",
    cep: "",
    numero: "",
    cidade: "",
    estado: "",
    pais: "Brasil",
    bairro: "",
    criado_em: "",
    atualizado_em: "",
  });

  const [showConfirmRemoveImage, setShowConfirmRemoveImage] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleUpdateInfo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const userid = user?.id || 0;
      toast.success("Carregando...");

      delete formData.atualizado_em;
      delete formData.criado_em;

      const sanitize = (value: any) =>
        value === null || value === "null" || typeof value === "undefined"
          ? ""
          : value;

      const dataToSend: any = {
        ...formData,
        cpf: formData.cpf
          ? formData.cpf.replaceAll(".", "").replaceAll("-", "")
          : "",

        telefone: formData.telefone
          ? formData.telefone
            .replaceAll(" ", "")
            .replaceAll("(", "")
            .replaceAll(")", "")
            .replaceAll("-", "")
          : "",

        logradouro: sanitize(formData.logradouro),
        complemento: sanitize(formData.complemento),
        cep: sanitize(formData.cep),
        numero: sanitize(formData.numero),
        cidade: sanitize(formData.cidade),
        estado: sanitize(formData.estado),
        pais: sanitize(formData.pais),
        bairro: sanitize(formData.bairro),
      };

      const response = await updateUserProfile(dataToSend, userid);

      if (response.status === 200) {
        toast.success(response.mensagem);
        debugger

        const resp = await getProfileUser(response.usuario.id);
        let user = resp.usuario;
        if (user.nome) {
          setUser(user);
        }
      } else {
        toast.error(response.mensagem);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.mensagem || "Erro ao atualizar.");
      return error;
    }
  };

  const handleRemoveImagePerfil = async () => {
    try {
      let respondeInfos = await removeImagePerfil(user?.id || 0);

      if (respondeInfos.status === 200) {
        toast.success(respondeInfos.mensagem);
        setFormData((prev: any) => ({ ...prev, imagem_perfil: null }));
      } else {
        toast.error(respondeInfos.mensagem);
      }
    } catch (error: any) {
      toast.error(error.response.data.mensagem);
      return error;
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        nome: user?.nome,
        email: user?.email,
        imagem_perfil: user?.imagem_perfil,
        telefone: user?.telefone,
        cpf: user?.cpf,
        status: user?.status,
        perfil_usuario: user?.perfil_usuario,
        criado_em: user?.criado_em,
        atualizado_em: user?.atualizado_em,
        logradouro: user?.logradouro,
        complemento: user?.complemento,
        cep: user?.cep,
        numero: user?.numero,
        cidade: user?.cidade,
        estado: user?.estado,
        pais: user?.pais,
        bairro: user?.bairro,
      });
    }
  }, [user]);

  return (
    <div className="p-6 w-full bg-white">
      {showConfirmRemoveImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-32 z-50">
          <div className="bg-white rounded-md shadow-lg p-6 w-[90%] max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4">
              Remover imagem de perfil
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Tem certeza que deseja remover a imagem de perfil?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmRemoveImage(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  handleRemoveImagePerfil();
                  setShowConfirmRemoveImage(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        Informações Pessoais
      </h2>
      <div className="space-y-6">
        <div className="relative w-32 h-32">
          <Image
            src={
              formData.imagem_perfil
                ? typeof formData.imagem_perfil === "string"
                  ? formData.imagem_perfil
                  : URL.createObjectURL(formData.imagem_perfil)
                : imgNotFound.src
            }
            alt="Imagem de Perfil"
            width={150}
            height={150}
            className="w-full h-full rounded-full object-cover border border-gray-300"
          />
          <label
            htmlFor="imagem_perfil"
            className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-6.036a2.5 2.5 0 113.536 3.536L7 21H3v-4L16.732 3.732z"
              />
            </svg>
          </label>
          {formData.imagem_perfil && (
            <button
              type="button"
              onClick={() => setShowConfirmRemoveImage(true)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full cursor-pointer hover:bg-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          <input
            type="file"
            id="imagem_perfil"
            name="imagem_perfil"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setFormData((prev: any) => ({ ...prev, imagem_perfil: file }));
            }}
            className="hidden"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Seu nome completo"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            disabled
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700"
            placeholder="seuemail@exemplo.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefone
          </label>
          <InputMask
            mask="(99) 99999-9999"
            value={formData.telefone}
            onChange={(e) => handleInputChange(e)}
          >
            {(inputProps) => (
              <input
                {...inputProps}
                type="tel"
                name="telefone"
                className="w-full border border-gray-300 rounded-sm p-3 text-gray-700"
                placeholder="(XX) XXXXX-XXXX"
              />
            )}
          </InputMask>
        </div>

        <div>
          <label htmlFor="cpf" className="block text-sm font-medium mb-1">
            CPF *
          </label>
          <InputMask
            mask="999.999.999-99"
            maskChar={null}
            id="cpf"
            value={formData.cpf}
            onChange={handleInputChange}
            required
            placeholder="999.999.999-99"
            className="block w-full border border-gray-300 p-2 rounded-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Perfil do Usuário
          </label>
          <select
            name="perfil_usuario"
            value={formData.perfil_usuario}
            onChange={handleInputChange}
            disabled
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
          >
            <option value="ADMINISTRADOR">Administrador</option>
            <option value="FUNCIONARIO">Funcionário</option>
            <option value="MASTER">Master</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            disabled
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
          >
            <option value="ATIVO">ATIVO</option>
            <option value="INATIVO">INATIVO</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data da última atualização
          </label>
          <input
            type="text"
            name="atualizado_em"
            disabled
            value={
              formData.atualizado_em
                ? dayjs(formData.atualizado_em).format("DD/MM/YYYY HH:mm")
                : ""
            }
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data de criação
          </label>
          <input
            type="text"
            name="criado_em"
            disabled
            value={
              formData.criado_em
                ? dayjs(formData.criado_em).format("DD/MM/YYYY HH:mm")
                : ""
            }
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 bg-gray-100"
          />
        </div>
      </div>

      <button
        className="w-full bg-blue-500 text-white py-3 rounded-sm font-bold hover:bg-blue-600 mt-6"
        onClick={handleUpdateInfo}
      >
        Salvar Alterações
      </button>
    </div>
  );
}
