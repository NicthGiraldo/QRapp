import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scan-data.model';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ModalController, Platform } from 'ionic-angular';//se esta libreria para el modals
import { MapaPage } from '../../pages/mapa/mapa';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

@Injectable()
export class HistorialProvider {

  private _historial:ScanData[] = [];//se crea un array vacio para guardar la informacion de tipo ScanData
//se incluye "private iab: InAppBrowser" en el constructor para implementarlo en la pagina
  constructor(private iab: InAppBrowser,
              private modalCtrl: ModalController, 
              private contacts: Contacts, 
              private platform:Platform) {
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
      break;
//se coloca el caso "mapa" que se determino en "scan-data.model.ts"
      case "mapa":
      //el mapa se muestra en un modal mandando las coordenadas "coords" y el la info para guardar la informacion
      //en el array
        this.modalCtrl.create( MapaPage, { coords: scanData.info } ).present();//se tiene que colocar la palabra "present()"
      break;

      case "contacto":
        this.crearContacto( scanData.info );
      break;

      default:
      console.error("tipo no soportado");
    }
  }

  private crearContacto(texto:string){
    let campos:any = this.parse_vcard(texto);
    console.log(campos);
    let nombre = campos['fn'];
    let telefono = campos.tel[0].value[0];
    if(!this.platform.is('cordova')){
      console.warn("no se puede crear el contacto en la computadora");
      return;
    }

    let contact: Contact = this.contacts.create();
    contact.name = new ContactName()
  }

  private parse_vcard( input:string ) {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
        var results, key;

        if (Re1.test(line)) {
            results = line.match(Re1);
            key = results[1].toLowerCase();
            fields[key] = results[2];
        } else if (Re2.test(line)) {
            results = line.match(Re2);
            key = results[1].replace(ReKey, '').toLowerCase();

            var meta = {};
            results[2].split(';')
                .map(function (p, i) {
                var match = p.match(/([a-z]+)=(.*)/i);
                if (match) {
                    return [match[1], match[2]];
                } else {
                    return ["TYPE" + (i === 0 ? "" : i), p];
                }
            })
                .forEach(function (p) {
                meta[p[0]] = p[1];
            });

            if (!fields[key]) fields[key] = [];

            fields[key].push({
                meta: meta,
                value: results[3].split(';')
            })
        }
    });

    return fields;
  };

  cargarHistorial(){
    return this._historial;
  }

}
