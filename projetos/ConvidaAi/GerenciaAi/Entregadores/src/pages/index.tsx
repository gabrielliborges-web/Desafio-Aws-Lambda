import React, { useState, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";

const LoginSignup: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/Login");
    }, 500);
  }, [router]);

  return <div className="flex flex-col md:flex-row h-screen w-full"></div>;
};

export default LoginSignup;
