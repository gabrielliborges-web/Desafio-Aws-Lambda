"use client";

import React, { useState } from "react";

interface RedesSociaisForm {
  facebook_pessoal: string;
  facebook_profissional: string[];
  linkedin_pessoal: string;
  linkedin_profissional: string[];
  instagram_pessoal: string;
  instagram_profissional: string[];
}

// Tipagem para campos de arrays de strings
type SocialArrayFields = Exclude<
  keyof RedesSociaisForm,
  "facebook_pessoal" | "linkedin_pessoal" | "instagram_pessoal"
>;

export default function RedesSociais() {
  const [formData, setFormData] = useState<RedesSociaisForm>({
    facebook_pessoal: "",
    facebook_profissional: [],
    linkedin_pessoal: "",
    linkedin_profissional: [],
    instagram_pessoal: "",
    instagram_profissional: [],
  });

  // Estados individuais para entradas de tags
  const [newFacebookProfissional, setNewFacebookProfissional] = useState("");
  const [newLinkedinProfissional, setNewLinkedinProfissional] = useState("");
  const [newInstagramProfissional, setNewInstagramProfissional] = useState("");

  const handleInputChange = (field: keyof RedesSociaisForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTag = (field: SocialArrayFields, value: string) => {
    if (value.trim() && !formData[field].includes(value)) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }));
    }
  };

  const handleRemoveTag = (field: SocialArrayFields, tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((tag) => tag !== tagToRemove),
    }));
  };

  return (
    <div className="p-6 w-full bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Redes Sociais</h2>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Facebook Pessoal
          </label>
          <input
            type="text"
            value={formData.facebook_pessoal}
            onChange={(e) =>
              handleInputChange("facebook_pessoal", e.target.value)
            }
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o Facebook pessoal"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn Pessoal
          </label>
          <input
            type="text"
            value={formData.linkedin_pessoal}
            onChange={(e) =>
              handleInputChange("linkedin_pessoal", e.target.value)
            }
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o LinkedIn pessoal"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instagram Pessoal
          </label>
          <input
            type="text"
            value={formData.instagram_pessoal}
            onChange={(e) =>
              handleInputChange("instagram_pessoal", e.target.value)
            }
            className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o Instagram pessoal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Facebook Profissional
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={newFacebookProfissional}
              onChange={(e) => setNewFacebookProfissional(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag(
                    "facebook_profissional",
                    newFacebookProfissional
                  );
                  setNewFacebookProfissional("");
                }
              }}
              className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
              placeholder="Adicione um Facebook profissional"
            />
            <button
              type="button"
              onClick={() => {
                handleAddTag("facebook_profissional", newFacebookProfissional);
                setNewFacebookProfissional("");
              }}
              className="bg-blue-500 text-white px-3 py-2 rounded-sm hover:bg-blue-600"
            >
              Adicionar
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.facebook_profissional.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-100 px-3 py-1 rounded-md text-blue-700 font-medium"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag("facebook_profissional", tag)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn Profissional
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={newLinkedinProfissional}
              onChange={(e) => setNewLinkedinProfissional(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag(
                    "linkedin_profissional",
                    newLinkedinProfissional
                  );
                  setNewLinkedinProfissional("");
                }
              }}
              className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
              placeholder="Adicione um LinkedIn profissional"
            />
            <button
              type="button"
              onClick={() => {
                handleAddTag("linkedin_profissional", newLinkedinProfissional);
                setNewLinkedinProfissional("");
              }}
              className="bg-blue-500 text-white px-3 py-2 rounded-sm hover:bg-blue-600"
            >
              Adicionar
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.linkedin_profissional.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-100 px-3 py-1 rounded-md text-blue-700 font-medium"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag("linkedin_profissional", tag)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instagram Profissional
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={newInstagramProfissional}
              onChange={(e) => setNewInstagramProfissional(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag(
                    "instagram_profissional",
                    newInstagramProfissional
                  );
                  setNewInstagramProfissional("");
                }
              }}
              className="w-full border border-gray-300 rounded-sm p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
              placeholder="Adicione um Instagram profissional"
            />
            <button
              type="button"
              onClick={() => {
                handleAddTag(
                  "instagram_profissional",
                  newInstagramProfissional
                );
                setNewInstagramProfissional("");
              }}
              className="bg-blue-500 text-white px-3 py-2 rounded-sm hover:bg-blue-600"
            >
              Adicionar
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.instagram_profissional.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-100 px-3 py-1 rounded-md text-blue-700 font-medium"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag("instagram_profissional", tag)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-sm font-bold hover:bg-blue-600"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
