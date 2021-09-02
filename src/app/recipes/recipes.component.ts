import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

const toIn = trigger('toIn', [
  state(
    'in',
    style({
      opacity: 1,
      transform: 'translateY(0)',
    })
  ),
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'translateY(100px)',
    }),
    animate(300),
  ]),
]);

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  animations: [toIn],
})
export class RecipesComponent implements OnInit {
  // public state = 'buttom';
  constructor() {
    // this.service.selectEv.subscribe((recipe: Recipe) => this.recipe = recipe);
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.onAnimate();
    // }, 0);
  }

  // onAnimate() {
  //   this.state = 'normal';
  // }
}

// const toIn = trigger('toIn', [
//   state(
//     'normal',
//     style({
//       opacity: 1,
//       transform: 'translateY(0)',
//     })
//   ),
//   state(
//     'buttom',
//     style({
//       opacity: 0,
//       transform: 'translateY(100px)',
//     })
//   ),
//   transition('buttom => normal', animate(300)),
// ]);
