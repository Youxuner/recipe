import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public isLoginMode = true;
  public isLoading = false;
  public error: string = null;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(form: NgForm) {
    if (form.invalid) return;

    let email = form.value.email;
    let password = form.value.password;
    this.isLoading = true;
    if (!this.isLoginMode)
      this.authService
        .signup(email, password)
        .subscribe(
          () => this.router.navigate(["/recipes"]),
          error => {
            this.isLoading = false;
            this.error = error;
          },
          () => this.isLoading = false
        );
    else
      this.authService.login(email, password).subscribe(
        () => this.router.navigate(["/recipes"]),
        error => {
          this.isLoading = false;
          this.error = error;
        },
        () => this.isLoading = false
      );
  }

}
