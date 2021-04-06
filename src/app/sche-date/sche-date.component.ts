import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';

import { PowerOnDate } from '../models/devices.models';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-sche-date',
  templateUrl: './sche-date.component.html',
  styleUrls: ['./sche-date.component.css'],
  providers:[ProfileService],
  encapsulation: ViewEncapsulation.None
})
export class ScheDateComponent implements OnInit {
  isValidFormOptions: boolean = false;
  channelOn: boolean = true;
  validDate: boolean = true;
  success: boolean = false;

  currentDate: Date = new Date();
  currentHours: number = this.currentDate.getHours();
  currentMinutes: number = this.currentDate.getMinutes();

  hours: Array<number> = Array.from({length: 12}).map((_, i) => i+1);
  minutes: Array<number> = Array.from({length: 60}).map((_, i) => i);

  dateForm = new FormGroup({
    dateOn: new FormControl(this.currentDate, Validators.required),
    hours: new FormControl(this.currentHours % 12 ? this.currentHours % 12 : 12, Validators.required),
    minutes: new FormControl(this.currentMinutes, Validators.required),
    am_pm: new FormControl(this.currentHours >= 12 ? 'p.m.' : 'a.m.', Validators.required),
    withChannel: new FormControl(false),
    channel: new FormControl(0)
  });

  ngOnInit(): void {
  }

  constructor(
    public dialogRef:MatDialogRef<ScheDateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private profile:ProfileService) {}

  changeState() {
    this.channelOn = this.dateForm.get('withChannel')?.value;
    
    if (this.channelOn) {
      this.dateForm.get('channel')?.setValue(0);
    }

  }

  SchedulerOn() {
    this.isValidFormOptions = false

    if(this.dateForm.invalid) {
      return
    }

    this.isValidFormOptions = true

    let date: Date = this.dateForm.get('dateOn')?.value;
    let dateHou: number = this.dateForm.get('hours')?.value;
    let dateMin: number = this.dateForm.get('minutes')?.value;
    const ampm: string = this.dateForm.get('am_pm')?.value;
    const channel: number = this.dateForm.get('channel')?.value;
    
    if(ampm == "p.m." && date.getHours() != 12) {
      date.setHours(dateHou + 12);
    } else {
      date.setHours(dateHou);
    }

    if(ampm == "a.m." && date.getHours() == 12) {
      date.setHours(0);
    }

    date.setMinutes(dateMin);
    date.setSeconds(0);
    date.setMilliseconds(0);

    const datestr = formatDate(date, "yyyy-MM-ddTHH:mm", "en-us") + ":00MST";

    if (+date - +new Date() <= 0) {
      this.validDate = false;
      this.success = false;
      return
    }

    this.validDate = true;
    this.profile.ScheduleCommand(new PowerOnDate(this.data.tv, datestr, channel)).subscribe();
    this.success = true;
  }
}
