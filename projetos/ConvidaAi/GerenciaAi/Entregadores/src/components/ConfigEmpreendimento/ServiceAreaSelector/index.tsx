"use client";

import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "@/src/contexts/AuthContext";
import { updateUserProfile } from "@/src/lib/empreendimento";
import "leaflet/dist/leaflet.css";
import { EmpreendimentoContext } from "@/src/contexts/EmpreendimentoContext ";

type FormData = {
  raio_atendido: string;
  endereco: {
    cep: string;
    numero: string;
    bairro: string;
    cidade: string;
    pais: string;
    complemento: string;
  };
};

type Coordenadas = {
  lat: number;
  lng: number;
};

const DEFAULT_COORDS: Coordenadas = {
  lat: -23.55052,
  lng: -46.633308,
};

const ServiceAreaSelector: React.FC = () => {
  const { user } = useContext(AuthContext);

  const { empreendimento } = useContext(EmpreendimentoContext);

  const [raio, setRaio] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRaio(parseFloat(e.target.value));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const userId = user?.id || 0;
      toast.success("Salvando...");

      let dados = {
        raio_atendido: Number(raio),
        complemento: empreendimento.complemento,
        numero: empreendimento.numero,
        nome: empreendimento.nome,
        telefone: empreendimento.telefone,
        whatsapp_cliente: empreendimento.whatsapp_cliente,
        whatsapp_proprietario: empreendimento.whatsapp_proprietario,
        cnpj: empreendimento.cnpj,
        cep: 42805585,
        logradouro: empreendimento.logradouro,
        cidade: empreendimento.cidade,
        estado: empreendimento.estado,
        pais: empreendimento.pais,
        bairro: empreendimento.bairro,
      };

      const response = await updateUserProfile(
        dados,
        userId,
        empreendimento?.id
      );

      if (response.status === 200) {
        toast.success(response.mensagem);
      } else {
        toast.error(response.mensagem);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.mensagem || "Erro ao atualizar.");
    }
  };

  useEffect(() => {
    if (empreendimento) {
      setRaio(empreendimento?.raio_atendido);
    }
  }, [empreendimento]);

  if (!empreendimento) return null;

  return (
    <div className="w-full p-4 space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">
        Configurar Área de Atendimento
      </h2>

      <div className="flex flex-col gap-2">
        <label htmlFor="raio" className="text-sm text-gray-600">
          Raio de atendimento <span className="text-xs">(em km)</span>
        </label>
        <input
          type="number"
          id="raio"
          name="raio"
          placeholder="Ex: 5.0"
          min="0"
          step="0.1"
          value={raio}
          onChange={handleChange}
          className="px-3 py-3 rounded-sm border border-gray-300 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-3 rounded-sm font-semibold hover:bg-blue-700"
      >
        Salvar Raio de Atendimento
      </button>
    </div>
  );
};

export default ServiceAreaSelector;
