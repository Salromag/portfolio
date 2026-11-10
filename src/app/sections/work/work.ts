import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  signal,
  viewChildren,
} from '@angular/core';
import { WorkGroup } from '../../core/content';
import { LanguageService } from '../../core/language.service';
import { RevealDirective } from '../../core/reveal.directive';

@Component({
  selector: 'app-work',
  imports: [RevealDirective],
  templateUrl: './work.html',
  styleUrl: './work.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Work {
  protected readonly i18n = inject(LanguageService);

  private readonly tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tabBtn');

  protected readonly groups = computed(() => this.i18n.content().work.groups);

  /** `null` means "whatever comes first", so the first tab is active on load. */
  private readonly selectedId = signal<string | null>(null);

  protected readonly activeId = computed(() => this.selectedId() ?? this.groups()[0]?.id ?? '');

  protected isActive(group: WorkGroup): boolean {
    return group.id === this.activeId();
  }

  protected select(id: string): void {
    this.selectedId.set(id);
  }

  /** Left / right / home / end, as expected of an ARIA tablist. */
  protected onTabKeydown(event: KeyboardEvent, index: number): void {
    const groups = this.groups();
    const last = groups.length - 1;
    let next: number;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = index === last ? 0 : index + 1;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        next = index === 0 ? last : index - 1;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = last;
        break;
      default:
        return;
    }

    event.preventDefault();
    this.selectedId.set(groups[next].id);
    this.tabButtons()[next]?.nativeElement.focus();
  }
}
