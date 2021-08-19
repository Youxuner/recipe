import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Request is on its way.");
    // let modifiedRequest = req.clone({headers: req.headers.append("Auth", "xyz")});
    // console.log(modifiedRequest);
    console.log(req);
    return next.handle(req).pipe(tap(event => {
      if (event.type === HttpEventType.Response) {
        console.log("Response incoming");
        console.log(event.body);
      }
    }));
  }
}
