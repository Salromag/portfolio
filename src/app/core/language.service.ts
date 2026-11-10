import { Injectable, computed, effect, signal } from '@angular/core';
import { CONTENT, Lang, PROFILE, PortfolioContent } from './content';

const STORAGE_KEY = 'salvador.portfolio.lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly _lang = signal<Lang>(detectInitialLang());

  /** Active language, read-only outside the service. */
  readonly lang = this._lang.asReadonly();

  /** The full dictionary for the active language. */
  readonly content = computed<PortfolioContent>(() => CONTENT[this._lang()]);

  readonly profile = PROFILE;

  constructor() {
    // Keep the document in sync: lang attribute, title and meta description.
    effect(() => {
      const lang = this._lang();
      const { meta } = CONTENT[lang];

      document.documentElement.lang = lang;
      document.title = meta.title;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', meta.description);

      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        // Storage can be unavailable (private mode, blocked cookies): not critical.
      }
    });
  }

  set(lang: Lang): void {
    this._lang.set(lang);
  }

  toggle(): void {
    this._lang.update((current) => (current === 'es' ? 'en' : 'es'));
  }

  is(lang: Lang): boolean {
    return this._lang() === lang;
  }
}

/** Stored preference first, then the brows(er) language, then Spanish. */
function detectInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'es' || stored === 'en') {
      return stored;
    }
  } catch {
    // Ignore: fall through to navigator detection.
  }

  const preferred = navigator.languages?.[0] ?? navigator.language ?? 'es';
  return preferred.toLowerCase().startsWith('es') ? 'es' : 'en';
}
