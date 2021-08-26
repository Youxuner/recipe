import {
  Component,
  // ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
// import { Router } from '@angular/router';
// import { AlertComponent } from '../shared/alert/alert.component';
// import { AuthResponseData, AuthService } from './services/auth.service';
// import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AppState } from '../store/app-state';
import * as act from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  // @ViewChild(PlaceholderDirective)
  // public alertHost: PlaceholderDirective;

  public isLoginMode = true;
  public isLoading = false;
  // private closeSub: Subscription;
  private storeSub: Subscription;
  public error: string = null;

  constructor(
    // private authService: AuthService,
    // private cmpFactory: ComponentFactoryResolver,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((state) => {
      this.isLoading = state.loading;
      this.error = state.authError;
      // if (this.error)
      //   this.showErrorAlert(this.error);
    });
  }
  ngOnDestroy() {
    // if (this.closeSub) this.closeSub.unsubscribe();
    this.storeSub.unsubscribe();
  }

  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(form: NgForm) {
    if (form.invalid) return;

    let email = form.value.email;
    let password = form.value.password;
    // let obs: Observable<AuthResponseData>;
    if (this.isLoginMode)
      this.store.dispatch(new act.LoginStart({ email, password }));
    // obs = this.authService.login(email, password);
    // obs = this.authService.signup(email, password);
    else this.store.dispatch(new act.SignupStart({ email, password }));

    // obs.subscribe(
    //   () => this.router.navigate(['/recipes']),
    //   (errorMsg) => {
    //     this.isLoading = false;
    //     // this.error = errorMsg;
    //     this.showErrorAlert(errorMsg);
    //   },
    //   () => (this.isLoading = false)
    // );
  }

  // private showErrorAlert(message: string) {
  //   const alertCmpFactory =
  //     this.cmpFactory.resolveComponentFactory(AlertComponent);
  //   const viewRef = this.alertHost.viewRef;
  //   viewRef.clear();
  //   const compRef = viewRef.createComponent(alertCmpFactory);
  //   compRef.instance.message = message;
  //   this.closeSub = compRef.instance.closeEv.subscribe(() => {
  //     this.closeSub.unsubscribe();
  //     viewRef.clear();
  //   });
  // }
}
