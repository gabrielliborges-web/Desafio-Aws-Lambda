"use client";

import { updateUserProfile } from "@/src/lib/empreendimento";
import { EmpreendimentoProps } from "@/src/types/EmpreendimentoProps";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import InputMask from "react-input-mask";
import { AuthContext } from "@/src/contexts/AuthContext";
import { EmpreendimentoContext } from "@/src/contexts/EmpreendimentoContext ";

interface RedesSociaisForm {
  facebook: string;
  linkedin: string;
  instagram: string;
  whatsapp_cliente: string;
  whatsapp_proprietario: string;
}

export default function RedesSociais() {
  const { user } = useContext(AuthContext);
  let { empreendimento } = useContext(EmpreendimentoContext);

  const [formData, setFormData] = useState<EmpreendimentoProps | any>({
    whatsapp_cliente: "",
    whatsapp_proprietario: "",
    instagram: "",
    facebook: "",
  });

  const handleInputChange = (field: keyof RedesSociaisForm, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const userid = user?.id || 0;
      toast.success("Carregando...");

      const dataToSend = {
        ...formData,
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
      setFormData(empreendimento);
    }
  }, [empreendimento]);

  return (
    <div className="p-6 w-full bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Redes Sociais</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Facebook
          </label>
          <input
            type="text"
            value={formData.facebook}
            onChange={(e) => handleInputChange("facebook", e.target.value)}
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o Facebook"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instagram
          </label>
          <input
            type="text"
            value={formData.instagram}
            onChange={(e) => handleInputChange("instagram", e.target.value)}
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o Instagram"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            WhatsApp do Cliente
          </label>
          <InputMask
            mask="(99) 99999-9999"
            value={formData.whatsapp_cliente}
            onChange={(e) =>
              handleInputChange("whatsapp_cliente", e.target.value)
            }
          >
            {(inputProps) => (
              <input
                {...inputProps}
                type="tel"
                name="whatsapp_cliente"
                className="w-full border border-gray-300 rounded-sm p-3"
                placeholder="(00) 90000-0000"
              />
            )}
          </InputMask>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            WhatsApp do Proprietário
          </label>
          <InputMask
            mask="(99) 99999-9999"
            value={formData.whatsapp_proprietario}
            onChange={(e) =>
              handleInputChange("whatsapp_proprietario", e.target.value)
            }
          >
            {(inputProps) => (
              <input
                {...inputProps}
                type="tel"
                name="whatsapp_proprietario"
                className="w-full border border-gray-300 rounded-sm p-3"
                placeholder="(00) 90000-0000"
              />
            )}
          </InputMask>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-3 rounded-sm font-bold hover:bg-blue-600"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
