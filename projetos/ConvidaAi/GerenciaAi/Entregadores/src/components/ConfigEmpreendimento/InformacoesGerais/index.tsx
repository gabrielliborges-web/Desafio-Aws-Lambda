import { AuthContext } from "@/src/contexts/AuthContext";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import imgNotFound from "../../../../assets/SemFoto.png";
import { removeImagePerfil, updateUserProfile } from "@/src/lib/empreendimento";
import toast from "react-hot-toast";
import { EmpreendimentoProps } from "@/src/types/EmpreendimentoProps";
import Image from "next/image";
import { EmpreendimentoContext } from "@/src/contexts/EmpreendimentoContext ";

export default function InformacoesGerais() {
  let { user } = useContext(AuthContext);
  let { empreendimento } = useContext(EmpreendimentoContext);

  const [formData, setFormData] = useState<EmpreendimentoProps | any>({
    id: 0,
    natureza_juridica: "PESSOA_JURIDICA",
    nome: "",
    email: "",
    imagem_perfil: null,
    imagens: [],
    telefone: "",
    cnpj: "",
    descricao: "",
    whatsapp_cliente: "",
    whatsapp_proprietario: "",

    logradouro: "",
    complemento: "",
    cep: "",
    numero: "",
    cidade: "",
    estado: "",
    pais: "",
    bairro: "",
    Status: "ATIVO",

    pedido_minimo: 0,
    qtd_funcionarios: 0,

    instagram: "",
    facebook: "",

    criado_em: new Date().toISOString(),
    criado_por: {
      Nome: "",
    },
    atualizado_em: "",
    atualizado_por: 0,
  });

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

      const dataToSend: EmpreendimentoProps & {
        cnpj?: string;
        sexo?: string;
        raca?: string;
        orientacao_sexual?: string;
      } = {
        ...formData,
        telefone: formData.telefone
          ? formData.telefone
              .replaceAll(" ", "")
              .replaceAll("(", "")
              .replaceAll(")", "")
              .replaceAll("-", "")
          : "",

        cnpj: formData.cnpj
          ? formData.cnpj
              .replaceAll(".", "")
              .replaceAll("/", "")
              .replaceAll("-", "")
          : "",
      };

      const response = await updateUserProfile(
        dataToSend,
        userid,
        empreendimento?.id
      );

      if (response.status === 200) {
        toast.success(response.mensagem);
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
    if (empreendimento) {
      setFormData(empreendimento);
    }
  }, [empreendimento]);

  return (
    <div className="p-6 w-full bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        Editar Informações Gerais
      </h2>
      <div className="space-y-6">
        <div className="relative w-32 h-32">
          <Image
            src={
              formData.imagem_perfil ? formData.imagem_perfil : imgNotFound.src
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
              onClick={handleRemoveImagePerfil}
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
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700"
            placeholder="seuemail@exemplo.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Fale um pouco sobre você"
            rows={4}
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Natureza Jurídica
          </label>
          <select
            name="natureza_juridica"
            value={formData.natureza_juridica}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 bg-white"
          >
            <option value="">Selecione</option>
            <option value="PESSOA_FISICA">Pessoa Física</option>
            <option value="PESSOA_JURIDICA">Pessoa Jurídica</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CNPJ
          </label>
          <InputMask
            mask="99.999.999/9999-99"
            value={formData.cnpj || ""}
            onChange={(e) => handleInputChange(e)}
          >
            {(inputProps) => (
              <input
                {...inputProps}
                type="text"
                name="cnpj"
                className="w-full border border-gray-300 rounded-sm p-3 text-gray-700"
                placeholder="XX.XXX.XXX/XXXX-XX"
              />
            )}
          </InputMask>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantidade de Funcionários
          </label>
          <input
            type="number"
            name="qtd_funcionarios"
            value={formData.qtd_funcionarios}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Quantidade de funcionários"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pedido Mínimo
          </label>
          <input
            type="number"
            name="pedido_minimo"
            value={formData.pedido_minimo}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Quantidade de funcionários"
          />
        </div>

        <button
          className="w-full bg-blue-500 text-white py-3 rounded-sm font-bold hover:bg-blue-600"
          onClick={handleUpdateInfo}
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}
