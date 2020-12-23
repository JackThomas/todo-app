import { CupertinoPane } from 'cupertino-pane';
import { transition, query } from '@angular/animations';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { PaneType } from 'src/app/enums/paneTypes.enum';

@Injectable({
  providedIn: 'root',
})
export class PaneService {
  @Output() present = new EventEmitter<string>();

  public isOpen: boolean = false;

  public height: any = {
    top: window.screen.height - 135 * 0.35,
    middle: window.screen.height * 0.5,
  };

  public translateY: number;
  public fixedTranslateY: number;

  constructor() {}

  presentPane(type: PaneType) {
    this.present.emit(type);
  }

  onDidPresent() {
    this.isOpen = true;
  }

  onDragStart() {
    console.log('Drag start');
  }

  onDrag(instance?) {
    this.changeOpacity(instance?.wrapperEl, this.getTransform(instance?.paneEl), 'null');
  }

  onDragEnd() {
    console.log('Drag end');
  }

  onTransitionStart($event, instance) {
    this.changeOpacity(instance?.wrapperEl, $event.translateY.new, 'all 300ms ease 0s');
  }

  fixedBottom(self: PaneService, pane: CupertinoPane) {
    const wrapperEl = pane?.el;
    const fixedEl = wrapperEl.querySelector('.body-fixed');
    let method;

    self.translateY =
      self.getTransform(pane.paneEl) === 0 ? self.height.middle : self.getTransform(pane.paneEl);

    if (self.translateY <= window.screen.height / 2) {
      self.fixedTranslateY = (self.translateY - fixedEl.getBoundingClientRect().height) * -1;
      method = 'remove';
    } else {
      method = 'add';
    }

    fixedEl.style.setProperty('--translate-y', `${self.fixedTranslateY}px`);
    fixedEl.classList[method]('is-fixed');
  }

  fixedBottomAnimate(pane: CupertinoPane) {
    if (!this.isOpen) {
      return false;
    }

    const wrapperEl = pane?.el;
    const fixedEl = wrapperEl.querySelector('.body-fixed');

    fixedEl.style.setProperty(
      '--transition',
      'all 300ms cubic-bezier(0.175, 0.885, 0.370, 1.120) 0s'
    );

    setTimeout(() => {
      fixedEl.style.setProperty('--transition', 'null');
    }, 300);
  }

  changeOpacity(wrapperEl, val, transitionType) {
    const backdropEl = wrapperEl.querySelector('.backdrop');
    const transformVal = window.screen.height - val;
    const opacity = (0.9 * transformVal) / this.height.top;

    if (transitionType) {
      backdropEl.style.transition = transitionType;
    }
    backdropEl.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
  }

  getTransform(paneElem) {
    const translateYRegex = /\.*translateY\((.*)px\)/i;
    return paneElem ? parseFloat(translateYRegex.exec(paneElem.style.transform)[1]) : 0;
  }

  watch(pane: CupertinoPane, callback?) {
    const self = this;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutationRecord: MutationRecord) => {
        if (callback) {
          callback(self, pane);
        }
      });
    });

    const target = pane.paneEl;
    observer.observe(target, { attributes: true, attributeFilter: ['style'] });
  }
}
