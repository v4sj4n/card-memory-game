import { Component, Input, signal } from '@angular/core';
import { Poke } from '../../poke/poke';
import { PokeService } from '../../poke/poke.service';

@Component({
  selector: 'app-grid-game',
  standalone: true,
  imports: [],
  templateUrl: './grid-game.component.html',
  styleUrl: './grid-game.component.css',
})
export class GridGameComponent {
  @Input() rowsForGrid!: number;
  @Input() columnsForGrid!: number;
  cards = signal<Poke[]>([]);
  constructor(private pokeService: PokeService) {}
  ngOnInit() {
    this.pokeService
      .getCards(this.rowsForGrid * this.columnsForGrid)
      .subscribe((cards) => {
        this.cards.set(cards);
      });
    console.log(this.cards());
  }
}
