import { createContext, useEffect, useContext } from "react";
import { io } from "socket.io-client";

// the context that provide the websocket
const SocketContext = createContext();

export function SocketProvider({ children }) {
    // connecting the websocket to the server
    let socket = io(import.meta.env.VITE_SERVER_URL, {
        transports: ["websocket"],
        withCredentials: true,
    });

    useEffect(() => {
        return () => {
            // after each refresh the socket will be initialized if it is not connected any more
            if (!socket.connected) {
                socket = io(import.meta.env.VITE_SERVER_URL, {
                    transports: ["websocket"],
                    withCredentials: true,
                });
            }
        };
    }, []);

    return (
        // provide the socket to the children components
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}
// a custom hook to use the socket
export function useSocket() {
    return useContext(SocketContext);
}
