import { animate, animateChild, group, keyframes, query, style, transition, trigger } from '@angular/animations'

export const routeTransitionAnimations = trigger('triggerName', [
    transition('one => two', [
        style({position: 'relative'}),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%',
            })
        ]),
        query(':enter', [style({ right: '-100%', opacity: 0 })]),
        query(':leave', animateChild()),
        group([
            query(':leave', [animate('1.2s ease', style({ right: '100%', opacity: 0 }))]),
            query(':enter', [animate('1.2s ease', style({ right: '0%', opacity: 1 })), 
                /*animate('1s', keyframes([
                    style({ backgroundColor: 'pink', offset: 1.0})
                ])),*/
            ]),
           ]),
        query(':enter', animateChild())
    ]),
    transition('two => one', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [style({ left: '-100%', opacity: 0 })]),
        query(':leave', animateChild()),
        group([
          query(':leave', [animate('1s ease-out', style({ left: '100%', opacity: 0 }))]),
          query(':enter', [animate('1s ease-out', style({ left: '0%', opacity: 1 }))])
         ]),
        query(':enter', animateChild())
    ])
]);