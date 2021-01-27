import { Component, OnInit } from '@angular/core';
import {StopwatchService} from '../shared/stopwatch.service';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnInit {

  constructor(public stopwatchService: StopwatchService) { }

  ngOnInit(): void {
  }

  startOrStop(): void {
    this.stopwatchService.startOrStop();
  }

  wait(): void {
    this.stopwatchService.wait();
  }

  reset(): void {
    this.stopwatchService.reset();
  }
}
