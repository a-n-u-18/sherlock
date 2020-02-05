import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GameComponent } from './game/game.component'; 
import { AuthGuard } from './_helpers';
import { GoogleLoginComponent } from './google-login/google-login.component';

const routes: Routes = [
    { path: '', component: GameComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'googleLogin', component: GoogleLoginComponent },
    { path: 'leaderboard', component: HomeComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);