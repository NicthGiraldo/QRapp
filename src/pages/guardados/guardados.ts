import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { HistorialProvider } from '../../providers/historial/historial';
import { ScanData } from '../../models/scan-data.model';

@IonicPage()
@Component({
  selector: 'page-guardados',
  templateUrl: 'guardados.html',
})
//la idea principal es que se cree una lista en donde no solo se muestre la informacion, si no tambien,
//dar click y que redirecciones de nuevo las paginas guardadas 
export class GuardadosPage {

  historial:ScanData[] = [];//se crea otro array para poder utilizar la informacion recibida

//se agrega el servicio
  constructor(private _historialProvider:HistorialProvider) {
  }
//esta funsion se activa cuando la pagina carga, y lo que hace ahora es mostrar la lista que se genere para el 
//historial
  ionViewDidLoad() {
    this.historial = this._historialProvider.cargarHistorial();
  }
//para abrir lo escaneado mandamos el index a _historialProvider que es nuestro servicio
  abrirScan( index:number ){
    this._historialProvider.abrirScan( index );
  }

}
