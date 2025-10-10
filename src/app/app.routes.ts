import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { authenticationGuard } from '../utils/authentication-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home, canActivate: [authenticationGuard] },
    { path: 'login', component: Login }
];
