import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Request is on its way.");
    console.log(req);

    return this.authService.userSub.pipe(
      take(1),
      exhaustMap((user) => {

        if(!user) return next.handle(req).pipe(tap(this.printRes));
        let modifiedReq = req.clone({params: new HttpParams().set("auth", user.token).set('print', 'pretty')})
        return next.handle(modifiedReq).pipe(tap(this.printRes));
      }))
  }

  private printRes(event: HttpEvent<any>) {
      if (event.type === HttpEventType.Response) {
        console.log("Response incoming");
        console.log(event.body);
      }
  }
}


    // let modifiedRequest = req.clone({headers: req.headers.append("Auth", "xyz")});
    // console.log(modifiedRequest);
    // console.log(req);

    // return next.handle(req).pipe(tap(event => {
    //   if (event.type === HttpEventType.Response) {
    //     console.log("Response incoming");
    //     console.log(event.body);
    //   }
    // }));