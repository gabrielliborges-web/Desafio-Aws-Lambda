"use client";

import { useState } from "react";
import axios from "axios";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

interface CepsDisponiveisProps {
  initialCeps?: string[];
}

const CepsDisponiveis: React.FC<CepsDisponiveisProps> = ({
  initialCeps = [],
}) => {
  const [ceps, setCeps] = useState<string[]>(initialCeps);
  const [newCep, setNewCep] = useState("");
  const [cepInfo, setCepInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedCep, setEditedCep] = useState("");

  const handleFetchCep = async () => {
    if (newCep.length !== 8 || isNaN(Number(newCep))) {
      alert("Digite um CEP válido com 8 números.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${newCep}/json/`
      );
      if (response.data && !response.data.erro) {
        setCepInfo(response.data);
        setShowModal(true);
      } else {
        alert("CEP não encontrado. Verifique e tente novamente.");
      }
    } catch (error) {
      alert("Erro ao buscar o CEP.");
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCep = () => {
    if (!cepInfo) return;

    if (ceps.includes(newCep)) {
      alert("Este CEP já está na lista.");
      return;
    }

    setCeps([...ceps, newCep]);
    setNewCep("");
    setCepInfo(null);
    setShowModal(false);
  };

  const handleEditCep = (index: number) => {
    setEditingIndex(index);
    setEditedCep(ceps[index]);
  };

  const handleSaveEditCep = (index: number) => {
    if (editedCep.length !== 8 || isNaN(Number(editedCep))) {
      alert("Digite um CEP válido com 8 números.");
      return;
    }

    const updatedCeps = [...ceps];
    updatedCeps[index] = editedCep;
    setCeps(updatedCeps);
    setEditingIndex(null);
  };

  return (
    <div className="p-6 w-full bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 flex items-center gap-2">
        <PlusIcon className="w-6 h-6 text-green-500" />
        CEPs Atendidos Fora do Raio
      </h2>

      <form className="space-y-4">
        {/* Input para adicionar novo CEP */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Adicionar CEP
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newCep}
              onChange={(e) => setNewCep(e.target.value)}
              className="border border-gray-300 p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 flex-1"
              placeholder="Digite um CEP (ex: 01001000)"
              maxLength={8}
            />
            <button
              type="button"
              onClick={handleFetchCep}
              className={`px-4 py-2 flex items-center gap-2 text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Buscando..." : "Buscar"}
            </button>
          </div>
        </div>
      </form>

      {/* Lista de CEPs */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          CEPs Cadastrados
        </h3>
        {ceps.length > 0 ? (
          <ul className="bg-gray-100 p-4 space-y-2 rounded-sm">
            {ceps.map((cep, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 border-b border-gray-300 bg-white shadow-sm"
              >
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editedCep}
                    onChange={(e) => setEditedCep(e.target.value)}
                    className="border border-gray-300 p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 flex-1"
                  />
                ) : (
                  <span className="text-gray-700 font-medium">{cep}</span>
                )}

                <div className="flex gap-2">
                  {editingIndex === index ? (
                    <button
                      onClick={() => handleSaveEditCep(index)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <CheckCircleIcon className="m-1 w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditCep(index)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <PencilIcon className="m-1 w-5 h-5" />
                    </button>
                  )}

                  <button
                    onClick={() => setCeps(ceps.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="m-1 w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm mt-2">
            Nenhum CEP adicionado ainda.
          </p>
        )}
      </div>

      {/* Modal de confirmação */}
      {showModal && cepInfo && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 shadow-md w-96 rounded-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
              Confirme o endereço
            </h3>
            <div className="text-gray-700 space-y-2">
              <p>
                <strong>CEP:</strong> {cepInfo.cep}
              </p>
              <p>
                <strong>Logradouro:</strong>{" "}
                {cepInfo.logradouro || "Não disponível"}
              </p>
              <p>
                <strong>Bairro:</strong> {cepInfo.bairro || "Não disponível"}
              </p>
              <p>
                <strong>Cidade:</strong> {cepInfo.localidade} - {cepInfo.uf}
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 flex items-center gap-2"
              >
                <XCircleIcon className="w-4 h-4" />
                Cancelar
              </button>
              <button
                onClick={handleAddCep}
                className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2"
              >
                <CheckCircleIcon className="w-4 h-4" />
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CepsDisponiveis;
