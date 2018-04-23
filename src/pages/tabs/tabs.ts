import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { HomePage, GuardadosPage } from '../index.paginas';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  scan:any;
  hitorial:any;
  constructor() {
    this.scan = HomePage;
    this.hitorial = GuardadosPage;
  }

}
