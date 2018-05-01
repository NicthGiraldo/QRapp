import { Injectable } from '@angular/core';
import { ScanData } from '../../models/scan-data.model';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ModalController, Platform, ToastController } from 'ionic-angular';//se esta libreria para los toast o notificaciones emergentes
import { MapaPage } from '../../pages/mapa/mapa';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';

@Injectable()
export class HistorialProvider {

  private _historial:ScanData[] = [];//se crea un array vacio para guardar la informacion de tipo ScanData
//se incluye "private iab: InAppBrowser" en el constructor para implementarlo en la pagina
//se inyectan todas las importaciones de librerias
  constructor(private iab: InAppBrowser,
              private modalCtrl: ModalController, 
              private contacts: Contacts, 
              private platform:Platform,
              private toastCtrl:ToastController,
              private emailComposer: EmailComposer) {
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
        this.crearContacto( scanData.info );//se coloca la condicion si se crea el contacto
      break;

      case "email":
        let htmlLink =  scanData.info;

        htmlLink = htmlLink.replace("MATMSG:TO:","mailto:");
        htmlLink = htmlLink.replace(";SUB:","?subject=");
        htmlLink = htmlLink.replace(";BODY:","&body=");
        htmlLink = htmlLink.replace(";;","");
        htmlLink = htmlLink.replace(/ /g,"%20");

        console.log(htmlLink);
        this.iab.create( htmlLink, "_system" );

      break;

      default:
      console.error("tipo no soportado");
    }
  }


  private crearContacto(texto:string){
    /*en crear contacto se esta recibiendo un texto que es el escaneo (siempre es un string)
    se crea una variable "campos" de tipo "any" para que no presente problemas a la hora de buscar en la 
    informacion traida por el escaneo
     */
    let campos:any = this.parse_vcard(texto);//aqui se llama a la funsion "parse_vcard" que fue facilitada por el curso
    console.log(campos);
    let nombre = campos['fn'];//se esta buscando el nombre despues de desfragmentada la informacion del escaneo
    let telefono = campos.tel[0].value[0];//se busca el telefono en la informacion traida por "parse_vcard"
    //hay que tener en cuenta que la funsion "parse_vcard" fragmenta la informacion y la almacena en varios arrays
    //esto es por si estamos emulando en la computadora, ya que al ser emulado no se puede crear el contacto
    if(!this.platform.is('cordova')){
      console.warn("no se puede crear el contacto en la computadora");
      return;
    }
//se crea el contacto de la siguiente manera trayendo los objetos de la libreria "'@ionic-native/contacts"
//se crea la variable y se le asigna la creacion del contacto
    let contact: Contact = this.contacts.create();
    contact.name = new ContactName(null, nombre);//se trae la propiedad de "contact" "name" y se crea el nuevo nombre
    //el nuevo nombre es el que se guardará en los contactos del telefono, la propiedad "nombre" es la extraida 
    //del array creado por la funsion "parse_vcard"
    contact.phoneNumbers = [new ContactField('Mobile', telefono)];//el mismo metodo usado para extraer el nombre
    //es usado para el numero de telefono, y se extrae igualando la variable creada en la parte de arriba 
    //con el metodo "save" se guarda la informacion especificada en el dispositivo
    //el metodo "then" es una condicional interna que permite mostrar una notificacion si se guardo o no el contacto
    contact.save().then(
      ()=> this.crearToast("contacto "+nombre+" creado!"),
      (error) => this.crearToast("error: "+error)
    );
  }
//se crea el metodo crearToast para asignar como se mostrara la notificacion ademas de la duracion del mensaje y
//la posicion, se debe tener en cuenta que para que se muestre se debe colocar el metodo "present()"
//de lo contrario no se mostrará, esta funsion tambien debe de aplicarse a las paginas modals
//se tiene que importar la libreria "ToastController"
  private crearToast( mensaje:string ){
    this.toastCtrl.create({
      message: mensaje,
      duration: 2500,
      position: 'middle'
    }).present();
  }
//toda la siguiente funsion se encarga de fragmentar la informacion traida por el scan 
//la funsion fue proporsionada por el instructor de Udemy, simplifico su uso sin dar detalle de que o como hacia
//el proceso de conversion de informacion
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
