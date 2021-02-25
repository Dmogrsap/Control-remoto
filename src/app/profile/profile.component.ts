import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProfileService } from './profile.service';
import { SuccessCommand } from './profile.interceptor.service'
import { Commands } from './commands.service';
import { DeviceInfo } from './InfoDevice';
import { Tv, MediaPlayer } from '../models/devices.models';
import { User } from '../models/user.models';
import { HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers:[ProfileService, SuccessCommand, Commands]
})

export class profileComponent implements OnInit {
  isValidFormOptions: boolean = false;
  ready: boolean = false;

  feedbackMessages: string[] = ['', '', '', '', '', ''];
  devUser!: any; // Mas tipos van aqui
  dataUser: User = new User();
  command: any;

  selectedDevice: any;

  optionsForm = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    numbers: new FormControl('', Validators.required)
  });

  deviceForm = new FormGroup({
    devices: new FormControl('', Validators.required),
  });

  devices: any = [
    'Tv',
    'MediaPlayer',
    'MiniSplit',
  ];

  constructor(private router:Router,
    private profileService:ProfileService,
    private commandService:Commands) {
      //this.devUser = {Name:"", Addres:0, Protocol:0, Tv: {OnOff: 0, VolUp:0, VolDown:0, ChaDown:0, ChaUp:0, Numbers:[]} }
  }

    ngOnInit() {
      if (localStorage.getItem("user_remo") === null
        || localStorage.getItem("user_remo") === undefined
        || localStorage.getItem("user_remo") === "undefined") {
        this.router.navigate([''])
        return
      }

      this.profileService.getDevices().subscribe(data => {
          this.dataUser.Devices = data["devices"];
          this.dataUser.Favorites = data["favorites"];

          if(this.dataUser.Devices.Tv === undefined) {
            this.dataUser.Devices.Tv = Array<any>();
          }

          this.ready = true;
      });
    }

    changeDevice(e: any) {
      this.optionsForm.get('type')?.setValue(e.target.value, {
        onlySelf: true
      })
    }

    changeSelectedDevice(e: any) {
      this.deviceForm.get('devices')?.setValue(e.target.value, {
        onlySelf: true
      })
    }

    async submitInfoDevice() {
      const act: DeviceInfo = {Capture: 1, Protocol: 0, Addres: 0, Command: 0};

      const aux = ['Presione la tecla de Encendido',
        'Presione la tecla de subir Volumen',
        'Presione la tecla de bajar Volumen',
        'Presione la tecla para cambiar canal +',
        'Presione la tecla para cambiar canal -',
        'Presione la tecla del numero ',
      ];

      /*const keysDev: string = [
        "Protocol",
        "Addres",
        "OnOff",
        "VolUp",
        "VolDown",
        "ChaUp",
        "ChaDown",
        "Numbers",
      ]*/

      this.isValidFormOptions = false

      if(this.optionsForm.invalid) {
        return
      }

      this.isValidFormOptions = true
      const num: boolean = this.optionsForm.get('numbers')?.value == "Si" ? true : false;
      const name: string = this.optionsForm.get('name')?.value;
      const type: string = this.optionsForm.get('type')?.value;

      if(type == 'Tv') {
        this.devUser = await this.commandService.captureTv();

        /*if(num) {
          for(let i = 0; i < 10; i++) {
            this.feedbackMessages[5] = aux[5] + i;

            this.command = await this.newComm(act);
            this.devUser["Numbers"][i] = this.command.info["command"];
          }
        }*/
        this.devUser["Name"] = name;

        this.dataUser.Devices.Tv.push(this.devUser);
      }

      (await this.profileService.newDevice(this.devUser, type)).subscribe(res => {
        console.log(res)
      });
      
    }

    Onoff(){
      this.selectedDevice = this.dataUser.Devices.Tv.find((sel: any) => 
      sel.Name === this.deviceForm.get('devices')?.value);

      console.log(this.selectedDevice)

      this.profileService.sendCommand({
        capture: 0,
        protocol: this.selectedDevice.Protocol,
        addr: this.selectedDevice.Addres,
        command: this.selectedDevice.OnOff,
      }).subscribe(res => {
        console.log(res)
      })
    }

    /*newComm(act: any) {
      return this.profileService.newCommand(act)
    }*/
}