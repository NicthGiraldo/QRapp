import { Component } from '@angular/core';
//plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//componentes
import { ToastController, Platform } from 'ionic-angular';//se importa el modulo 'Platform'
//servicios
import { HistorialProvider } from '../../providers/historial/historial'//se importa el provider creado 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner,
              private toastCtrl: ToastController,
              private platform: Platform,
              private _historialProvider: HistorialProvider) {
//se agregan las variables para Platform y HistorialProvider
  }

  scan() {
    console.log("Realizando scan...");
//aqui se pregunta "si cordova esta en ejecucion" si es cierto es porque estamos en un dispositivo movil
//de no ser asi se esta ejecutando la aplicacion en el navegador web
/*si se ejecuta en el navegador se le manda informacion falsa al array creado en "historial.ts" */
    if (!this.platform.is('cordova')) {
      //this._historialProvider.agregarHistorial("http://google.com");//se llama la funcion de "historial.ts"
      //this._historialProvider.agregarHistorial("geo: 40.46366700000001, -3.7492200000000366");//se manda informacion simulando el  
      //scan del dispositivo
      //se manda el string que pide el metodo "agregarHistorial" esto es solo un ejemplo de lo que resibe
      //la camara cuando scanea un codigo qr vcard
      /*this._historialProvider.agregarHistorial( `BEGIN:VCARD
VERSION:2.1
N:Kent;Clark
FN:Clark Kent
ORG:
TEL;HOME;VOICE:12345
TEL;TYPE=cell:67890
ADR;TYPE=work:;;;
EMAIL:clark@superman.com
END:VCARD` );*/
      this._historialProvider.agregarHistorial("MATMSG:TO:nicth.giraldo@hotmail.com;SUB:primer mensaje;BODY:esto es mi primer mensaje enviado desde una app de ionic;;");
      return;
    }
//se trae toda la informacion de "barcodeData" y se muestra parte por parte para poder verla en la consola
    this.barcodeScanner.scan().then(barcodeData => {
      console.log("Result: ", barcodeData.text);
      console.log("Format: ", barcodeData.format);
      console.log("Cancelled: ", barcodeData.cancelled);
      //se condiciona la informacion traida por el scaneo y si no se cancelo y text es diferente de null
      //se llamara la funcion "agregarHistorial" creada en "historial.ts"
      if( barcodeData.cancelled == false && barcodeData.text != null){
        this._historialProvider.agregarHistorial(barcodeData.text)
      }
      
    }).catch(err => {
      console.log('Error: ', err);
      this.mostrarError('Error: '+err)
    });
  }

  mostrarError(mensaje:string, posicion:string = "top"){

    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2500,
      position: posicion
    });
    toast.present();

  }

}
