import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthGuard } from "./auth/services/auth-guard.service";
import { AuthInterceptorService } from "./auth/services/auth-interceptor.service";
import { AuthService } from "./auth/services/auth.service";
import { CanDeactivateGuard } from "./services/can-deactivate-guard.service";

const interceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptorService,
  multi: true
};

@NgModule({
  providers: [AuthGuard, AuthService, CanDeactivateGuard, interceptor]
})
export class CoreModule {}
