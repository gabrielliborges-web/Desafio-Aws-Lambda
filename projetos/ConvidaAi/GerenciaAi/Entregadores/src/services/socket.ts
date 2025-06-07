// src/services/socket.ts
import { io } from "socket.io-client";

let userId: number | null = null;
let empreendimentoId: number | null = null;

if (typeof window !== "undefined") {
  const storedUser = localStorage.getItem("entregador:user_data");
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      userId = user?.id || null;
      empreendimentoId = user?.empreendimentoId || null;
    } catch (err) {
      console.error("Erro ao parsear entregador:user_data do localStorage", err);
    }
  }
}

let url = process.env.NEXT_PUBLIC_URL 
// let url = "http://localhost:3000"

export const socket = io(url, {
  transports: ["websocket"],
  auth: {
    userId,
    empreendimentoId,
  },
});
