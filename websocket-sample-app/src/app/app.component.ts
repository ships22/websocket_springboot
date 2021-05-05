import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  greeting: any;
  name: string;

  title = 'websocket-sample-app';
  userName: any;
  constructor(private websocketService: WebsocketService) {}

  connect() {
    this.websocketService._connect();
  }

  disconnect() {
    this.websocketService._disconnect();
  }

  sendMessage() {
    this.websocketService._send(this.name);
  }

  handleMessage(message) {
    this.greeting = message;
  }

  register() {
    console.log('userName : ', this.userName);
    this.websocketService.registration(this.userName).subscribe((res) => {
      console.log('gistration res : ', res);
      this.userName = '';
    });
  }
}
