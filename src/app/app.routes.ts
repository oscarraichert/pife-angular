import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { authenticationGuard } from '../core/authentication-guard';
import { GameRoom } from './game-room/game-room';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home, canActivate: [authenticationGuard] },
    { path: 'login', component: Login },
    { path: 'game-room/:id', component: GameRoom, canActivate: [authenticationGuard] },
];
