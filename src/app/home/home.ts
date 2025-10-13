import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../utils/app-routes';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private gameService: GameService,
  ) {}

  roomIds: string[] = [];

  ngOnInit(): void {
    this.getRooms();
  }

  public handleLogout() {
    this.authService.clearToken();
    this.router.navigate([AppRoutes.login]);
  }

  public getRooms() {
    this.gameService.getRooms().subscribe({
      next: value => this.roomIds = value,
      error: err => console.log(err),
    });
  }
}

