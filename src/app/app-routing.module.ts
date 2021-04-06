import { NgModule } from '@angular/core';
import { userComponent } from './user/user.component'
import { profileComponent } from './profile/profile.component'
import { MenuComponent } from './menu/menu.component'
import { TvComponent } from './tv/tv.component'
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { NewDeviceComponent } from './new-device/new-device.component';
import { Routes, RouterModule, Router } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '', component: InicioComponent,pathMatch: 'full'},
  {path: 'login', component: userComponent},
  {path: 'profile', component: profileComponent, children: [
    {path: 'menu', component: MenuComponent, outlet: 'secondRouter',  data:{animationState: 'one'}},
    {path: 'tv', component: TvComponent, outlet: 'secondRouter', data:{animationState: 'two'}},
    {path: 'add', component: NewDeviceComponent, outlet: 'secondRouter', data:{animationState: 'two'}}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }