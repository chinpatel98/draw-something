import { Component } from 'angular2/core';
import { SocketService } from './socket.service';
import { PaperComponent } from './paper.component';

@Component({
  selector: 'app',
  template: `
    <h1>hello</h1>
    <h2>current users: {{msg}}</h2>
    <paper></paper>
  `,
  providers: [SocketService],
  directives: [PaperComponent]
})
export class AppComponent {
  public msg: string;

  constructor(private _socketService: SocketService) {
    this._socketService.socket.on('test', (data) => this.msg = data);
    this._socketService.socket.on('drawing', mousePos => console.log(mousePos));
  }
}
