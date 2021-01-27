import {Injectable} from '@angular/core';
import {timer} from 'rxjs';

export interface Watch {
  isWork: boolean;
  isFirst: boolean;
  isWait: boolean;
  subscribeStart?: any;
  subscribeStop?: any;
  time?: any;
}

export interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

@Injectable({providedIn: 'root'})
export class StopwatchService {
  watchInfo: Watch = {
    isWork: false,
    isWait: false,
    isFirst: true
  };

  timeInfo: Time = {
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  startOrStop(): void {
    this.watchInfo.isWork = !this.watchInfo.isWork;

    if ( this.watchInfo.isWait ) {
      this.watchInfo.isWait = false;
    }
    if ( this.watchInfo.isWork ) {
      if ( this.watchInfo.isFirst ) {
        this.watchInfo.time = Date.now();
        this.watchInfo.isFirst = false;
      }

      if (this.watchInfo.subscribeStop) {
        this.watchInfo.subscribeStop.unsubscribe();
      }

      this.watchInfo.subscribeStart = timer(0, 1000).subscribe( () => {
        if ( this.watchInfo.isWork ) {
          [this.timeInfo.hours, this.timeInfo.minutes, this.timeInfo.seconds] =
            this.formatTime(Math.floor((Date.now() - this.watchInfo.time) / 1000));
        }
      });
    } else {
      this.timerStop();
    }
  }

  timerStop(): void {
    this.watchInfo.subscribeStart.unsubscribe();
    this.watchInfo.subscribeStop = timer(0, 1000).subscribe(() => {
      if (!this.watchInfo.isWork) {
        this.watchInfo.time += 1000;
      }
    });
  }

  wait(): void {
    this.watchInfo.isWork = false;
    this.watchInfo.isWait = true;
    this.timerStop();
  }

  reset(): void {
    if (!this.watchInfo.isWait) {
      this.watchInfo.time = Date.now();
      if ( !this.watchInfo.isWork ) {
        this.startOrStop();
      }
    }
  }

  formatTime(time: number): any {
    const hours = '' + Math.floor(time / 3600);
    const minutes = '' + Math.floor(time % 3600 / 60);
    const seconds = '' + Math.floor(time % 3600 % 60);

    return [hours, minutes, seconds];
  }
}
