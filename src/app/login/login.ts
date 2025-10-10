import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginCredentials } from '../../models/login-credentials';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(private authService: AuthService) {}

  credentialsForm = new FormGroup(
    {
      username: new FormControl(''),
      password: new FormControl(''),
    }
  );

  onSubmit() {
    this.authService.login(this.credentialsForm.value as LoginCredentials).subscribe({
      next: value => this.authService.setToken(value),
      error: err => console.log(err),
    });
  }
}
