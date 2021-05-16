import { Component, Input, OnChanges } from '@angular/core';
import { Player } from "./player.model";
@Component({
  selector: 'game',
  template: `
    <div class="ui text container">
      <div class="ui center aligned raised teal segment">
        <p *ngIf="word">Please draw <span class="ui blue header">{{word}}</span></p>
        <p *ngIf="!word">
          <img src="/images/{{currentDrawer.imageId}}.jpg" class="ui mini middle aligned avatar image">
          {{currentDrawer.name}} is drawing
        </p>
        <p>Time left: {{timeLeft}}</p>
      </div>
    </div>
    <div class="ui center aligned container segment">
        <paper> </paper>
    </div>
    <div class="ui text container segment">
      <chat [isDrawer]="isDrawer"> </chat>
    </div>
  `
})
export class GameComponent implements OnChanges {
  @Input() word: string;
  @Input() currentDrawer: Player;
  @Input() timeLeft: number;
  isDrawer: boolean;

  ngOnChanges() {
    this.isDrawer = this.word ? true : false;
  }
}
