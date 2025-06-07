import { createContext, useEffect, useState } from "react";
import { parseCookies, destroyCookie, setCookie } from "nookies";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Usuario } from "../types/Usuarios";
import { getProfileUser, loginUser } from "../lib/users";

type AuthContextType = {
  isAuthenticated: boolean;
  user: Usuario | null;
  signIn: (body: {
    telefone?: string;
    email?: string;
    senha: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: any;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  let isAuthenticated = !!user;
  const router = useRouter();

  console.log(user)

  useEffect(() => {
    const { "nextauthEntregador.token": token, "nextauthEntregador.userId": userId } =
      parseCookies();

    if (!token) {
      router.replace("/Login");
      return;
    }

    const loadUserData = async () => {
      try {
        const resp = await getProfileUser(userId);
        const user = resp.entregador;
        debugger
        if (user?.nome) {
          localStorage.setItem("entregador:user_data", JSON.stringify(user));
          setUser(user);
          if (router.pathname === "/") {
            router.replace("/home");
          }
        } else {
          setUser(null);
          router.replace("/Login");
        }
      } catch (error) {
        toast.error("Sessão expirada, faça login novamente.");
        destroyCookie(undefined, "nextauthEntregador.token");
        router.replace("/Login");
      }
    };

    loadUserData();
  }, []);

  async function signIn(body: {
    telefone?: string;
    email?: string;
    senha: string;
  }) {
    try {
      const response = await loginUser(body);
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
      // Router.push("/home");
      return response;
    } catch (error: any) {
      return error;
    }
  }

  async function signOut() {
    destroyCookie(undefined, "nextauthEntregador.token", { path: "/" });
    destroyCookie(undefined, "nextauthEntregador.userId", { path: "/" });

    setUser(null);
    setTimeout(() => {
      router.push("/Login");
    }, 500);
  }
  return (
    <AuthContext.Provider
      value={{ setUser, user, isAuthenticated, signIn, signOut }}
    >
      {children}
      {router.pathname === "/Login" && children}
    </AuthContext.Provider>
  );
}
