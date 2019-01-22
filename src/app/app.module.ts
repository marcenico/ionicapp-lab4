import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//#region PAGES
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ClientePage } from '../pages/cliente/cliente';
//#endregion

//#region PROVIDERS
import { ClienteProvider } from '../providers/providers-cliente/cliente.provider';
//#endregion

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SQLite } from '@ionic-native/sqlite';
import { ClienteApi, SDKModels, InternalStorage, LoopBackAuth, PedidoventadetalleApi, ArticuloApi, RubroApi, PedidoventaApi, UsuariosApi, DomicilioApi } from './shared/sdk';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ClientePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ClientePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SQLite,
    ClienteProvider,
    DomicilioApi, UsuariosApi, ClienteApi, PedidoventaApi, RubroApi, ArticuloApi, PedidoventadetalleApi,
    HttpClientModule, SDKModels, InternalStorage, LoopBackAuth
  ]
})
export class AppModule { }
