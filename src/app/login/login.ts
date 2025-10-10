import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginCredentials } from '../../models/login-credentials';
import { Router } from '@angular/router';
import { ApiRoutes } from '../../utils/api-routes';
import { AppRoutes } from '../../utils/app-routes';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  credentialsForm = new FormGroup(
    {
      username: new FormControl(''),
      password: new FormControl(''),
    }
  );

  onSubmit() {
    this.authService.login(this.credentialsForm.value as LoginCredentials).subscribe({
      next: value => {
        this.authService.setToken(value);
        this.router.navigate([AppRoutes.home]);
      },
      error: err => console.log(err),
    });
  }
}
