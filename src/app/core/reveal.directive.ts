import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Fades and lifts an element into place the first time it enters the viewport.
 *
 * Usage: `<li appReveal>` — add `[style.--d]="'120ms'"` to stagger.
 * Falls back to "already visible" when IntersectionObserver is missing or the
 * visitor asked for reduced motion.
 */
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements OnInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const node = this.host.nativeElement;

    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      node.classList.add('reveal', 'is-in');
      return;
    }

    node.classList.add('reveal');

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }
          entry.target.classList.add('is-in');
          this.observer?.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    );

    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
