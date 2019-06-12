import { trigger, style, transition, animate, group } from '@angular/animations';

export const Modal =
trigger('modal', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(-100%)'
    }),
    animate("250ms ease-in-out", style({
      opacity: 1,
      transform: 'translateY(0)'
    }))
  ]),
  transition(':leave', [
    style({
      opacity: 1,
      transform: 'translateY(0)'
    }),
    animate("180ms ease-in-out", style({
      opacity: 0,
      transform: 'translateY(-100%)'
    }))
  ])
]);
