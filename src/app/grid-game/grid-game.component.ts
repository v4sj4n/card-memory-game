import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { PokeCard } from '../../poke/poke';
import { PokeService } from '../../poke/poke.service';

@Component({
  selector: 'app-grid-game',
  standalone: true,
  imports: [],
  templateUrl: './grid-game.component.html',
})
export class GridGameComponent {
  @Input() rowsForGrid!: number;
  @Input() columnsForGrid!: number;
  @Output() loseGame = new EventEmitter<void>();
  @Output() winGame = new EventEmitter<void>();
  cards = signal<PokeCard[]>([]);
  touchedCards = signal<number>(0);

  constructor(private pokeService: PokeService) {}
  ngOnInit() {
    this.pokeService
      .getCards(this.rowsForGrid * this.columnsForGrid)
      .subscribe((cards) => {
        this.cards.set(cards);
      });
    console.log(this.cards());
  }

  onClick(card: PokeCard) {
    this.touchedCards.update((prevCount) => prevCount + 1);
    this.cards.update((prevCards) => {
      const updatedCards = prevCards.map((c) => {
        if (c === card) {
          if (c.clicked) {
            this.loseGame.emit();
          }
          if (this.touchedCards() === this.rowsForGrid * this.columnsForGrid) {
            this.winGame.emit();
          }
          return { ...c, clicked: true };
        }
        return c;
      });
      return this.arrayShuffler(updatedCards);
    });
  }

  private arrayShuffler(array: PokeCard[]) {
    let shuffledArray: PokeCard[] = [];
    let usedIndexes: number[] = [];

    let i = 0;
    while (i < array.length) {
      const RandNum = Math.floor(Math.random() * array.length);
      if (!usedIndexes.includes(RandNum)) {
        shuffledArray.push(array[RandNum]);
        usedIndexes.push(RandNum);
        i++;
      }
    }
    return shuffledArray;
  }
}
