import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent {

  UsuarioArray : any[] = [];
  isResultLoaded = false;

  nombre: string ="";
  curp: string ="";
  correo_electronico: string ="";
  id = "";

  constructor(private http: HttpClient )
  {
    this.getAllUsuario();
  }

  getAllUsuario()
  {
    this.http.get("http://127.0.0.1:8000/api/usuarios")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData);
        this.UsuarioArray = resultData;
    });
  }

  register()
  {
    let bodyData = {
      "nombre" : this.nombre,
      "curp" : this.curp,
      "correo_electronico" : this.correo_electronico
    };

    this.http.post("http://127.0.0.1:8000/api/usuarios", bodyData, {responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Usuario registrado exitósamente");
        this.getAllUsuario();
        this.nombre = '';
        this.curp = '';
        this.correo_electronico = '';
    });
  }

  setUpdate(data: any)
  {
   this.nombre = data.nombre;
   this.curp = data.curp;
   this.correo_electronico = data.correo_electronico;
   this.id = data.id;
  }

  updateRecords()
  {
    let bodyData = {
      "nombre" : this.nombre,
      "curp" : this.curp,
      "correo_electronico" : this.correo_electronico,
    };

    this.http.put("http://127.0.0.1:8000/api/usuarios/" + this.id, bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Usuario actualizado");
        this.getAllUsuario();
    });
  }

  save()
  {
    if(this.id === '')
    {
        this.register();
    }
    else
    {
       this.updateRecords();
    }
  }

  setDelete(data: any)
  {
    this.http.delete("http://127.0.0.1:8000/api/usuarios/" + data.id, {responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Usuario eliminado");
        this.getAllUsuario();
        this.nombre = '';
        this.curp = '';
        this.correo_electronico = '';
    });
  }
}
