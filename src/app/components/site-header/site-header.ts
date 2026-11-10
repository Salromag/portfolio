import { ChangeDetectionStrategy, Component, HostListener, effect, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class SiteHeader {
  protected readonly i18n = inject(LanguageService);
  protected readonly theme = inject(ThemeService);

  protected readonly scrolled = signal(false);
  protected readonly open = signal(false);

  constructor() {
    // Lock the page behind the drawer menu.
    effect(() => {
      document.body.style.overflow = this.open() ? 'hidden' : '';
    });
  }

  @HostListener('window:scroll', [])
  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  /** Never leave the page locked if the drawer is open while growing to desktop. */
  @HostListener('window:resize', [])
  protected onResize(): void {
    if (window.innerWidth > 900) {
      this.closeMenu();
    }
  }

  protected toggleMenu(): void {
    this.open.update((open) => !open);
  }

  protected closeMenu(): void {
    this.open.set(false);
  }
}
