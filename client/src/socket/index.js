import io from "socket.io-client";
export const socket = io.connect(import.meta.env.VITE_BACKEND_URL);


