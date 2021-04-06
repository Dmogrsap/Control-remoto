import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ProfileService } from '../profile/profile.service';
import { Tv, MediaPlayer } from '../models/devices.models';
import { DeviceInfo } from '../profile/InfoDevice';

@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.css']
})
export class NewDeviceComponent implements OnInit {
  devs: string[] = ['Tv', 'Reproductor de Video', 'Otro']
  capture: boolean = false;
  success: boolean = false;
  feedback: string = "";
  command: any;

  devForm = new FormGroup({
    dev: new FormControl('', Validators.required),
    withNumbers: new FormControl(false, Validators.required),
    devname: new FormControl('', Validators.required)
  });

  constructor(private profileService:ProfileService) { }

  ngOnInit(): void {
  }

  newComm(act: any) {
    return this.profileService.newCommand(act)
  }

  async captureDevice() {

    if(this.devForm.invalid) {
      return
    }

    let device: any;
    let type: string = this.devForm.get('dev')?.value;
    const deviceAction: DeviceInfo = {Capture: 1, Addr: 0, Protocol: 0, Command: 0};
    this.capture = true;

    if(type == this.devs[0]) {
      device = new Tv();
      let num = this.devForm.get('withNumbers')?.value;
      device["Name"] = this.devForm.get('devname')?.value;

      this.feedback = "Presiona el botón de encendido";
      this.command = await this.newComm(deviceAction);
      device["Protocol"] = this.command.info["protocol"];
      device["Addres"] = this.command.info["addr"];
      device["OnOff"] = this.command.info["command"];
      await this.reset(1500);

      this.feedback = "Presiona el botón para subir volumen +";
      this.command = await this.newComm(deviceAction);
      device["VolUp"] = this.command.info["command"];
      await this.reset(1500);

      this.feedback = "Presiona el botón para bajar volumen -";
      this.command = await this.newComm(deviceAction);
      device["VolDown"] = this.command.info["command"];
      await this.reset(1500);

      this.feedback = "Presiona el botón para cambiar canal +";
      this.command = await this.newComm(deviceAction);
      device["ChaUp"] = this.command.info["command"];
      await this.reset(1500);

      this.feedback = "Presiona el botón para cambiar canal -";
      this.command = await this.newComm(deviceAction);
      device["ChaDown"] = this.command.info["command"];
      await this.reset(1500);

      if(num) {

        for(let i = 0; i < 10; i++) {
          this.feedback = "Presiona el botón " + i;
          this.command = await this.newComm(deviceAction);
          device["Numbers"][i] = this.command.info["command"];
          await this.reset(1500);
        }

      }
    } else if (type === this.devs[1]) {
      device = new MediaPlayer();
      type = 'Media';
      device["Name"] = this.devForm.get('devname')?.value;

      this.feedback = "Presiona el botón de encendido";
      this.command = await this.newComm(deviceAction);
      device["Protocol"] = this.command.info["protocol"];
      device["Addres"] = this.command.info["addr"];
      device["OnOff"] = this.command.info["command"];
      await this.reset(1500);

      this.feedback = "Presiona el botón para subir volumen +";
      this.command = await this.newComm(deviceAction);
      device["VolUp"] = this.command.info["command"];
      await this.reset(1500);

      this.feedback = "Presiona el botón para bajar volumen -";
      this.command = await this.newComm(deviceAction);
      device["VolDown"] = this.command.info["command"];
      await this.reset(1500);

      this.feedback = "Presiona el botón para reproducir";
      this.command = await this.newComm(deviceAction);
      device["Play"] = this.command.info["command"];
      await this.reset(1500);

      this.feedback = "Presiona el botón para detener";
      this.command = await this.newComm(deviceAction);
      device["Stop"] = this.command.info["command"];
      await this.reset(1500);

      this.feedback = "Presiona el botón para adelantar >";
      this.command = await this.newComm(deviceAction);
      device["SkipR"] = this.command.info["command"];
      await this.reset(1500);

      this.feedback = "Presiona el botón para adelantar <";
      this.command = await this.newComm(deviceAction);
      device["SkipL"] = this.command.info["command"];
      await this.reset(1500);

      this.feedback = "Presiona el botón para ejectar";
      this.command = await this.newComm(deviceAction);
      device["Eject"] = this.command.info["command"];
      await this.reset(1500);
    }

    (await this.profileService.newDevice(device, type)).subscribe();

    this.feedback = "Dispositivo Agregado";
    this.success = true;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async reset(ms: number) {
    this.success = true;
    await this.delay(ms);
    this.success = false;
  }
}
