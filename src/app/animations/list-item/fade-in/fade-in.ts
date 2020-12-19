import { trigger, transition, style, animate, query, stagger, sequence } from '@angular/animations';

export const listItemFadeIn = trigger('listItemFadeIn', [
  //   transition('* => void', [
  //     style({
  //       height: '*',
  //       opacity: '1',
  //       transform: 'translateX(0)',
  //       'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)',
  //     }),
  //     sequence([
  //       animate(
  //         '.25s ease',
  //         style({ height: '*', opacity: '.2', transform: 'translateX(20px)', 'box-shadow': 'none' })
  //       ),
  //       animate(
  //         '.1s ease',
  //         style({ height: '0', opacity: 0, transform: 'translateX(20px)', 'box-shadow': 'none' })
  //       ),
  //     ]),
  //   ]),
  transition('void => fade-in', [
    style({ width: '0', opacity: 0, transform: 'scale(0.5)' }),
    sequence([
      animate(
        '.2s 0s ease-in-out',
        style({ width: '130px', transform: 'scale(0.75)', opacity: 0 })
      ),
      animate('.2s .1s ease-in-out', style({ width: '130px', transform: 'scale(1)', opacity: 1 })),
    ]),
  ]),
]);
