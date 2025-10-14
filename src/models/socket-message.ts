import { MessageType } from "./message-type.enum";

export class SocketMessage {
    MessageType: MessageType;
    Payload: string | null;

    constructor(messageType: number, payload: string | null) {
        this.MessageType = messageType;
        this.Payload = payload;
    }
}