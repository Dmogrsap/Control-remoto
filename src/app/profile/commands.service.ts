import { Injectable } from '@angular/core';
import { User } from '../models/user.models';
import { ProfileService } from './profile.service';
import { Tv, MediaPlayer } from '../models/devices.models';
import { DeviceInfo } from './InfoDevice';
import { SuccessCommand } from './profile.interceptor.service';

@Injectable()
export class Commands {
    command: any;

    constructor(private profileService:ProfileService, private sucess: SuccessCommand) {}

    newComm(act: any) {
        return this.profileService.newCommand(act)
    }

    async captureTv(num: boolean) {
        const deviceAction: DeviceInfo = {Capture: 1, Addr: 0, Protocol: 0, Command: 0};
        let device = new Tv();

        this.command = await this.newComm(deviceAction);
        device["Protocol"] = this.command.info["protocol"];
        device["Addres"] = this.command.info["addr"];
        device["OnOff"] = this.command.info["command"];

        this.command = await this.newComm(deviceAction);
        device["VolUp"] = this.command.info["command"];

        this.command = await this.newComm(deviceAction);
        device["VolDown"] = this.command.info["command"];

        this.command = await this.newComm(deviceAction);
        device["ChaUp"] = this.command.info["command"];

        this.command = await this.newComm(deviceAction);
        device["ChaDown"] = this.command.info["command"];

        if(num) {

            for(let i = 0; i < 10; i++) {
              this.command = await this.newComm(deviceAction);
              device["Numbers"][i] = this.command.info["command"];
            }

        }

        return device;
    }
    
}