import { ServerChatData } from "./ServerChatData";


export interface ServerToClientEvents {
    chat: (data: ServerChatData) => void;
}