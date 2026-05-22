import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service';
import { FormsModule } from '@angular/forms';
import { SignUpDto } from '../../models/user-models/signup-dto';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  credentials: SignUpDto = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    simple_fin_token: ''
  }
  showPassword: boolean = false;
  userService = inject(UserService)

  constructor(private router: Router) {}

  signUp() {
    this.userService.signUp(this.credentials).pipe(catchError(error => {
          console.log(error);
          throw error;
        }))
          .subscribe(_ => this.router.navigate(["/dashboard"]));
  }

  togglePassword() {
		this.showPassword = !this.showPassword;
	}
}
