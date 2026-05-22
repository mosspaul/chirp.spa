import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SignUpDto } from '../models/user-models/signup-dto';
import { SignUpResponse } from '../models/user-models/signup-response';
import { LoginResponse } from '../models/user-models/login-response';
import { LoginDto } from '../models/user-models/login-dto';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  http = inject(HttpClient);
  baseUrl = "http://localhost:5287/api/user/";

  login(loginDto: LoginDto) {
  return this.http.post<LoginResponse>(`${this.baseUrl}login`, loginDto).pipe(
    tap(response => {
      localStorage.setItem('token', response.token); // 👈 add this
    })
  );
}

  signUp(signUpDto: SignUpDto): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(`${this.baseUrl}signup`, signUpDto).pipe(
      tap(response => {
        localStorage.setItem('token', response.token); // save the token
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  //this.router.navigate(['/login']);
  }
}
