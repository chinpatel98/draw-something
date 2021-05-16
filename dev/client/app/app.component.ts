import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { Player } from "./player.model";
@Component({
  selector: 'app',
  template: `
   <div class="ui container">
     <div *ngIf="!isPlaying">
      <lobby [winner]="winner"> </lobby>
     </div>
     <div *ngIf="isPlaying">
      <game [currentDrawer]="currentDrawer" [word]="word" [timeLeft]="timeLeft"> </game>
     </div>
   </div>
  `
})
export class AppComponent implements OnInit {
  word: string;
  drawer1: Player;
  drawer2: Player;
  currentDrawer: Player;
  isPlaying: boolean;
  winner: Object;
  timeLeft: number;

  constructor(private gameService: GameService) {
    // for fun
    // window.useList = (list) => gameService.changeList(list);
  }

  public ngOnInit() {

    this.gameService.onGameStart().subscribe((drawers) => {
      this.drawer1 = drawers['drawer1'];
      this.drawer2 = drawers['drawer2'];
      this.currentDrawer = this.drawer1;
      this.isPlaying = true;
    });

    this.gameService.onReceiveAnswer().subscribe((word) => {
      this.word = word;
    });

    this.gameService.onGameEnd().subscribe((winner) => {
      this.winner = winner;
      this.isPlaying = false;
      this.word = '';
    });

    this.gameService.timeLeft().subscribe((time: number) => this.timeLeft = time);

  }
}
