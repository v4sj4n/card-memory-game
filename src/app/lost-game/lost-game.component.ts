import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-lost-game',
  standalone: true,
  imports: [],
  templateUrl: './lost-game.component.html',
})
export class LostGameComponent {
  @Input() rowsForGrid!: number;
  @Input() columnsForGrid!: number;

  @Output() rowsForGridChange = new EventEmitter<number>();
  @Output() columnsForGridChange = new EventEmitter<number>();

  @Output() playAgain = new EventEmitter<void>();

  changeRows(event: Event) {
    const target = event.target as HTMLInputElement;
    this.rowsForGrid = Number(target.value);
    this.rowsForGridChange.emit(this.rowsForGrid);
  }
  changeColumns(event: Event) {
    const target = event.target as HTMLInputElement;
    this.columnsForGrid = Number(target.value);
    this.columnsForGridChange.emit(this.columnsForGrid);
  }

  emitTogglePlayAgain() {
    this.playAgain.emit();
  }
}
