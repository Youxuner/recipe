import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core"

@Directive({
  selector: "[appDropdown]"
})
export class DropdownDirective {

  constructor(private elemRef: ElementRef) {}

  @HostBinding("class.open") private isOpen = false;
  @HostListener("document:click", ["$event"])
  public toggleOpen(event: Event) {
    this.isOpen = this.elemRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
}
