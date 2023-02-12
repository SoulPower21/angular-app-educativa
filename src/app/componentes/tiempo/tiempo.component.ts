import { TemperaturaService } from 'src/app/services/temperatura.service';
import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import {Validators} from '@angular/forms'

@Component({
  selector: 'app-tiempo',
  templateUrl: './tiempo.component.html',
  styleUrls: ['./tiempo.component.css']
})
export class TiempoComponent {

  formulario!: FormGroup;
  tiempo: any;
  name: any;
  temperatura: any;
  humedad: any;
  latitud: any;
  longitud: any;
  descripcion: any;

  muestraError: boolean=false;
  mensajeError: string='';

  //Nos devuelve la fecha actual
  fecha=new Date()

  constructor(private fb: FormBuilder, private _tiempo: TemperaturaService){
    this.iniciaFormulario()
  }

  //Método que crea e inicia un formulario
  iniciaFormulario(){
    this.formulario=this.fb.group({
      ciudad:['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      codigo: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]]
    })
  }
  consultar(){
    console.log("Formulario: ", this.formulario);

    this._tiempo.getEstadoTiempo(this.formulario!.get('ciudad')!.value, this.formulario!.get('codigo')!.value)
      .subscribe(respuesta=>{

        //El error se vuelve false
        this.muestraError=false

        this.tiempo=respuesta;
        this.name=this.tiempo.name;
        this.temperatura=this.tiempo.main.temp;
        this.humedad=this.tiempo.main.humidity;
        this.latitud=this.tiempo.coord.lat;
        this.longitud=this.tiempo.coord.lon;
        this.descripcion=this.tiempo.weather[0].description;
        console.log("respuesta: ",respuesta);
      },
      error =>{
        this.muestraError= true
        this.mensajeError="Error al consultar el tiempo. Intentelo nuevamente!!"
      })
  }
}
