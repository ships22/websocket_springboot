import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  private serverUrl;
  private eventSource;
  userId = Math.floor(Math.random() * 1000 + 1);

  infoSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    this.prepareToListen(this.userId)
  );
  checkInfo$ = this.infoSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  prepareToListen(userId) {
    this.serverUrl = 'http://localhost:8080/subscribe?userId=' + userId;
    this.eventSource = new EventSource(this.serverUrl);
    this.eventSource.addEventListener('latestNews', (event: any) => {
      this.infoSubject.next(event.data);
      return event.data;
    });
  }
}
