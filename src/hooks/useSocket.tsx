import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BASE_STATIC_FILE);

export const useSocket = (userId: string | null, classId: string | null, onNotification: (data: any) => void) => {
  useEffect(() => {
    socket.emit("join_room", { userId, classId });

    socket.on("receive_notification", (data) => {
      onNotification(data);
    });

    return () => {
      socket.off("receive_notification"); 
    };
  }, [userId, classId]);
};
