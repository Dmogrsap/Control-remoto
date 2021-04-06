import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';

import { User } from '../models/user.models';
import { ProfileService } from '../profile/profile.service';
import { NodeService } from '../node/node.service';
import { Tv } from '../models/devices.models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  providers:[ProfileService],
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  dataUser: User = new User();
  
  constructor(
    private router:Router,
    private profileService:ProfileService,
    private nodeService:NodeService) { }

  ngOnInit(): void {
    
    this.profileService.getDevices().subscribe(data => {
      this.dataUser.Devices = data["devices"];
      this.dataUser.Favorites = data["favorites"];

      if(this.dataUser.Devices.Tv === undefined) {
        this.dataUser.Devices.Tv = Array<any>();
      }

    });

  }

  changeName(tv: Tv) {
    this.nodeService.loadCommands(tv);
    this.nodeService.changeData(tv.Name);
    this.nodeService.loadFavorites(this.dataUser.Favorites);
  }

}
