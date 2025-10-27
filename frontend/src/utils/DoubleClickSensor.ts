import type { SensorInstance, SensorOptions } from '@dnd-kit/core';

export class DoubleClickSensor implements SensorInstance {
  autoScrollEnabled: boolean = false; 
  private timeoutId: number | null = null;
  private node: HTMLElement | null = null;

  constructor(private options: SensorOptions) {}

  attach(document: Document) {
    document.addEventListener('dblclick', this.handleDoubleClick);
  }

  detach(document: Document) {
    document.removeEventListener('dblclick', this.handleDoubleClick);
  }

  private handleDoubleClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    this.node = target.closest('[data-dnd-draggable]') as HTMLElement;

    if (this.node) { // @ts-ignore
      this.options.onStart(event);
    }
  };
}