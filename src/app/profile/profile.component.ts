import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { ProfileService } from './profile.service';
import { NodeService } from '../node/node.service';
import { routeTransitionAnimations } from '../anim/route-transition-animations'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers:[ProfileService, NodeService],
  styleUrls: ['./profile.component.css'],
  animations: [routeTransitionAnimations]
})

export class profileComponent implements OnInit {
  nameDev: string = "";

  constructor(
    private router:Router,
    private nodeService:NodeService) {}

    ngOnInit() {
      if (localStorage.getItem("user_remo") === null
        || localStorage.getItem("user_remo") === undefined
        || localStorage.getItem("user_remo") === "undefined") {
        this.router.navigate([''])
        return
      }

      this.nodeService.data$.subscribe(res => this.nameDev = res)
      this.router.navigate(['/profile', { outlets: { 'secondRouter': ["menu"] } }])
    }

    /*changeDevice(e: any) {
      this.optionsForm.get('type')?.setValue(e.target.value, {
        onlySelf: true
      })
    }*/

    changeNameDev() {
      this.nameDev = "Seleccione un dispositivo";
    }

    prepareRoute(outlet: RouterOutlet) {
      return outlet && 
        outlet.activatedRouteData && 
        outlet.activatedRouteData['animationState'];
    }
}