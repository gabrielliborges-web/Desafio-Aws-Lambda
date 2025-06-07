"use client";

import { AuthContext } from "@/src/contexts/AuthContext";
import { getProfileUser, updateUserProfile } from "@/src/lib/users";
import React, { useState, ChangeEvent, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import InputMask from "react-input-mask";

interface EnderecoForm {
  logradouro: string;
  complemento: string;
  cep: string;
  cidade: string;
  numero: string;
  estado: string;
  pais: string;
  bairro: string;
}

export default function EnderecoPessoal() {
  const { user, setUser } = useContext(AuthContext);

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
  });

  const sanitize = (value: any) => {
    return value === null || value === "null" ? "" : value;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleCepBlur = async () => {
    if (formData.cep === "_____-___" || !formData.cep) {
      return toast.error("Digite um CEP válido");
    }
    let cepFormatado = formData.cep.replaceAll("_", "").replace("-", "");
    if (cepFormatado.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${formData.cep.replace("-", "")}/json/`
        );
        const data = await response.json();

        if (!data.erro) {
          setFormData((prev: any) => ({
            ...prev,
            logradouro: data.logradouro || "",
            cidade: data.localidade || "",
            estado: data.uf || "",
            bairro: data.bairro || "",
            pais: data.pais || "Brasil",
          }));
          toast.success("CEP encontrado com sucesso.");
        } else {
          toast.error("CEP não encontrado.");
        }
      } catch (error) {
        return toast.error("Erro ao buscar o CEP. Tente novamente.");
      }
    } else {
      return toast.error("Digite um CEP válido");
    }
  };

  const handleUpdateInfo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const userid = user?.id || 0;
      toast.success("Carregando...");

      delete formData.atualizado_em;
      delete formData.criado_em;

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
      };

      const response = await updateUserProfile(dataToSend, userid);

      if (response.status === 200) {
        toast.success(response.mensagem);
        debugger
        const resp = await getProfileUser(response.usuario.id);
        let user = resp.usuario;
        if (user.nome) {
          // user .perfil_usuario = "FUNCIONARIO";
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

  useEffect(() => {
    if (user) {
      setFormData({
        nome: sanitize(user?.nome),
        email: sanitize(user?.email),
        imagem_perfil: sanitize(user?.imagem_perfil),
        telefone: sanitize(user?.telefone),
        cpf: sanitize(user?.cpf),
        status: sanitize(user?.status),
        perfil_usuario: sanitize(user?.perfil_usuario),
        criado_em: sanitize(user?.criado_em),
        atualizado_em: sanitize(user?.atualizado_em),
        logradouro: sanitize(user?.logradouro),
        complemento: sanitize(user?.complemento),
        cep: sanitize(user?.cep),
        numero: sanitize(user?.numero),
        cidade: sanitize(user?.cidade),
        estado: sanitize(user?.estado),
        pais: sanitize(user?.pais),
        bairro: sanitize(user?.bairro),
      });
    }
  }, [user]);

  return (
    <div className="p-6 w-full bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Endereço</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CEP *
          </label>
          <div className="flex items-center gap-2">
            <InputMask
              mask="99999-999"
              value={formData.cep}
              onChange={handleInputChange}
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  type="text"
                  required
                  name="cep"
                  className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                  placeholder="XXXXX-XXX"
                />
              )}
            </InputMask>

            <button
              type="button"
              onClick={handleCepBlur}
              className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-sm flex items-center justify-center"
              title="Buscar CEP"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 3.5a7.5 7.5 0 0013.65 13.65z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Logradouro *
          </label>
          <input
            type="text"
            required
            name="logradouro"
            value={formData.logradouro}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu logradouro"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Complemento
          </label>
          <input
            type="text"
            required
            name="complemento"
            value={formData.complemento}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu complemento"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Numero *{" "}
          </label>
          <input
            type="text"
            required
            name="numero"
            value={formData.numero}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu numero"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cidade *{" "}
          </label>
          <input
            type="text"
            required
            name="cidade"
            value={formData.cidade}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Digite sua cidade"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bairro *{" "}
          </label>
          <input
            type="text"
            required
            name="bairro"
            value={formData.bairro}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Digite sua bairro"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado *{" "}
          </label>
          <select
            required
            name="estado"
            value={formData.estado}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 bg-white"
          >
            <option value="">Selecione</option>
            {[
              "AC",
              "AL",
              "AP",
              "AM",
              "BA",
              "CE",
              "DF",
              "ES",
              "GO",
              "MA",
              "MT",
              "MS",
              "MG",
              "PA",
              "PB",
              "PR",
              "PE",
              "PI",
              "RJ",
              "RN",
              "RS",
              "RO",
              "RR",
              "SC",
              "SP",
              "SE",
              "TO",
            ].map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            País *{" "}
          </label>
          <input
            type="text"
            required
            name="pais"
            value={formData.pais}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu país"
          />
        </div>

        <button
          onClick={handleUpdateInfo}
          className="w-full bg-blue-500 text-white py-3 rounded-sm font-bold hover:bg-blue-600"
        >
          Salvar Endereço
        </button>
      </div>
    </div>
  );
}
