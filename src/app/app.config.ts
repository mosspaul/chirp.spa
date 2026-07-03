import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/auth.interceptor';
import { UserService } from './services/user-service';
import { firstValueFrom } from 'rxjs';
import { ProfileDto } from './models/user-models/profile-dto';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),

     provideAppInitializer(async () => {
      const auth    = inject(UserService);
      const http    = inject(HttpClient);
      const token   = localStorage.getItem('token');

      if (!token) return; // not logged in, skip

      try {
        const profile = await firstValueFrom(
          http.get<ProfileDto>('http://localhost:5287/api/user/me')
        );
        auth.setProfile(profile);
      } catch {
        auth.logout();
      }
    })
  ],

};
