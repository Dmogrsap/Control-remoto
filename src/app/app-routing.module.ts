import { NgModule } from '@angular/core';
import { userComponent } from './user/user.component'
import { profileComponent } from './profile/profile.component'
import { AppComponent } from './app.component';
import { Routes, RouterModule, Router } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: 'login', component: userComponent},
  {path: 'profile', component: profileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }