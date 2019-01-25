import { Component } from '@angular/core';
import { PedidoPage } from '../pedido/pedido';
import { ClientePage } from '../cliente/cliente';
import { ArticuloPage } from '../articulo/articulo';
import { RubroPage } from '../rubro/rubro';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ClientePage;
  tab3Root = ArticuloPage;
  tab4Root = RubroPage;

  constructor() {

  }
}
