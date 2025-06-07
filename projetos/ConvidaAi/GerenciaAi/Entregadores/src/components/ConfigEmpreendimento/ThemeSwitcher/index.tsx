import React, { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const ThemeEditor: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="p-6 w-full bg-white dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Personalize o tema do sistema
      </h2>
      <p className="text-md text-gray-600 dark:text-gray-400 mb-6">
        Escolha entre o tema claro ou escuro para personalizar sua experiência.
      </p>
      <div className="flex items-center justify-between">
        <div className="text-md text-gray-700 dark:text-gray-300">
          Tema atual:{" "}
          <span className="font-bold">
            {theme === "light" ? "Claro 🌞" : "Escuro 🌙"}
          </span>
        </div>
        <button
          onClick={toggleTheme}
          className="relative flex items-center w-16 h-8 bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition"
        >
          {/* Ícone do Sol (Tema Claro) */}
          {theme === "light" && (
            <SunIcon className="h-6 w-6 text-yellow-500 absolute left-1 transition" />
          )}
          {/* Ícone da Lua (Tema Escuro) */}
          {theme === "dark" && (
            <MoonIcon className="h-6 w-6 text-blue-400 absolute right-1 transition" />
          )}
          <span
            className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
              theme === "dark" ? "translate-x-8" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default ThemeEditor;
