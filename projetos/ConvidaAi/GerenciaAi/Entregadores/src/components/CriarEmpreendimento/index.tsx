import { AuthContext } from "@/src/contexts/AuthContext";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import imgNotFound from "../../../assets/SemFoto.png";
import { removeImagePerfil, updateUserProfile } from "@/src/lib/users";
import toast from "react-hot-toast";
import { EmpreendimentoProps } from "@/src/types/EmpreendimentoProps";
import Stepper, { Step } from "../Stepper";
import { NumericFormat } from "react-number-format";
import Image from "next/image";

export default function CriarEmpreendimento() {
  let { user } = useContext(AuthContext);

  const [formData, setFormData] = useState<EmpreendimentoProps>({
    id: 0,
    natureza_juridica: "MEI",
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

    pedido_minimo: 0,
    qtd_funcionarios: 0,

    instagram: "",
    facebook: "",

    criado_em: new Date().toISOString(),
    criado_por: { Nome: "Gabrielli" },
    atualizado_em: "",
    atualizado_por: undefined,

    Status: "ATIVO",
  });
  const [step, setStep] = useState<number>(1);
  const steps: Step[] = [
    {
      name: "Identificação",
      href: "#",
      status: step >= 1 ? "complete" : "upcoming",
    },
    {
      name: "Contato",
      href: "#",
      status: step === 2 ? "current" : step > 2 ? "complete" : "upcoming",
    },
    {
      name: "Endereço",
      href: "#",
      status: step === 3 ? "current" : step > 3 ? "complete" : "upcoming",
    },
    { name: "Negócio", href: "#", status: step === 4 ? "current" : "upcoming" },
  ];

  const buscarEnderecoPorCep = async (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, ""); // remove tudo que não for número

    if (cepLimpo.length !== 8) {
      toast.error("CEP inválido. Deve conter 8 dígitos.");
      return;
    }

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );
      const data = await response.json();

      if (data.erro) {
        toast.error("CEP não encontrado.");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        logradouro: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf,
        complemento: data.complemento,
        pais: "Brasil",
      }));
    } catch (error) {
      toast.error("Erro ao buscar o endereço. Tente novamente.");
      console.error(error);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateEmpreendimento = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      const empreendimentoId = formData.id;

      // Limpeza dos dados
      const cleanTelefone = formData.telefone
        ?.replaceAll(" ", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll("-", "");

      const cleanWhatsappCliente = formData.whatsapp_cliente
        ?.replaceAll(" ", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll("-", "");

      const cleanWhatsappProprietario = formData.whatsapp_proprietario
        ?.replaceAll(" ", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll("-", "");

      const cleanCnpj = formData.cnpj
        ?.replaceAll(".", "")
        .replaceAll("/", "")
        .replaceAll("-", "");

      // Montar payload
      const payload = {
        ...formData,
        telefone: cleanTelefone,
        whatsapp_cliente: cleanWhatsappCliente,
        whatsapp_proprietario: cleanWhatsappProprietario,
        cnpj: cleanCnpj,
        atualizado_em: new Date().toISOString(),
        criado_em: new Date().toISOString(),
        atualizado_por: user?.id,
      };

      const response = await updateUserProfile(payload, empreendimentoId);

      if (response.status === 200) {
        toast.success(response.mensagem || "Empreendimento atualizado!");
      } else {
        toast.error(response.mensagem || "Erro ao atualizar.");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.mensagem || "Erro inesperado.");
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

  const handleNext = () => {
    let valid = true;

    if (step === 1) {
      const requiredFields: (keyof EmpreendimentoProps)[] = [
        "nome",
        "email",
        "telefone",
      ];

      requiredFields.forEach((field) => {
        if (!formData[field] || formData[field].toString().trim() === "") {
          valid = false;
        }
      });
    }

    if (step === 2) {
      const requiredFields: (keyof EmpreendimentoProps)[] = [
        "whatsapp_cliente",
        "whatsapp_proprietario",
      ];

      requiredFields.forEach((field) => {
        if (!formData[field] || formData[field].toString().trim() === "") {
          valid = false;
        }
      });
    }

    if (step === 3) {
      const requiredFields: (keyof EmpreendimentoProps)[] = [
        "cep",
        "logradouro",
        "numero",
        "bairro",
        "cidade",
        "estado",
        "pais",
      ];

      requiredFields.forEach((field) => {
        if (!formData[field] || formData[field].toString().trim() === "") {
          valid = false;
        }
      });
    }

    if (step === 4) {
      if (!formData.pedido_minimo || !formData.qtd_funcionarios) {
        valid = false;
      }
    }

    if (!valid) {
      return toast.error(
        "Preencha todos os campos obrigatórios antes de continuar."
      );
    }

    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  return (
    <div className="p-8 w-full bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        Criar Empreendimento
      </h2>

      <div className="p-6 w-full bg-white">
        <Stepper steps={steps} currentStep={step} />

        {/* STEP 1 - Identificação */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="relative w-32 h-32 my-5">
              <Image
                src={
                  formData.imagem_perfil
                    ? typeof formData.imagem_perfil === "string"
                      ? formData.imagem_perfil
                      : URL.createObjectURL(formData.imagem_perfil)
                    : imgNotFound.src
                }
                alt="Imagem de Perfil"
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
                  setFormData((prev: any) => ({
                    ...prev,
                    imagem_perfil: file,
                  }));
                }}
                className="hidden"
              />
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
                <option value="PESSOA_FISICA">Pessoa Física</option>
                <option value="PESSOA_JURIDICA">Pessoa Jurídica</option>
              </select>
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
                className="w-full border border-gray-300 rounded-sm p-3"
                placeholder="Nome do empreendimento"
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
                className="w-full border border-gray-300 rounded-sm p-3"
                placeholder="contato@email.com"
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
                    type="tel"
                    name="telefone"
                    className="w-full border border-gray-300 rounded-sm p-3"
                    placeholder="(00) 90000-0000"
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
                value={formData.cnpj}
                onChange={handleInputChange}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="text"
                    name="cnpj"
                    className="w-full border border-gray-300 rounded-sm p-3"
                    placeholder="00.000.000/0000-00"
                  />
                )}
              </InputMask>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                rows={4}
                className="w-full border border-gray-300 rounded-sm p-3"
                placeholder="Fale sobre o empreendimento"
              ></textarea>
            </div>
          </div>
        )}

        {/* STEP 2 - Contato */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp do Cliente
              </label>
              <InputMask
                mask="(99) 99999-9999"
                value={formData.whatsapp_cliente}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram
              </label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-sm p-3"
                placeholder="@exemplo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Facebook
              </label>
              <input
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-sm p-3"
                placeholder="facebook.com/exemplo"
              />
            </div>
          </div>
        )}

        {/* STEP 3 - Endereço */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleInputChange}
                onBlur={() => buscarEnderecoPorCep(formData.cep)}
                className="border border-gray-300 rounded-sm p-3"
                placeholder="CEP"
              />

              <input
                type="text"
                name="logradouro"
                value={formData.logradouro}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-sm p-3"
                placeholder="Logradouro"
              />
              <input
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-sm p-3"
                placeholder="Número"
              />
              <input
                type="text"
                name="complemento"
                value={formData.complemento}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-sm p-3"
                placeholder="Complemento"
              />
              <input
                type="text"
                name="bairro"
                value={formData.bairro}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-sm p-3"
                placeholder="Bairro"
              />
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-sm p-3"
                placeholder="Cidade"
              />
              <input
                type="text"
                name="estado"
                value={formData.estado}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-sm p-3"
                placeholder="Estado"
              />
              <input
                type="text"
                name="pais"
                value={formData.pais}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-sm p-3"
                placeholder="País"
              />
            </div>
          </div>
        )}

        {/* STEP 4 - Dados do Negócio */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pedido Mínimo (R$)
              </label>
              <NumericFormat
                name="pedido_minimo"
                value={formData.pedido_minimo}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                fixedDecimalScale
                allowNegative={false}
                className="w-full border border-gray-300 rounded-sm p-3"
                placeholder="Ex: R$ 50,00"
                onValueChange={(values) => {
                  const { floatValue } = values;
                  setFormData((prev) => ({
                    ...prev,
                    pedido_minimo: floatValue ?? 0,
                  }));
                }}
              />
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
                className="w-full border border-gray-300 rounded-sm p-3"
                placeholder="Ex: 10"
              />
            </div>
          </div>
        )}

        {/* Botões de navegação */}
        <div className="mt-6 flex justify-end">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-200 rounded-sm hover:bg-gray-300 mr-3"
            >
              Voltar
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600"
            >
              Próximo
            </button>
          ) : (
            <button
              onClick={(e) => handleUpdateEmpreendimento(e)}
              className="px-4 py-2 bg-green-600 text-white rounded-sm hover:bg-green-700"
            >
              Salvar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
