import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {

    public collapsed: boolean = true;
    public active = 1;
    constructor(private router: Router, private authService: AuthService) {

    }

    ngOnInit(): void {

    }

    public login() {
      this.authService.login();
    }

    public logout() {
      this.authService.logout();
    }

}
