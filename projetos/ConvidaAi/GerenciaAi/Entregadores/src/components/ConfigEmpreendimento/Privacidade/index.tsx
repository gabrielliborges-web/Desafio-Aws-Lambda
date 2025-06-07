import React, { useState } from "react";

const PrivacySettings: React.FC = () => {
  const [isProfilePrivate, setIsProfilePrivate] = useState(false);
  const [shareData, setShareData] = useState(true);
  const [activityNotifications, setActivityNotifications] = useState(true);
  const [showActivityHistory, setShowActivityHistory] = useState(false);
  const [acceptCookies, setAcceptCookies] = useState("accept");

  const handleSaveSettings = () => {
    // Simula o salvamento das configurações
    alert("Configurações de privacidade salvas!");
  };

  return (
    <div className="p-6 w-full bg-white dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Configurações de Privacidade
      </h2>

      {/* Visibilidade do Perfil */}
      <div className="mb-4">
        <label className="flex items-center justify-between text-md text-gray-700 dark:text-gray-300">
          <span>Perfil privado</span>
          <input
            type="checkbox"
            checked={isProfilePrivate}
            onChange={() => setIsProfilePrivate(!isProfilePrivate)}
            className="toggle-checkbox"
          />
        </label>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Seu perfil estará visível apenas para amigos se ativado.
        </p>
      </div>

      {/* Compartilhamento de Dados */}
      <div className="mb-4">
        <label className="flex items-center justify-between text-md text-gray-700 dark:text-gray-300">
          <span>Permitir compartilhamento de dados</span>
          <input
            type="checkbox"
            checked={shareData}
            onChange={() => setShareData(!shareData)}
            className="toggle-checkbox"
          />
        </label>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Controle se seus dados podem ser compartilhados com terceiros.
        </p>
      </div>

      {/* Notificações de Atividade */}
      <div className="mb-4">
        <label className="flex items-center justify-between text-md text-gray-700 dark:text-gray-300">
          <span>Notificações de atividade</span>
          <input
            type="checkbox"
            checked={activityNotifications}
            onChange={() => setActivityNotifications(!activityNotifications)}
            className="toggle-checkbox"
          />
        </label>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Receba notificações quando alguém interagir com seu perfil.
        </p>
      </div>

      {/* Histórico de Atividades */}
      <div className="mb-4">
        <label className="flex items-center justify-between text-md text-gray-700 dark:text-gray-300">
          <span>Exibir histórico de atividades</span>
          <input
            type="checkbox"
            checked={showActivityHistory}
            onChange={() => setShowActivityHistory(!showActivityHistory)}
            className="toggle-checkbox"
          />
        </label>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Mostre seu histórico de atividades para outros usuários.
        </p>
      </div>

      {/* Controle de Cookies */}
      <div className="mb-6">
        <label className="block text-md text-gray-700 dark:text-gray-300 mb-2">
          Controle de cookies
        </label>
        <select
          value={acceptCookies}
          onChange={(e) => setAcceptCookies(e.target.value)}
          className="w-full p-2 bg-white dark:bg-gray-700 border rounded-md text-md"
        >
          <option value="accept">Aceitar todos</option>
          <option value="reject">Rejeitar todos</option>
          <option value="customize">Personalizar</option>
        </select>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Escolha como deseja lidar com cookies no site.
        </p>
      </div>

      {/* Botão de Salvar */}
      <button
        onClick={handleSaveSettings}
        className="w-full rounded bg-blue-500 px-4 py-2 text-md text-white hover:bg-blue-600 transition"
      >
        Salvar Configurações
      </button>
    </div>
  );
};

export default PrivacySettings;
