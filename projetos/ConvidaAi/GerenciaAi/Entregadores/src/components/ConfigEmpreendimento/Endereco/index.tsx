"use client";

import { AuthContext } from "@/src/contexts/AuthContext";
import React, { useState, ChangeEvent, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import InputMask from "react-input-mask";
import { updateUserProfile } from "@/src/lib/empreendimento";
import { EmpreendimentoContext } from "@/src/contexts/EmpreendimentoContext ";

interface EnderecoForm {
  cep: string;
  logradouro: string;
  cidade: string;
  estado: string;
  pais: string;
  bairro: string;
  complemento: string;
  numero: string;
}

export default function EnderecoPessoal() {
  const { user } = useContext(AuthContext);

  let { empreendimento } = useContext(EmpreendimentoContext);

  const [formData, setFormData] = useState<EnderecoForm>({
    cep: "",
    logradouro: "",
    cidade: "",
    estado: "",
    pais: "Brasil",
    bairro: "Brasil",
    complemento: "Brasil",
    numero: "Brasil",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCepBlur = async () => {
    if (formData.cep.replace("-", "").length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${formData.cep.replace("-", "")}/json/`
        );
        const data = await response.json();

        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            logradouro: data.logradouro || "",
            cidade: data.localidade || "",
            estado: data.uf || "",
          }));
        } else {
          alert("CEP não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
        alert("Erro ao buscar o CEP. Tente novamente.");
      }
    } else {
      alert("Digite um CEP válido.");
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const userid = user?.id || 0;
      toast.success("Carregando...");

      const dataToSend = {
        ...formData,
        nome: empreendimento.nome,
        telefone: empreendimento.telefone,
        whatsapp_cliente: empreendimento.whatsapp_cliente,
        whatsapp_proprietario: empreendimento.whatsapp_proprietario,
        cnpj: empreendimento.cnpj,
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

  useEffect(() => {
    if (empreendimento) {
      setFormData({
        cep: empreendimento.cep || "",
        logradouro: empreendimento.logradouro || "",
        cidade: empreendimento.cidade || "",
        estado: empreendimento.estado || "",
        pais: empreendimento.pais || "Brasil",
        bairro: empreendimento.bairro || "",
        complemento: empreendimento.complemento || "",
        numero: empreendimento.numero || "",
      });
    }
  }, [empreendimento]);

  return (
    <div className="p-6 w-full bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Endereço</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CEP
          </label>
          <InputMask
            mask="99999-999"
            value={formData.cep}
            onChange={handleInputChange}
            onBlur={handleCepBlur}
          >
            {(inputProps) => (
              <input
                {...inputProps}
                type="text"
                name="cep"
                className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                placeholder="XXXXX-XXX"
              />
            )}
          </InputMask>
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
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu bairro"
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
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu complemento"
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
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu numero"
          />
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
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu logradouro"
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
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Digite sua cidade"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
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
            País
          </label>
          <input
            type="text"
            name="pais"
            value={formData.pais}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu país"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-3 rounded-sm font-bold hover:bg-blue-600"
        >
          Salvar Endereço
        </button>
      </div>
    </div>
  );
}
