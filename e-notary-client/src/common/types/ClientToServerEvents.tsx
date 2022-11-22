import { ClientChatData } from "./ClientChatData";

export interface ClientToServerEvents {
    chat: (data: ClientChatData) => void;
    'joined-user': (data: { username: string, roomname: string }) => void;
    upload: (data: { file: File, username: string, roomname: string }) => void;
}