import axios, { AxiosInstance } from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any): AxiosInstance {
  const { "nextauthEntregador.token": token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL ,
    // baseURL: "http://localhost:3000",
    timeout: 10000,
  });

  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error("Token inválido ou expirado.");
      } else if (error.response) {
        console.error(
          `Erro na API: ${error.response.status} - ${
            error.response.data.message || error.message
          }`
        );
      } else {
        console.error("Erro desconhecido:", error.message);
      }

      return Promise.reject(error);
    }
  );

  return api;
}
