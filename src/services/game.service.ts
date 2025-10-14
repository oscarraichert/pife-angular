import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ApiRoutes } from "../utils/api-routes";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { WebSocketRoutes } from "../utils/web-socket-routes";
import { SocketMessage } from "../models/socket-message";
import { MessageType } from "../models/message-type.enum";

@Injectable({ providedIn: 'root' })
export class GameService {
    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) { }

    public socket: WebSocket | null = null;
    chatMessages: string[] = [];

    public connect(url: string): void {
        this.socket = new WebSocket(url);

        this.socket.addEventListener("message", (event) => this.handleMessage(JSON.parse(event.data)));
    }

    public disconnect() {
        this.socket?.close();
    }

    public send(message: SocketMessage) {
        this.socket?.send(JSON.stringify(message));
    }

    private handleMessage(message: SocketMessage) {        
        switch (message.MessageType) {
            case MessageType.ChatMessage:
                this.getChatMessage(message.Payload!);
        }
    }    

    public getRooms(): Observable<string[]> {
        return this.http.get<string[]>(ApiRoutes.listRooms);
    }

    public createRoom() {
        this.connect(WebSocketRoutes.baseConnection + this.authService.getToken());
    }

    public joinRoom(roomId: string) {
        this.connect(WebSocketRoutes.baseConnection + this.authService.getToken() + "&room_id=" + roomId);
    }

    public leaveRoom() {
        this.disconnect();
    }

    public sendChatMessage(chatMessage: string) {
        var message = new SocketMessage(MessageType.ChatMessage, chatMessage);
        this.send(message);
    }

    public getChatMessage(message: string) {
        this.chatMessages.push(message);
    }
}