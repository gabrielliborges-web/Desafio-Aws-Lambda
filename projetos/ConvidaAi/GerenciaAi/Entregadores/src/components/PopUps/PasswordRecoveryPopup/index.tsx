import React from "react";

type PasswordRecoveryPopupProps = {
  userName: string;
  onClose: () => void;
  onChangePassword: () => void;
};

const PasswordRecoveryPopup: React.FC<PasswordRecoveryPopupProps> = ({
  userName,
  onClose,
  onChangePassword,
}) => {
  return (
    <div className="fixed bottom-4 right-4 bg-orange-100 border-l-4 border-orange-500 p-4 rounded-md shadow-md max-w-sm">
      <div className="flex items-center gap-3">
        <div className="flex-auto">
          <h2 className="text-md font-semibold text-orange-700">
            Olá, {userName}!
          </h2>
          <p className="text-sm text-gray-700 mt-1">
            Por segurança, recomendamos que altere a sua senha.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-2">
        <button
          onClick={onClose}
          className="text-sm text-gray-600 hover:text-gray-800 underline"
        >
          Fechar
        </button>
        <button
          onClick={onChangePassword}
          className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm transition"
        >
          Alterar Senha
        </button>
      </div>
    </div>
  );
};

export default PasswordRecoveryPopup;
