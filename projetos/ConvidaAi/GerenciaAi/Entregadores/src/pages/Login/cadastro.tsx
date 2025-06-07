import React, { useState, useContext } from "react";

import InputMask from "react-input-mask";

import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import {
  createUser,
  enviarCodigoValidacao,
  validarCodigoEnviado,
} from "@/src/lib/users";
import { setCookie } from "nookies";

interface CadastroProps {
  switchToLogin: () => void;
}

const Cadastro: React.FC<CadastroProps> = ({ switchToLogin }) => {
  let { setUser } = useContext(AuthContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
    telefone: "",
    codigo_validacao: "",
  });

  const [step, setStep] = useState(1);
  const [steps, setSteps] = useState([
    { name: "Step 1", href: "#", status: "current" },
    { name: "Step 2", href: "#", status: "upcoming" },
    { name: "Step 3", href: "#", status: "upcoming" },
    { name: "Step 4", href: "#", status: "upcoming" },
  ]);

  const updateStep = (newStep: number) => {
    setStep(newStep);

    const updatedSteps = steps.map((s, index) => {
      if (index + 1 < newStep) {
        return { ...s, status: "complete" };
      } else if (index + 1 === newStep) {
        return { ...s, status: "current" };
      } else {
        return { ...s, status: "upcoming" };
      }
    });

    setSteps(updatedSteps);
  };

  const criarcontaUser = async (body: {
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    cpf: string;
    tela: "CONTATO_INICIAL";
  }) => {
    try {
      body.tela = "CONTATO_INICIAL";
      const response = await createUser(body);
      const { token, usuario } = response.data;

      setCookie(undefined, "nextauthEntregador.token", token, {
        maxAge: 60 * 60 * 24 * 15,
        path: "/",
      });

      setCookie(undefined, "nextauthEntregador.userId", usuario?.id, {
        maxAge: 60 * 60 * 24 * 15,
        path: "/",
      });

      setUser(usuario);

      return response;
    } catch (error: any) {
      return error;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleStepCodigo = async () => {
    try {
      if (
        !formData.nome ||
        !formData.email ||
        !formData.senha ||
        !formData.cpf ||
        !formData.telefone
      ) {
        toast.error("Preencha todos os campos obrigatórios.");
        return;
      }

      let response = await enviarCodigoValidacao({
        email: formData.email,
        nome: formData.nome,
        senha: formData.senha,
        telefone: formData.telefone ? formData.telefone.replace(/\D/g, "") : "",
        cpf: formData.cpf ? formData.cpf.replace(/\D/g, "") : "",
      });

      console.log(response);

      if (response.status !== 200) {
        return toast.error(response.mensagem);
      }
      updateStep(2);
    } catch (error: any) {
      console.log(error);
      return toast.error(error?.response?.data?.mensagem);
    }
  };

  const formatarDadosParaEnvio = (dados: any) => {
    return {
      ...dados,
      telefone: dados.telefone ? dados.telefone.replace(/\D/g, "") : "",
      cpf: dados.cpf ? dados.cpf.replace(/\D/g, "") : "",
      // cnpj: dados.cnpj ? dados.cnpj.replace(/\D/g, "") : "",
    };
  };

  const handleSubmit = async () => {
    try {
      const dadosFormatados = formatarDadosParaEnvio(formData);
      delete dadosFormatados.codigo_validacao;

      let response: any = await criarcontaUser(dadosFormatados);

      if (response.status === 201) {
        toast.success("Cadastro realizado com sucesso!");
        updateStep(4);

        setTimeout(() => {
          switchToLogin();
          router.push("/Login");
        }, 2000);
      } else {
        updateStep(1);
        toast.error(
          response?.response?.data?.erro || "Erro ao fazer cadastro."
        );
      }
    } catch (error) {
      toast.error("Erro ao realizar cadastro.");
      updateStep(1);
    }
  };

  const handleVerificarCodigo = async () => {
    try {
      let response = await validarCodigoEnviado(
        formData.email,
        formData.telefone,
        formData.codigo_validacao
      );

      // if (response.status === 403) {
      //   toast.error(response.mensagem);
      //   return;
      // }

      if (response.status === 200) {
        toast.success(response.mensagem);
        updateStep(3);
        await handleSubmit();
      } else {
        toast.error(response.mensagem);
      }
    } catch (error: any) {
      toast.error(`Erro: ${error?.response?.data?.mensagem}`);
    } finally {
    }
  };

  return (
    <div className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl p-10 bg-white shadow-lg rounded-sm">
      <h2 className="text-3xl font-bold mb-6 text-purple-600">Criar Conta</h2>

      <button
        onClick={switchToLogin}
        className="block text-purple-600 hover:underline mb-6"
      >
        Login
      </button>

      <nav
        aria-label="Progress"
        className="flex items-center justify-center my-4"
      >
        <p className="text-sm font-medium">
          Passo {steps.findIndex((step) => step.status === "current") + 1} de 4
        </p>
        <ol role="list" className="ml-8 flex items-center space-x-5">
          {steps.map((step) => (
            <li key={step.name}>
              {step.status === "complete" ? (
                <a
                  href={step.href}
                  className="block size-2.5 rounded-full bg-indigo-600 hover:bg-indigo-900"
                >
                  <span className="sr-only">{step.name}</span>
                </a>
              ) : step.status === "current" ? (
                <a
                  href={step.href}
                  aria-current="step"
                  className="relative flex items-center justify-center"
                >
                  <span
                    aria-hidden="true"
                    className="absolute flex size-5 p-px"
                  >
                    <span className="size-full rounded-full bg-indigo-200" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative block size-2.5 rounded-full bg-indigo-600"
                  />
                  <span className="sr-only">{step.name}</span>
                </a>
              ) : (
                <a
                  href={step.href}
                  className="block size-2.5 rounded-full bg-gray-200 hover:bg-gray-400"
                >
                  <span className="sr-only">{step.name}</span>
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <div className="space-y-4">
        {step === 1 && (
          <>
            <div>
              <label htmlFor="nome" className="block text-sm font-medium mb-1">
                Nome *
              </label>
              <input
                type="text"
                id="nome"
                placeholder="seu nome"
                value={formData.nome}
                onChange={handleInputChange}
                className="block w-full border border-gray-300 p-2 rounded-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                E-mail *
              </label>
              <input
                type="email"
                id="email"
                placeholder="seuemail@dominio.com"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full border border-gray-300 p-2 rounded-sm"
              />
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium mb-1">
                Senha *
              </label>
              <input
                type="password"
                id="senha"
                placeholder="sua senha"
                value={formData.senha}
                onChange={handleInputChange}
                className="block w-full border border-gray-300 p-2 rounded-sm"
              />
            </div>

            <div>
              <label
                htmlFor="telefone"
                className="block text-sm font-medium mb-1"
              >
                Telefone *
              </label>
              <InputMask
                mask="(99) 99999-9999"
                maskChar={null}
                id="telefone"
                value={formData.telefone}
                onChange={handleInputChange}
                required
                placeholder="(71) 98765-4321"
                className="block w-full border border-gray-300 p-2 rounded-sm"
              />
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

            <button
              type="button"
              onClick={handleStepCodigo}
              className="w-full py-2 bg-purple-600 text-white rounded-sm hover:bg-purple-700 transition"
            >
              Continuar
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <p className="text-sm text-gray-600 my-3">
                Enviamos um código de verificação para{" "}
                <span className="font-medium text-red-500">
                  {formData.email}
                </span>
                . Por favor, insira-o abaixo para continuar.
              </p>

              <label
                htmlFor="codigo_validacao"
                className="block text-sm font-medium mb-1"
              >
                Código de verificação:
              </label>
              <input
                type="text"
                maxLength={6}
                id="codigo_validacao"
                placeholder="_ _ _ _ _ _"
                value={formData.codigo_validacao}
                onChange={handleInputChange}
                className="block w-full border border-gray-300 p-2 rounded-sm"
              />
            </div>

            <button
              type="button"
              onClick={handleVerificarCodigo}
              className="w-full py-2 bg-purple-600 text-white rounded-sm hover:bg-purple-700 transition"
            >
              Confirmar Código
            </button>
            <button
              type="button"
              onClick={() => updateStep(1)}
              className="w-full py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition"
            >
              Voltar
            </button>
          </>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center gap-4 animate-fade-in">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-lg font-medium text-gray-700 text-center">
              Aguarde, estamos criando sua conta...
            </p>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center gap-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-xl font-semibold text-green-600 text-center">
              Tudo certo! Sua conta foi criada com sucesso.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cadastro;
