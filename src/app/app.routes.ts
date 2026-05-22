import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { SignUp } from './components/sign-up/sign-up';
import { authGuard } from './auth/route-guard';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
    {path: 'login', component: Login},
    {path: 'signup', component: SignUp},
    {
        path: '',
        canActivate: [authGuard],
        component: Home,
        children: [ 
            {path: 'dashboard', component: Dashboard},
        ]
    },
    {path: '**', redirectTo: '/login'}
];
