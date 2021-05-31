import { Component } from '@angular/core';
import { SseService } from './services/sse.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  greeting: any;
  name: string;
  subscription$: any;
  userId: any;

  title = 'websocket-sample-app';
  userName: any;
  data: any = [];
  constructor(private sseService: SseService) {}

  ngOnInit(): void {
    this.userId = this.sseService.userId;
    this.getInfo();
  }

  getInfo() {
    this.subscription$ = this.sseService.checkInfo$.subscribe((data) => {
      this.data.push(JSON.parse(data || null));
      console.log(this.data);
    });
  }
}
