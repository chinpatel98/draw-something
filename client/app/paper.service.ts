import { Injectable } from '@angular/core';
declare var paper;

@Injectable()
export class PaperService {
  public path;
  public tool;

  constructor() {
    this.tool = new paper.Tool();
    this.tool.minDistance = 10;
  }

  public initPaper(canvasId) {
    paper.setup(document.querySelector(`#${canvasId}`));
  }

  public onMouseDown = (event) => {
    // Create a new path every time the mouse is clicked
    this.path = new paper.Path();
    this.path.add(event.point);
    this.path.strokeColor = 'black';
  };

  public onMouseDrag = (event) => {
    // Add a point to the path every time the mouse is dragged
    this.path.add(event.point);
  };

  public processMouseDown(point) {
    this.path = new paper.Path();
    this.path.add(new paper.Point(point[1], point[2]));
    this.path.strokeColor = 'black';
    paper.view.draw();
  }

  public processDrawing(point) {
    let p = new paper.Point(point[1], point[2]);
    this.path.add(p);
    paper.view.draw();
  };

  public loadProject(projectJSON) {
    paper.project.importJSON(projectJSON);
  }

  public clearProject() {
    paper.project.clear();
  }


}
