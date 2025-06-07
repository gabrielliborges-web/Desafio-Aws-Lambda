import React, { useState } from "react";
import Login from "./login";
import Cadastro from "./cadastro";

const LoginSignup: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-purple-600">
      {isLogin ? (
        <Login switchToSignup={() => setIsLogin(false)} />
      ) : (
        <Cadastro switchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default LoginSignup;
