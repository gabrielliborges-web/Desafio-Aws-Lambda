import { useState } from "react";
import {
  enviarCodigoValidacaoSenha,
  validarCodigoEnviado,
  updateUserSenha,
} from "../../../lib/users";
import toast from "react-hot-toast";

export default function ForgotPasswordModal({
  isOpen,
  onClose,
  credencial,
}: {
  isOpen: boolean;
  onClose: any;
  credencial: string;
}) {
  const [step, setStep] = useState(1);
  const [inputValue, setInputValue] = useState(credencial);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [idUser, setidUser] = useState<number>(0);

  const handleSendRequest = async () => {
    setIsLoading(true);
    setMessage("");

    const isEmail = inputValue.includes("@");
    const isPhone = /^\d+$/.test(inputValue) && inputValue.length === 11;

    if (!isEmail && !isPhone) {
      setMessage("Digite um e-mail ou telefone válido.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await enviarCodigoValidacaoSenha({
        email: isEmail ? inputValue : undefined,
        diferenciacao: "REDEFINICAO",
      });

      if (response.status === 200) {
        setMessage(
          "Se este e-mail ou telefone estiver cadastrado, um código de verificação será enviado."
        );
        setStep(2);
      } else {
        setMessage(response.data.mensagem);
      }
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      setMessage("Ocorreu um erro ao enviar o código. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const isEmail = inputValue.includes("@");
      const isPhone = /^\d+$/.test(inputValue) && inputValue.length === 11;

      if (!isEmail && !isPhone) {
        setIsLoading(false);

        return toast.error("E-mail ou telefone inválido.");
      }

      const response = await validarCodigoEnviado(
        isEmail ? inputValue : undefined,
        isPhone ? inputValue : undefined,
        verificationCode
      );

      if (response.status === 403) {
        setMessage(response.mensagem);
        return;
      }

      if (response.status === 200) {
        setMessage(response.mensagem);
        setidUser(response.usuario_id);
        setStep(3);
      } else {
        setMessage(response.mensagem);
      }
    } catch (error: any) {
      setMessage(`Erro: ${error?.response?.data?.mensagem}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    setIsLoading(true);
    setMessage("");

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      setMessage(
        "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial (@$!%*?&)."
      );
      setIsLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }
    if (newPassword.length < 8) {
      setMessage("A senha deve ter pelo menos 8 caracteres.");
      setIsLoading(false);
      return;
    }
    console.log(idUser);
    try {
      const response = await updateUserSenha(newPassword, idUser);

      if (response.status === 200) {
        setMessage("Senha alterada com sucesso! Redirecionando...");
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setMessage(response.mensagem);
      }
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
      setMessage("Ocorreu um erro ao atualizar a senha. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-purple-700 text-center">
          Redefinir Senha
        </h2>

        {message && (
          <p
            className={
              message === "Senha atualizada com sucesso." ||
              message ===
                "Se este e-mail ou telefone estiver cadastrado, um código de verificação será enviado."
                ? "text-center font-bold text-blue-600 mb-4"
                : message === "Código validado." ||
                  message === "Senha atualizada com sucesso."
                ? "text-center font-bold text-green-600 mb-4"
                : "text-center font-bold text-red-600 mb-4"
            }
          >
            {message}
          </p>
        )}

        {step === 1 && (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Digite seu e-mail ou telefone
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Seu e-mail ou telefone"
              className="block w-full border border-gray-300 p-3 rounded-md mb-4"
            />
            <button
              onClick={handleSendRequest}
              className="w-full py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar Código"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Digite o código recebido
            </label>
            <input
              type="text"
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Código de verificação"
              className="block w-full border border-gray-300 p-3 rounded-md mb-4"
            />
            <button
              onClick={handleVerifyCode}
              className="w-full py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? "Verificando..." : "Confirmar"}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nova Senha
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Digite sua nova senha"
              className="block w-full border border-gray-300 p-3 rounded-md mb-4"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirme a Nova Senha
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme sua nova senha"
              className="block w-full border border-gray-300 p-3 rounded-md mb-4"
            />

            <button
              onClick={handleUpdatePassword}
              className="w-full py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? "Atualizando..." : "Atualizar Senha"}
            </button>
          </>
        )}

        <button
          onClick={onClose}
          className="w-full mt-4 text-gray-600 hover:underline text-center"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
