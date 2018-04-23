import { Component } from '@angular/core';
//plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//componentes
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor( private barcodeScanner: BarcodeScanner, private toastCtrl: ToastController ) {

  }

  scan() {
    console.log("Realizando scan...");
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('data del scan ', barcodeData);
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
