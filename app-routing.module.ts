import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { productoComponent} from "./producto/producto.Component";
import { index2Component } from './index2/index2.component';
import { portadacomponent } from './portada/portada.component';

const routes: Routes = [
  
    { path: "", component: AppComponent, pathMatch: "full" },
    { path: "index2", component: index2Component, pathMatch: "full" },
    { path: "login", component: LoginComponent, pathMatch: "full" },
    { path: "register", component: RegisterComponent, pathMatch: "full" },
    { path: "producto", component: productoComponent, pathMatch: "full" },
    { path: "portada", component: portadacomponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


