import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AuthResponseData, AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective)
  public alertHost: PlaceholderDirective;

  public isLoginMode = true;
  public isLoading = false;
  private closeSub: Subscription;
  public error: string = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private cmpFactory: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {}
  ngOnDestroy() {
    if (this.closeSub) this.closeSub.unsubscribe();
  }

  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(form: NgForm) {
    if (form.invalid) return;

    let email = form.value.email;
    let password = form.value.password;
    let obs: Observable<AuthResponseData>;
    this.isLoading = true;
    if (!this.isLoginMode) obs = this.authService.signup(email, password);
    else obs = this.authService.login(email, password);

    obs.subscribe(
      () => this.router.navigate(['/recipes']),
      (errorMsg) => {
        this.isLoading = false;
        // this.error = errorMsg;
        this.showErrorAlert(errorMsg);
      },
      () => (this.isLoading = false)
    );
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory =
      this.cmpFactory.resolveComponentFactory(AlertComponent);
    const viewRef = this.alertHost.viewRef;
    viewRef.clear();
    const compRef = viewRef.createComponent(alertCmpFactory);
    compRef.instance.message = message;
    this.closeSub = compRef.instance.closeEv.subscribe(() => {
      this.closeSub.unsubscribe();
      viewRef.clear();
    });
  }
}
