import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { LanguageService } from './core/language.service';
import { SiteHeader } from './components/site-header/site-header';
import { Hero } from './sections/hero/hero';
import { About } from './sections/about/about';
import { Work } from './sections/work/work';
import { Skills } from './sections/skills/skills';
import { Contact } from './sections/contact/contact';
import { SiteFooter } from './components/site-footer/site-footer';

@Component({
  selector: 'app-root',
  imports: [SiteHeader, Hero, About, Work, Skills, Contact, SiteFooter],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly i18n = inject(LanguageService);

  /** 0 → 1 reading progress, drawn as a hairline at the very top. */
  protected readonly progress = signal(0);

  private frame = 0;

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.frame) {
      return;
    }
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      this.progress.set(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    });
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.onScroll();
  }
}
