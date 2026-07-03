import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { SignUpDto } from '../models/user-models/signup-dto';
import { LoginDto } from '../models/user-models/login-dto';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../models/user-models/auth-response';
import { ProfileDto } from '../models/user-models/profile-dto';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  http = inject(HttpClient);
  baseUrl = "http://localhost:5287/api/user/";

  private readonly _userProfile = signal<ProfileDto | null>(null);
  readonly userProfile = this._userProfile.asReadonly();

 
  setProfile(profile: ProfileDto) {
    this._userProfile.set(profile);
  }

  login(loginDto: LoginDto): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.baseUrl}login`, loginDto).pipe(
    tap(response => {
      this._userProfile.set(response.profileDto);
      localStorage.setItem('token', response.token);
    })
  );
}

  signUp(signUpDto: SignUpDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}signup`, signUpDto).pipe(
      tap(response => {
        localStorage.setItem('token', response.token); // save the token
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }
}
