import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApplicationLayout } from "../components/application-layout";
import { AuthProvider, AuthContext } from "../contexts/AuthContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { SliderProvider } from "../contexts/SliderContext";
import { EmpreendimentoContextProvider } from "../contexts/EmpreendimentoContext ";
import LoadingPage from "../components/LoagindPage";

const DONE_DURATION = 2000;

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AuthProvider>
      <EmpreendimentoContextProvider>
        <AppContent
          Component={Component}
          pageProps={pageProps}
          router={router}
        />
      </EmpreendimentoContextProvider>
    </AuthProvider>
  );
}

function AppContent({ Component, pageProps, router }: AppProps) {
  const clientRouter = useRouter();
  const [timeoutId, setTimeoutId] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleRouteChangeStart = useCallback(() => {
    setLoading(false);
  }, []);

  const handleRouteChangeComplete = useCallback(() => {
    setLoading(true);
    setTimeoutId(
      setTimeout(() => {
        setTimeoutId(null);
        setLoading(false);
      }, DONE_DURATION)
    );
  }, []);

  useEffect(() => {
    clientRouter.events.on("routeChangeStart", handleRouteChangeStart);
    clientRouter.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      clientRouter.events.off("routeChangeStart", handleRouteChangeStart);
      clientRouter.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [handleRouteChangeComplete, handleRouteChangeStart, clientRouter.events]);

  useEffect(
    () => () => {
      if (timeoutId) clearTimeout(timeoutId);
    },
    [timeoutId]
  );

  return (
    <>
      {clientRouter.pathname !== "/Login" &&
      clientRouter.pathname !== "/" &&
      clientRouter.pathname !== "/_error" ? (
        <>
          {loading ? (
            <LoadingPage />
          ) : (
            <SliderProvider>
              <ApplicationLayout>
                <Component {...pageProps} />
                <Toaster position="top-right" reverseOrder={false} />
              </ApplicationLayout>
            </SliderProvider>
          )}
        </>
      ) : (
        <>
          <Component {...pageProps} />
          <Toaster position="top-right" reverseOrder={false} />
        </>
      )}
    </>
  );
}
