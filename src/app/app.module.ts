import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage, GuardadosPage, MapaPage, TabsPage } from '../pages/index.paginas';

//plugins,todos los plugins al ser solamente recursos para la app se agregan plenamente en "providers" ya que no
//son paginas si no elementos que se utilizaran de librerias importadas en donde se necesitan 
import { BarcodeScanner } from '@ionic-native/barcode-scanner'; 
import { HistorialProvider } from '../providers/historial/historial';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Contacts } from '@ionic-native/contacts';

//mapas
//se importa esta libreria y se coloca en los "imports" lo que figura en la pagina para igresar nuestra api-key
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GuardadosPage,
    MapaPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB3NVR0cY4ZVrIQtDvh-459ppCXVuXpNxA'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GuardadosPage,
    MapaPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    InAppBrowser,
    Contacts,
    HistorialProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
