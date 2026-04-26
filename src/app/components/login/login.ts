import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { LoginDto } from '../../models/user-models/login-dto';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  credentials: LoginDto = {username: "", password: ""}
  userService = inject(UserService)

  constructor(private router: Router) {}
  
  onSubmit() {
    this.userService.login(this.credentials).pipe(catchError(error => {
      console.log(error);
      throw error;
    }))
      .subscribe(_ => this.router.navigate(["/dashboard"]));
  }
}
