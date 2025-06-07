import { createContext, ReactNode, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { getProfileEmpreendimento } from "../lib/empreendimento";
import { setCookie } from "nookies";

interface EmpreendimentoProviderProps {
  children: ReactNode;
}

interface EmpreendimentoContextProps {
  empreendimento: any | undefined;
  setEmpreendimento: (e: any) => void;
}

export const EmpreendimentoContext = createContext<EmpreendimentoContextProps>(
  {} as EmpreendimentoContextProps
);

export function EmpreendimentoContextProvider({
  children,
}: EmpreendimentoProviderProps) {
  const [empreendimento, setEmpreendimento] = useState<any | undefined>(
    undefined
  );

  const router = useRouter();

  useEffect(() => {
    const onInit = async () => {
      try {
        const [empreendimentoResult] = await Promise.allSettled([
          getProfileEmpreendimento(empreendimento?.id || 6),
        ]);

        if (
          empreendimentoResult.status === "fulfilled" &&
          empreendimentoResult.value?.empreendimento?.nome
        ) {
          const empreendimentoInfos = empreendimentoResult.value;

          setEmpreendimento(empreendimentoInfos.empreendimento);
          setCookie(
            null,
            "comnecta.empreendimentoId",
            empreendimentoInfos.empreendimento.id.toString(),
            {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
            }
          );
        } else {
          setEmpreendimento(undefined);
        }
      } catch (error) {
        console.error("Erro inesperado ao inicializar:", error);
        setEmpreendimento(undefined);
      }
    };

    onInit();
  }, []);

  return (
    <EmpreendimentoContext.Provider
      value={{
        setEmpreendimento,
        empreendimento,
      }}
    >
      {children}
    </EmpreendimentoContext.Provider>
  );
}
