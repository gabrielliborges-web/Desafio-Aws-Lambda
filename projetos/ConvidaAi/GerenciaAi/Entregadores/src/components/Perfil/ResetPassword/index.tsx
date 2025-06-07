"use client";

import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { AuthContext } from "@/src/contexts/AuthContext";
import {
  enviarCodigoValidacaoSenha,
  updateUserSenha,
  validarCodigoEnviado,
} from "@/src/lib/users";
import toast from "react-hot-toast";

function Input({
  type,
  placeholder,
  value,
  onChange,
  className,
  disabled,
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled: boolean;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={onChange}
      className={`w-full px-4 py-2 border rounded-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
    />
  );
}

function Button({
  children,
  onClick,
  disabled,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex justify-center items-center px-4 py-2 rounded-sm font-semibold transition shadow-md bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

export default function ResetPassword() {
  let { user } = useContext(AuthContext);

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [idUser, setidUser] = useState<number>(0);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const sendCode = async () => {
    setLoading(true);

    try {
      let response = await enviarCodigoValidacaoSenha({
        email: email ? email : undefined,
        diferenciacao: "reset",
      });

      if (response.status === 200) {
        toast.success(response.mensagem);

        setStep(2);
      } else {
        toast.success(response.mensagem);
      }

      setLoading(false);
    } catch (error: any) {
      toast.error("Código incorreto. Tente novamente.");
      setLoading(false);
      return setError("Código incorreto. Tente novamente.");
    }
  };

  const verifyCode = async () => {
    setLoading(true);

    try {
      const response = await validarCodigoEnviado(email, email, code);

      if (response.status === 200) {
        toast.success(response.mensagem);
        setidUser(response.usuario_id);
        setStep(3);
      } else {
        toast.error(response.mensagem);
      }
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    setLoading(true);

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
    if (!passwordRegex.test(confirmPassword)) {
      toast.error(
        "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial (@$!%*?&)."
      );
      setLoading(false);
      return;
    }
    if (confirmPassword !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      setLoading(false);
      return;
    }
    if (confirmPassword.length < 8) {
      toast.error("A senha deve ter pelo menos 8 caracteres.");
      setLoading(false);
      return;
    }

    try {
      const response = await updateUserSenha(confirmPassword, idUser);

      if (response.status === 200) {
        toast.success("Senha alterada com sucesso!");
        setLoading(false);
        setStep(4);
        setCode("");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setStep(1);
        }, 2000);
      } else {
        toast.error(response.mensagem);
      }
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
      toast.error("Ocorreu um erro ao atualizar a senha. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        Configuração de Senha
      </h2>

      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">
        {step === 1 &&
          "Para alterar a sua senha, solicite um código de validação."}
        {step === 2 && "Código de Verificação"}
        {step === 3 && "Crie uma nova senha"}
      </h2>
      <div>
        {step === 1 && (
          <>
            <Input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
              disabled={true}
            />
            <Button onClick={sendCode} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Enviar Código"}
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <Input
              disabled={false}
              type="text"
              placeholder="Digite o código aqui..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mb-4"
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <Button onClick={verifyCode} disabled={loading}>
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Validar Código"
              )}
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <Input
              disabled={false}
              type="password"
              placeholder="Nova senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
            />
            <Input
              disabled={false}
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mb-4"
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <Button onClick={resetPassword} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Alterar Senha"}
            </Button>
          </>
        )}

        {step === 4 && (
          <div className="text-start">
            <p className="text-green-500 font-semibold text-lg">
              Senha alterada com sucesso!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
