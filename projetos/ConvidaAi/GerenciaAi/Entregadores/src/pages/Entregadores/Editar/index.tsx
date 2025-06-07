import axios from "axios";
import Image from "next/image";
import React, { useState, ChangeEvent, useEffect } from "react";
import toast from "react-hot-toast";
import InputMask from "react-input-mask";
import imgNotFound from "../../../../assets/SemFoto.png";

// Tipagem do usuário
export type Usuario = {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  imagem_perfil: string;
  status?: "ATIVO" | "INATIVO" | "";
  perfil_usuario?: "ADMINISTRADOR" | "FUNCIONARIO" | "MASTER" | "";
  logradouro: string;
  complemento: string;
  cep: string;
  numero: string;
  cidade: string;
  estado: string;
  pais: string;
  bairro: string;
};

type EditarProps = {
  usuario: Usuario;
  onSalvar: (usuario: Usuario) => void;
  onCancelar: () => void;
};

export default function Editar({ usuario, onSalvar, onCancelar }: EditarProps) {
  const [formData, setFormData] = useState<Usuario>({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    imagem_perfil: "",
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
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buscarEnderecoViaCep = async () => {
    const cepLimpo = formData?.cep?.replace(/\D/g, "");
    if (cepLimpo.length !== 8) {
      toast.error("CEP inválido");
      return;
    }

    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );
      if (response.data.erro) {
        toast.error("CEP NÃO ENCONTRADO");
        return;
      }

      const { logradouro, bairro, localidade, uf } = response.data;

      setFormData((prev) => ({
        ...prev,
        logradouro: logradouro || "",
        bairro: bairro || "",
        cidade: localidade || "",
        estado: uf || "",
        pais: "Brasil",
      }));
    } catch (error) {
      toast.error("Erro ao buscar o CEP");
    }
  };

  useEffect(() => {
    if (usuario) setFormData(usuario);
  }, [usuario]);

  return (
    <div className="bg-white w-full max-w-5xl mx-auto p-8 rounded shadow space-y-8">
      <div className="px-4 sm:px-0">
        <h2 className="text-xl font-semibold text-gray-900">
          Editar informações de {usuario.nome}
        </h2>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Informações Gerais
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              className="w-full border border-gray-300 rounded-sm p-3 text-gray-700"
              required
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
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefone
            </label>
            <InputMask
              mask="(99) 99999-9999"
              value={formData.telefone}
              onChange={handleInputChange}
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  name="telefone"
                  type="tel"
                  className="w-full border border-gray-300 rounded-sm p-3 text-gray-700"
                  required
                />
              )}
            </InputMask>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CPF
            </label>
            <InputMask
              mask="999.999.999-99"
              value={formData.cpf}
              onChange={handleInputChange}
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  name="cpf"
                  type="text"
                  className="w-full border border-gray-300 rounded-sm p-3 text-gray-700"
                  required
                />
              )}
            </InputMask>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Perfil
            </label>
            <select
              name="perfil_usuario"
              value={formData.perfil_usuario}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-sm p-3 text-gray-700"
              required
            >
              <option value="">Selecione</option>
              <option value="ADMINISTRADOR">Administrador</option>
              <option value="FUNCIONARIO">Funcionário</option>
              <option value="MASTER">Master</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-sm p-3 text-gray-700"
              required
            >
              <option value="">Selecione</option>
              <option value="ATIVO">ATIVO</option>
              <option value="INATIVO">INATIVO</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Endereço</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CEP
              </label>
              <InputMask
                mask="99999-999"
                value={formData.cep}
                onChange={handleInputChange}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="text"
                    name="cep"
                    className="w-full border border-gray-300 rounded-sm p-3 text-gray-700"
                  />
                )}
              </InputMask>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={buscarEnderecoViaCep}
                className="h-[42px] px-4 bg-blue-600 text-white rounded-sm hover:bg-blue-700 mt-auto"
              >
                Buscar
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logradouro
            </label>
            <input
              type="text"
              name="logradouro"
              value={formData.logradouro}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-sm p-3 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número
            </label>
            <input
              type="text"
              name="numero"
              value={formData.numero}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-sm p-3 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bairro
            </label>
            <input
              type="text"
              name="bairro"
              value={formData.bairro}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-sm p-3 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cidade
            </label>
            <input
              type="text"
              name="cidade"
              value={formData.cidade}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-sm p-3 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <input
              type="text"
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-sm p-3 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              País
            </label>
            <input
              type="text"
              name="pais"
              value={formData.pais}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-sm p-3 text-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Complemento
            </label>
            <input
              type="text"
              name="complemento"
              value={formData.complemento}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-sm p-3 text-gray-700"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6">
        <button
          onClick={onCancelar}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-sm hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button
          onClick={() => onSalvar(formData)}
          className="px-4 py-2 bg-green-600 text-white rounded-sm hover:bg-green-700"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}
