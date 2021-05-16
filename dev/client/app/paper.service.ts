import { Injectable } from '@angular/core';

import { SocketService } from "./socket.service";
declare var paper;

@Injectable()
export class PaperService {
  private socket: SocketIOClient.Socket;
  private tool;
  private color;
  private strokeWidth;
  private path;
  private maxPoints;
  private currPoints;
  private isTurn;

  constructor(private socketService: SocketService) {
    this.socket = socketService.socket;
  }

  public initPaper(canvasId) {
    paper.projects = [];
    paper.setup(canvasId);
    this.tool = new paper.Tool();
  }

  public clearProject() {
    paper.project.clear();
    this.socket.emit('drawing:clear');
  }

  public isDrawer() {
    return this.socketService.toObservable('drawing:drawer');
  }

  public reset() {
    this.tool.remove();
  }

  public subscribeEvent() {
    this.socket.on('drawing:mouseDown', (data) => {
      this.processMouseDown(data);
    });
    this.socket.on('drawing:mouseDrag', (data) => {
      this.processDrawing(data);
    });
    this.socket.on('drawing:load', (data) => {
      this.loadProject(data);
    });
    this.socket.on('drawing:clear', () => {
      paper.project.clear();
    });
    this.socket.on('drawing:brushChange', (brush) => {
      this.color = brush.color;
      this.strokeWidth = brush.width;
    });
    this.socket.on('drawing:turnChange', (data) => {
      this.isTurn = true;
      this.maxPoints = 30;
      this.currPoints = 0;
    });

  }

  public enableDrawing() {
    this.tool.minDistance = 10;
    this.tool.on('mousedown', this.onMouseDown);
    this.tool.on('mousedrag', this.onMouseDrag);
  }

  public eraser() {
    this.color = '#FFFFFF';
    this.strokeWidth = 30;
    this.brushChange();
  }

  public pencil() {
    this.color = '#0000FF';
    this.strokeWidth = 3;
    this.brushChange();
  }

  public red() {
    this.color = '#FF0000';
    this.strokeWidth = 3;
    this.brushChange();
  }

  public startTurn() {
    this.isTurn = true;
    this.maxPoints = 30;
    this.currPoints = 0;
  }

  private brushChange() {
    this.socket.emit('drawing:brushChange', { color: this.color, width: this.strokeWidth });
  }

  // private turnChange() {
  //   this.socket.emit('drawing:turnChange', {});
  // }

  private onMouseDown = (event) => {
    // Create a new path every time the mouse is clicked
    this.setPath(event);
    this.socket.emit('drawing:mouseDown', event.point);
  };

  private onMouseDrag = (event) => {
    // Add a point to the path every time the mouse is dragged
    this.currPoints ++;
    if (this.currPoints < this.maxPoints) {
      this.path.add(event.point);
      this.path.smooth();
      this.socket.emit('drawing:mouseDrag', event.point);
    } else {
      this.isTurn = false;
    }

  };

  private processMouseDown(point) {
    let p = new paper.Point(point[1], point[2]);
    this.setPath({point: p});
    paper.view.draw();
  }

  private processDrawing(point) {
    let p = new paper.Point(point[1], point[2]);
    this.path.add(p);
    paper.view.draw();
  };

  private setPath(event) {
    this.currPoints ++;
    if (this.currPoints < this.maxPoints) {
      this.path = new paper.Path();
      this.path.strokeColor = this.color;
      this.path.strokeWidth = this.strokeWidth;
      this.path.strokeCap = 'round';
      this.path.strokeJoin = 'round';

      this.path.add(event.point);
    } else {
      this.isTurn = false;
    }
  }

  private loadProject(projectJSON) {
    paper.project.importJSON(projectJSON);
  }
}
