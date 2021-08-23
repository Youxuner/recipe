import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PlaceholderDirective } from './placeholder.directive';

@NgModule({
  declarations: [
    DropdownDirective,
    PageNotFoundComponent,
    ErrorPageComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DropdownDirective,
    PageNotFoundComponent,
    ErrorPageComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    NgbModule,
    CommonModule,
  ]
})
export class SharedModule {}
