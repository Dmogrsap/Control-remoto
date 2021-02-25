import { Component } from '@angular/core';
import { producto } from '../producto.model';

@Component({
    selector: 'app-producto',
    templateUrl: './producto.component.html',
    styleUrls: ['../app.component.css']
})

export class productoComponent{
    Object =
       {
          id:"1",
          title:"Control Remoto",
          descripcion:"Maneja tu tv con mayor facilidad y destreza con nuestro nuevo control",
          //precio: 450,
          imagen:'assets/images/control.png'
        };
}

