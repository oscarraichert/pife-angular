import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ApiRoutes } from "../utils/api-routes";
import { Observable } from "rxjs";
import { SocketHandler } from "../core/socket-handler";
import { AuthService } from "./auth.service";
import { WebSocketRoutes } from "../utils/web-socket-routes";

@Injectable({providedIn: 'root'})
export class GameService {
    constructor(
        private http: HttpClient,
        private socketHandler: SocketHandler,
        private authService: AuthService,
    ) {}

    public getRooms(): Observable<string[]> {
        return this.http.get<string[]>(ApiRoutes.listRooms);
    }

    public createRoom() {
        this.socketHandler.connect(WebSocketRoutes.baseConnection + this.authService.getToken());
    }

    public joinRoom(roomId: string) {
        this.socketHandler.connect(WebSocketRoutes.baseConnection + this.authService.getToken() + "&room_id=" + roomId);
    }

    public leaveRoom() {
        this.socketHandler.disconnect();
    }
}