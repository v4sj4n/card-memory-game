import { CommonModule } from '@angular/common';
import { Component, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { GridMakerComponent } from './grid-maker/grid-maker.component';
import { GridGameComponent } from './grid-game/grid-game.component';
import { LostGameComponent } from './lost-game/lost-game.component';
import { WonGameComponent } from './won-game/won-game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    IntroComponent,
    GridMakerComponent,
    GridGameComponent,
    LostGameComponent,
    WonGameComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'card-memory-game';
  knowTheGame = signal<boolean>(false);
  startGame = signal<boolean>(false);
  lostGame = signal<boolean>(false);
  wonGame = signal<boolean>(false);

  rowsForGrid = signal<number>(2);
  columnsForGrid = signal<number>(2);

  toggleKnowTheGame() {
    this.knowTheGame.set(!this.knowTheGame());
  }
  toggleStartGame() {
    this.startGame.set(!this.startGame());
  }
  loseGame() {
    this.lostGame.set(true);
    this.rowsForGrid.set(2);
    this.columnsForGrid.set(2);
  }

  winGame() {
    this.wonGame.set(true);
    this.rowsForGrid.set(2);
    this.columnsForGrid.set(2);
  }

  changeRowsForGrid(rows: number) {
    this.rowsForGrid.set(rows);
  }
  changeColumnsForGrid(columns: number) {
    this.columnsForGrid.set(columns);
  }

  playAgain() {
    this.lostGame.set(false);
    this.wonGame.set(false);
  }
}
