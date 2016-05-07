import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subscriber } from "rxjs/Rx";

const SERVER_URL = 'http://localhost:3000';

@Injectable()
export class SocketService {
  public socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io.connect(SERVER_URL);
  }

  toObservable(eventName: string): Observable {
    return Observable.create( (subscriber: Subscriber) => {
      this.socket.on(eventName, (data) => subscriber.next(data));
  });
}
}
