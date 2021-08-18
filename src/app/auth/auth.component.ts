import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public isLoginMode = true;
  public isLoading = false;
  constructor(private authService: AuthService) { }

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
        .subscribe(resData => console.log(resData),
                   error => console.log(error.message),
                   () => this.isLoading = false);

    else


    return;
  }

}
