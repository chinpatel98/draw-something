const { CanvasInstance } = require('../models');

class Drawing {
  constructor(io, socket) {
    this.canvas = CanvasInstance();
    this.io = io;
    this.socket = socket;
  }

  load() {
    this.socket.emit('drawing:load', this.canvas.exportJSON());
  }

  notifyDrawers(drawerId1, drawerId2) {
    this.io.to(drawerId1).emit('drawing:drawer');
    this.io.to(drawerId2).emit('drawing:drawer');
  }

  onClear() {
    this.canvas.clear();
    this.socket.broadcast.emit('drawing:clear');
  }

  onBrushChange(brush) {
    this.canvas.strokeColor = brush.color;
    this.canvas.strokeWidth = brush.width;
    this.socket.broadcast.emit('drawing:brushChange', brush);
  }

  onMouseDown(pos) {
    this.canvas.mouseDown(pos[1], pos[2]);
    this.socket.broadcast.emit('drawing:mouseDown', pos);
  }

  onMouseDrag(pos) {
    this.canvas.mouseDrag(pos[1], pos[2]);
    this.socket.broadcast.emit('drawing:mouseDrag', pos);
  }

}

module.exports = Drawing;
