import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { GridMakerComponent } from './grid-maker/grid-maker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, IntroComponent, GridMakerComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'card-memory-game';
  knowTheGame = false;
  startGame = false;
  rowsForGrid = 2;
  columnsForGrid = 2;

  toggleKnowTheGame() {
    this.knowTheGame = !this.knowTheGame;
  }
  toggleStartGame() {
    this.startGame = !this.startGame;
  }

  changeRowsForGrid(rows: number) {
    this.rowsForGrid = rows;
  }
  changeColumnsForGrid(columns: number) {
    this.columnsForGrid = columns;
  }
}
