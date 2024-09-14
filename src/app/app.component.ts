import { CommonModule } from '@angular/common';
import { Component, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { GridMakerComponent } from './grid-maker/grid-maker.component';
import { GridGameComponent } from './grid-game/grid-game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, IntroComponent, GridMakerComponent, GridGameComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'card-memory-game';
  knowTheGame = signal<boolean>(false);
  startGame = signal<boolean>(false);
  rowsForGrid = signal<number>(2);
  columnsForGrid = signal<number>(2);

  toggleKnowTheGame() {
    this.knowTheGame.set(!this.knowTheGame());
  }
  toggleStartGame() {
    this.startGame.set(!this.startGame());
  }

  changeRowsForGrid(rows: number) {
    this.rowsForGrid.set(rows);
  }
  changeColumnsForGrid(columns: number) {
    this.columnsForGrid.set(columns);
  }
}
