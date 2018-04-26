import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scan-data.model';

@Injectable()
export class HistorialProvider {

  private _historial:ScanData[] = [];

  constructor() {
  }
//se crea la funcion para guardar en el array 
  agregarHistorial( texto:string ){
    let data = new ScanData( texto );//"ScanData( texto )" esto es una instancia de ScanData, que recibe un parametro tipo string
    this._historial.unshift( data );//con esto se guarda la informacion en primer lugar, mostrando las cosas 
    //primero el dato mas nuevo 
    console.log( this._historial );
  }

  cargarHistorial(){
    return this._historial;
  }

}
