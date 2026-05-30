import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token'); // your token key
  const http = inject(HttpClient);

  if (!token) {
    router.navigate(['/login']);
    return false;
  }
  else {
     return http.get('http://localhost:5287/api/user/validate').pipe(
    map(() => true),
    catchError(() => {
      localStorage.removeItem('token');
      router.navigate(['/login']);
      return of(false);
    })
  );
  }
};