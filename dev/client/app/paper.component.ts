import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaperService } from './paper.service';


@Component({
  selector: 'paper',
  template: `
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
export class PaperComponent implements OnInit, OnDestroy {

  isDrawer: boolean;

  constructor(private paperService: PaperService) {
  }

  ngOnInit() {
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
    this.paperService.reset();
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
