import { ServerChatData } from "./ServerChatData";


export interface ServerToClientEvents {
    chat: (data: ServerChatData) => void;
    'active-rooms': (data: [string]) => void;
    'bot-created': (data: { id: string, name: string }) => void;
}