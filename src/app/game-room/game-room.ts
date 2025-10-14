import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-game-room',
  imports: [ReactiveFormsModule],
  templateUrl: './game-room.html',
  styleUrl: './game-room.css'
})
export class GameRoom implements OnDestroy, OnInit {
  chatMessages: string[] = [];
  chatMessage = new FormControl('');
  private destroy$ = new Subject<void>();

  constructor(
    private gameService: GameService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.gameService.chatMessages$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: value => {
          this.chatMessages = value;
          this.cdr.detectChanges();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.gameService.leaveRoom();
  }

  handleSendMessage() {
    const msg = this.chatMessage.value?.trim();
    if (msg) {
      this.gameService.sendChatMessage(msg);
      this.chatMessage.reset();
    }
  }
}
