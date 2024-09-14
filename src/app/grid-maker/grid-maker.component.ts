import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-grid-maker',
  standalone: true,
  imports: [],
  templateUrl: './grid-maker.component.html',
  styleUrl: './grid-maker.component.css',
})
export class GridMakerComponent {
  @Input() rowsForGrid!: number;
  @Input() columnsForGrid!: number;

  @Output() rowsForGridChange = new EventEmitter<number>();
  @Output() columnsForGridChange = new EventEmitter<number>();

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
}
