import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
/**
AIzaSyB3NVR0cY4ZVrIQtDvh-459ppCXVuXpNxA
 */

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
//creamos las dos variables que se especifican en la pagina
  lat: number;
  lng: number;
//en el constructor se inicializan con valores predeterminados
  constructor( public navParams: NavParams) {
    this.lat = 6.3009426;
    this.lng = -75.5687365;
  }

}
