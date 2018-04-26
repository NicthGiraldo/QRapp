import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scan-data.model';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Injectable()
export class HistorialProvider {

  private _historial:ScanData[] = [];//se crea un array vacio para guardar la informacion de tipo ScanData
//se incluye "private iab: InAppBrowser" en el constructor para implementarlo en la pagina
  constructor(private iab: InAppBrowser) {
  }
//se crea la funcion para guardar en el array 
  agregarHistorial( texto:string ){
    let data = new ScanData( texto );//"ScanData( texto )" esto es una instancia de ScanData, que recibe un parametro tipo string
    this._historial.unshift( data );//con esto se guarda la informacion en primer lugar, mostrando las cosas 
    //primero el dato mas nuevo 
    console.log( this._historial );
    this.abrirScan(0);
  }
//se crea la funsion abrirScan que recibe un parametro de tipo number que indica el indice del array
  abrirScan(index:number){
    let scanData = this._historial[index];//se le asigna el indice recibido a el array que se creo anteriormente
    console.log(scanData);//mostramos lo que se recibe en consola
    //si el scanData.tipo es "http" se utiliza el iab.create para dirigir a la pagina recibida como escaneo 
    switch(scanData.tipo){
      case "http":
      this.iab.create(scanData.info, "_system");
      break

      default:
      console.error("tipo no soportado");
    }
  }

  cargarHistorial(){
    return this._historial;
  }

}
