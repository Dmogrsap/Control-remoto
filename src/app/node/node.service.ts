import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { Tv } from '../models/devices.models';

@Injectable()
export class NodeService {
    private data = new BehaviorSubject('Seleccione un dispositivo');
    data$ = this.data.asObservable();

    private tvuser = new BehaviorSubject(new Tv());
    tvuser$ = this.tvuser.asObservable();

    private userinfo = new BehaviorSubject(Array<number>());
    userinfo$ = this.userinfo.asObservable();
  
    changeData(data: string) {
      this.data.next(data)
    }

    loadCommands(data: Tv) {
      this.tvuser.next(data)
    }

    loadFavorites(data: Array<number>) {
      this.userinfo.next(data)
    }
}