import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Tv, Fav } from '../models/devices.models';
import { DeviceInfo } from '../profile/InfoDevice';

import { ScheDateComponent } from '../sche-date/sche-date.component';
import { FavoritesComponent } from '../favorites/favorites.component';

import { NodeService } from '../node/node.service'
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css'],
  providers: [ProfileService]
})
export class TvComponent implements OnInit {
  selectedTv = new Tv();
  favorites = Array<number>();

  constructor(
    private nodeService:NodeService,
    private profile:ProfileService,
    private dialog:MatDialog) {
      this.nodeService.tvuser$.subscribe(res => this.selectedTv = res);
      this.nodeService.userinfo$.subscribe(res => this.favorites = res);
   }

  ngOnInit(): void {
  }

  generateReq(act: number): DeviceInfo {

    const dev : DeviceInfo = {
      Capture: 0, 
      Protocol: this.selectedTv.Protocol, 
      Addr: this.selectedTv.Addres,
      Command: act
    };

    return dev
  }

  Onoff(){
    const act = this.generateReq(this.selectedTv.OnOff);
    this.profile.sendCommand(act).subscribe();
  }

  Volup(){
    const act = this.generateReq(this.selectedTv.VolUp);
    this.profile.sendCommand(act).subscribe();
  }

  Voldown(){
    const act = this.generateReq(this.selectedTv.VolDown);
    this.profile.sendCommand(act).subscribe();
  }

  Chaup(){
    const act = this.generateReq(this.selectedTv.ChaUp);
    this.profile.sendCommand(act).subscribe();
  }

  Chadown(){
    const act = this.generateReq(this.selectedTv.ChaDown);
    this.profile.sendCommand(act).subscribe();
  }

  scheduleDate() {
    this.dialog.open(ScheDateComponent, {data: {
      tv: this.selectedTv,
      num: this.selectedTv.Numbers.length
    }});
  }

  fav() {
    this.dialog.open(FavoritesComponent, {data: {fav: this.favorites}});
  }

  showFav() {
    let channel: number | undefined;
    channel = this.favorites.shift();

    if (channel !== undefined) {
      this.favorites.push(channel);

      this.profile.FavCommand(new Fav(this.selectedTv, channel)).subscribe();
    }

  }

}