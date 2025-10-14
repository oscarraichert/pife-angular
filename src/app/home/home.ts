import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../utils/app-routes';
import { GameService } from '../../services/game.service';
import { interval, startWith, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'] 
})
export class Home implements OnInit, OnDestroy {

  roomIds: string[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private gameService: GameService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.gameService.getRooms()),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: rooms => {
          this.roomIds = rooms;
          this.cdr.detectChanges();
        },
        error: err => console.error(err)
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleLogout() {
    this.authService.clearToken();
    this.gameService.leaveRoom();
    this.router.navigate([AppRoutes.login]);
  }

  handleCreateRoom() {
    this.gameService.createRoom();
  }

  handleSelectRoom(roomId: string) {
    this.gameService.joinRoom(roomId);
    this.router.navigate([AppRoutes.gameRoom + roomId]);
  }
}
