import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

import { useRouter } from "next/router";
import ForgotPasswordModal from "./RedefinirSenha";

interface LoginProps {
  switchToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ switchToSignup }) => {
  const { signIn } = useContext(AuthContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    usuario: "",
    senha: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("usuario");
    const savedSenha = localStorage.getItem("senha");
    if (savedUser && savedSenha) {
      setFormData({ usuario: savedUser, senha: savedSenha });
      setRememberMe(true);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formData.usuario || !formData.senha) {
      toast.error("Por favor, preencha todos os campos.");
      setIsLoading(false);
      return;
    }

    const isEmail = formData.usuario.includes("@");

    const isPhone =
      /^\d+$/.test(formData.usuario) && formData.usuario.length === 11;

    if (!isEmail && !isPhone) {
      setIsLoading(false);

      return toast.error("E-mail ou telefone inválido.");
    }

    const payload = isEmail
      ? { email: formData.usuario, senha: formData.senha }
      : { telefone: formData.usuario, senha: formData.senha };

    try {
      if (rememberMe) {
        localStorage.setItem("usuario", formData.usuario);
        localStorage.setItem("senha", formData.senha);
      } else {
        localStorage.removeItem("usuario");
        localStorage.removeItem("senha");
      }

      let response: any = await signIn(payload);
      if (response.status === 200) {
        toast.success("Login realizado com sucesso!");
        router.push("/home");
      } else {
        toast.error(
          response?.response?.data?.mensagem || "Erro ao fazer login."
        );
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Erro ao realizar login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl p-10 bg-white shadow-lg rounded-sm">
      <h2 className="text-3xl font-bold mb-4 text-purple-700">Fazer Login</h2>

      <button
        onClick={switchToSignup}
        className="block text-purple-600 hover:underline mb-6 "
      >
        Criar Conta
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="usuario"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            E-mail ou Telefone
          </label>
          <input
            type="text"
            id="usuario"
            value={formData.usuario}
            onChange={handleInputChange}
            placeholder="Digite seu e-mail ou telefone"
            className="block w-full border border-gray-300 p-3 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="senha"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Senha
          </label>
          <input
            type="password"
            id="senha"
            value={formData.senha}
            onChange={handleInputChange}
            placeholder="Sua senha"
            className="block w-full border border-gray-300 p-3 rounded-md"
          />
        </div>

        <div className="flex justify-between items-center text-gray-600 text-sm">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            Lembrar de mim
          </label>
          <button
            type="button"
            className="hover:underline"
            onClick={() => setIsModalOpen(true)}
          >
            Redefinir Senha
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l-2.5-2.5L8 8V4a8 8 0 00-4 6z"
                ></path>
              </svg>
              Aguarde...
            </>
          ) : (
            "Fazer Login"
          )}
        </button>
      </form>

      <ForgotPasswordModal
        key={Math.random()}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        credencial={formData.usuario}
      />
    </div>
  );
};

export default Login;
