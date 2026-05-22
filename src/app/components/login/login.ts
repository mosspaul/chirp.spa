import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { LoginDto } from '../../models/user-models/login-dto';
import { catchError } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  credentials: LoginDto = {username: "", password: ""}
  showPassword: boolean = false;
  userService = inject(UserService)

  constructor(private router: Router) {}
  
  login() {
    this.userService.login(this.credentials).pipe(catchError(error => {
      console.log(error);
      throw error;
    }))
      .subscribe(_ => this.router.navigate(["/dashboard"]));
  }
  togglePassword() {
		this.showPassword = !this.showPassword;
	}
}
