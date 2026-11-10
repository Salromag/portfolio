import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { LanguageService } from './core/language.service';
import { ThemeService } from './core/theme.service';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('renders the hero heading with the profile name', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const heading = (fixture.nativeElement as HTMLElement).querySelector('h1');
    expect(heading?.textContent).toContain('Salva Romero');
  });

  it('switches the whole page when the language changes', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    TestBed.inject(LanguageService).set('en');
    await fixture.whenStable();

    expect(document.documentElement.lang).toBe('en');
    expect(document.title).toBe('Salva Romero — Frontend developer');
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Selected work');
  });

  it('applies the chosen theme to the document element', async () => {
    // index.html is not part of the test DOM, so provide the meta tag the service updates.
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.append(meta);

    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const theme = TestBed.inject(ThemeService);
    theme.set('dark');
    await fixture.whenStable();

    expect(document.documentElement.dataset['theme']).toBe('dark');
    expect(meta.getAttribute('content')).toBe('#131110');

    theme.set('light');
    await fixture.whenStable();

    expect(document.documentElement.dataset['theme']).toBe('light');
    expect(meta.getAttribute('content')).toBe('#f3efe6');

    meta.remove();
  });
});
