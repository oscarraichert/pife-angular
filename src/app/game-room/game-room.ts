import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-game-room',
  imports: [ReactiveFormsModule],
  templateUrl: './game-room.html',
  styleUrl: './game-room.css'
})
export class GameRoom implements OnDestroy, OnInit {

  constructor(
    private gameService: GameService
  ) { }
  
  chatMessages: string[] = [];
  
  chatMessage = new FormControl();

  ngOnInit(): void {
    this.chatMessages = this.gameService.chatMessages;
  }

  ngOnDestroy(): void {
    this.gameService.leaveRoom();
  }

  handleSendMessage() {
    this.gameService.sendChatMessage(this.chatMessage.value);
  }
}
