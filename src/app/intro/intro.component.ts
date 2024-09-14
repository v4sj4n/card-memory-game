import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css',
})
export class IntroComponent {
  @Output() toggleKnowTheGame = new EventEmitter<void>();

  emitToggleKnowTheGame() {
    this.toggleKnowTheGame.emit();
  }
}
