import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { RecipeService } from "../services/recipe.service";
import { Recipe } from "../shared/recipe.model";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {

    public collapsed: boolean = true;
    public active = 1;
    constructor(private router: Router, private authService: AuthService, private service: RecipeService) {

    }

    ngOnInit(): void {

    }

    public login() {
      this.authService.login();
    }

    public logout() {
      this.authService.logout();
    }

    public saveData() {
      this.service.storeRecipes().subscribe();
    }

    public fetchData() {
      this.service.fetchRecipes().subscribe((recipes: Recipe[]) => this.service.setRecipes(recipes));
    }

}
