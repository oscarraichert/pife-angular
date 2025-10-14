import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class SocketHandler {
    public socket: WebSocket | null = null;

    public connect(url: string): void {
        this.socket = new WebSocket(url);

        this.socket.addEventListener("message", (event) => {
            console.log("Message from server ", event.data);
        });
    }
}