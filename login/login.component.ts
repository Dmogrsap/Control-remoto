import { Component } from "@angular/core";
import { FormsModule } from '@angular/forms';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  email: string | undifined;
  password: string | undifined;

  constructor() {}

  login() {
    console.log(this.email);
    console.log(this.password);
  }
}
