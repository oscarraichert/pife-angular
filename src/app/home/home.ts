import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../utils/app-routes';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  public handleLogout() {
    this.authService.clearToken();
    this.router.navigate([AppRoutes.login]);
  }
}
