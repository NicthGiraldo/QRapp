import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
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
//se asignan las variables para manejar los controladores
  constructor( public navParams: NavParams, private viewCtrl: ViewController) {
    //this.lat = 6.3009426;
    //this.lng = -75.5687365;
//se crea un array que reciba los parametros traidos desde "historial.ts" en el caso de "mapa"
    let coordsArray = this.navParams.get("coords").split(",");//el split separa la informacion teniendo como base la ","
    //que es (info condicional no corroborada) un acaracter clave que identifica que en esa parte se dividira la info

    this.lat = Number(coordsArray[0].replace("geo:",""));//al ser dividido se le asigna la primera parte a la 
    //latitud y se le agrega la palabra "geo:" simulando la informacion recibida por la cam en el dispositivo
    this.lng = Number(coordsArray[1]);//se le asigan a la longitud el valor restante de la division

    console.log(this.lat, this.lng);//se muestran en pantalla las lontitudes y latitudes recibidas
  }

  cerrarModal(){
    this.viewCtrl.dismiss();//se usa para cerrar el modal 
  }

}
