import { Injectable } from '@angular/core';
import { Observable, Subject, Observer } from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  webSocketEndPoint: string = 'http://localhost:8080/';
  topic: string = '/topic/message';
  stompClient: any;

  constructor(private httpClient: HttpClient) {}

  private subject: Subject<MessageEvent>;

  _connect() {
    console.log('Initialize WebSocket Connection');
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect(
      {},
      function (frame) {
        _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
          _this.onMessageReceived(sdkEvent);
        });
        //_this.stompClient.reconnect_delay = 2000;
      },
      this.errorCallBack
    );
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }
  _send(message) {
    console.log('calling logout api via web socket');
    this.stompClient.send('/app/hello', {}, JSON.stringify(message));
  }
  errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  onMessageReceived(message) {
    console.log('Message Recieved from Server :: ' + message);
    //this.appComponent.handleMessage(JSON.stringify(message.body));
  }

  registration(userName): Observable<any> {
    return this.httpClient.get<any>(
      this.webSocketEndPoint + 'registration/' + userName
    );
  }
}
