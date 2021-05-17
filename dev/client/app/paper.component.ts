import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { PaperService } from './paper.service';


@Component({
  selector: 'paper',
  template: `
    <div *ngIf="isDrawer" [ngStyle]="{
      'width': progresValue + '%',
      'height': '10px',
      'background-color': 'black'
    }"></div>
    <h1 *ngIf="isDrawer">Remaining Ink: {{progresValue | number}}%</h1>
    <div *ngIf="isDrawer">
      <button class="ui button" (click)="clearPaper()">clear</button>
      <button class="ui button" (click)="useEraser()">eraser</button>
      <button class="ui button" (click)="pencil()">pencil</button>
      <button class="ui button" (click)="red()">red</button>
    </div>
    <canvas 
      id="paper"
      style="height: 500px; width: 900px; border: 1px solid red">
    </canvas>
  `
})
export class PaperComponent implements OnInit, OnDestroy, DoCheck {

  isDrawer: boolean;
  progresValue: number;

  constructor(private paperService: PaperService) {
  }

  ngOnInit() {
    this.progresValue = 0;
    this.paperService.initPaper('paper');
    this.paperService.subscribeEvent();
    this.paperService.isDrawer().subscribe(() => {
      this.paperService.enableDrawing();
      this.isDrawer = true;
    });
    this.pencil();
    this.startTurn();
  }

  ngOnDestroy() {
    this.progresValue = 0;
    this.paperService.reset();
  }

  ngDoCheck() {
    this.progresValue = Math.max(100 - (this.paperService.getCurrPoints() / this.paperService.getMaxPoints()) * 100, 0);
  }

  clearPaper() {
    this.paperService.clearProject();
  }

  useEraser() {
    this.paperService.eraser();
  }

  pencil() {
    this.paperService.pencil();
  }

  red() {
    this.paperService.red();
  }

  startTurn() {
    this.paperService.startTurn();
  }
}
