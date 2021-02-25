import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]

  
})
export class LoginComponent {

  optionsForm = new FormGroup({
    email: new FormControl('', Validators.required),
    contraseña: new FormControl('', Validators.required),
});

submit() {
    console.log(this.optionsForm.get('email')?.value)
    console.log(this.optionsForm.get('contraseña')?.value)
}
  email: string | undefined;
  password: string | undefined;

  constructor() {}

  login() {
    console.log(this.email);
    console.log(this.password);
  }
}
