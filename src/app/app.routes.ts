import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { SignUp } from './components/sign-up/sign-up';
import { authGuard } from './auth/route-guard';
import { Dashboard } from './components/dashboard/dashboard';
import { Profile } from './components/profile/profile';
import { Settings } from './components/settings/settings';
import { Accounts } from './components/accounts/accounts';
import { Analytics } from './components/analytics/analytics';
import { Transactions } from './components/transactions/transactions';


export const routes: Routes = [
    {path: 'login', component: Login},
    {path: 'signup', component: SignUp},
    {
        path: '',
        canActivate: [authGuard],
        component: Home,
        children: [ 
            { path: 'dashboard', component: Dashboard },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'profile', component: Profile },
            { path: 'settings', component: Settings },
            { path: 'accounts', component: Accounts },
            { path: 'analytics', component: Analytics },
            { path: 'transactions', component: Transactions }
        ]
    },
    {path: '**', redirectTo: '/'}
];
