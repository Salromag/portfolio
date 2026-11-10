import { Injectable, computed, effect, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'salva.portfolio.theme';

/**
 * Night mode (夜). The starting value comes from the inline script in index.html so the
 * first paint is already correct; this service keeps the DOM, the browser UI colour and
 * storage in sync from then on.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _theme = signal<Theme>(readInitialTheme());

  readonly theme = this._theme.asReadonly();
  readonly isDark = computed(() => this._theme() === 'dark');

  constructor() {
    effect(() => {
      const theme = this._theme();

      document.documentElement.dataset['theme'] = theme;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', theme === 'dark' ? '#131110' : '#f3efe6');
    });

    // Follow the operating system until the visitor picks a side explicitly.
    window
      .matchMedia?.('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        if (!hasStoredChoice()) {
          this._theme.set(event.matches ? 'dark' : 'light');
        }
      });
  }

  toggle(): void {
    this.set(this._theme() === 'dark' ? 'light' : 'dark');
  }

  set(theme: Theme): void {
    this._theme.set(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage may be blocked; the theme still applies for this visit.
    }
  }
}

function readInitialTheme(): Theme {
  const fromDom = document.documentElement.dataset['theme'];
  if (fromDom === 'dark' || fromDom === 'light') {
    return fromDom;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
  } catch {
    // Ignore and fall back to the system preference.
  }

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function hasStoredChoice(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'dark' || stored === 'light';
  } catch {
    return false;
  }
}
