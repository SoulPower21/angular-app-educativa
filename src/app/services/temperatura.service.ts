import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const urlBase='http://api.openweathermap.org/data/2.5/weather'
const appId='6e2dd63d292ded7fa866b1937251acd9'

@Injectable({
  providedIn: 'root'
})
export class TemperaturaService {

  constructor(private http:HttpClient) {
  }

    getEstadoTiempo(ciudad: string, codigo: string){
      const url=`${urlBase}?q=${ciudad},${codigo}&appid=${appId}`
      return this.http.get(url)
   }
}

