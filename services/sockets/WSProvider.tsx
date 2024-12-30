import { createContext, useContext, useEffect, useRef, useState } from "react";
import { SOCKET_URL } from "../config";
import { tokenStorage } from "../storage";
import { io,Socket } from "socket.io-client";
import { refresh_tokens } from "../api/apiIntercepters";

interface WSService {
    intializeSocket: () => void;
    emit: (event: string, data?: any) => void;
    on: (event: string, cb: (data: any) => void) => void;
    off: (event: string) => void;
    removeListener: (listenerName: string) => void;
    updateAccessToken: () => void
}
const WSContext = createContext<WSService | undefined>(undefined)

export const WSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socketAccessToken, setSocketAccessToken] = useState<string>()
    const [changedToken, setChangedToken] = useState(false)
    const socket = useRef<Socket>()

    useEffect(() => {
        const token = tokenStorage.getString('accessToken') as any
        setSocketAccessToken(token)
    }, [changedToken])

    useEffect(() => {
        socket.current = io(SOCKET_URL, {
            transports: ['websocket'],
            withCredentials: true,
            extraHeaders: {
                access_token: socketAccessToken || ''
            }
        })

        if (socketAccessToken) {
            socket.current.on('connect_error', (error: any) => {
                if (error.message === 'Authentication error') {
                    console.log("Auth Connenctions Error on Socket")
                    refresh_tokens()
                }
            })
        }
        return () => {socket.current?.disconnect()}
    }, [socketAccessToken])

    const socketService:WSService={
        intializeSocket: () => {
            // Initialize socket
        },
        emit: (event: string, data?: any) => {
            if (socket.current) socket.current.emit(event, data)
        },
        on: (event: string, cb: (data: any) => void) => {
            if (socket.current) socket.current.on(event, cb)
        },
        off: (event: string) => {
            if (socket.current) socket.current.off(event)
        },
        removeListener: (listenerName: string) => {
            if (socket.current) socket.current.removeListener(listenerName)
        },
        updateAccessToken: () => {
            setChangedToken(!changedToken)
        }
    }
    return (
        <WSContext.Provider value={socketService}>
            {children}
        </WSContext.Provider>
    )
}

export const useWS = ( ): WSService=>{
    const socketService=useContext(WSContext)
    if (!socketService) {
    throw new Error("useWS must be used within a wsprovider");
    }
    return socketService
    }