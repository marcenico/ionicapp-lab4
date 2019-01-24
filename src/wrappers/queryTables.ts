export class queryTables {
  public static tables: string[] =
    [

      `CREATE TABLE IF NOT exists rubro(
      id int(10) NOT NULL,
      codigo varchar(45) NOT NULL,
      denominacion varchar(45) NOT NULL,
      created_at timestamp NULL DEFAULT NULL,
      updated_at timestamp NULL DEFAULT NULL,
      rubro_padre_id int(10) DEFAULT NULL,
      PRIMARY KEY(id),
      CONSTRAINT rubro_padre_id FOREIGN KEY(rubro_padre_id) REFERENCES rubro(id) ON DELETE NO ACTION ON UPDATE NO ACTION
    )

    CREATE TABLE IF NOT exists articulo(
      id int(10) NOT NULL,
      denominacion varchar(45) NOT NULL,
      codigo varchar(45) NOT NULL,
      precio_compra double NOT NULL,
      precio_venta double NOT NULL,
      iva double NOT NULL,
      created_at timestamp NULL DEFAULT NULL,
      updated_at timestamp NULL DEFAULT NULL,
      rubro_id int(10) NOT NULL,
      PRIMARY KEY(id),
      CONSTRAINT rubro_id FOREIGN KEY(rubro_id) REFERENCES rubro(id) ON DELETE CASCADE
    )

     CREATE TABLE IF NOT exists domicilio(
      id int(10) NOT NULL,
      calle varchar(45) NOT NULL,
      numero varchar(45) NOT NULL,
      localidad varchar(45) NOT NULL,
      latitud decimal(10, 8) NOT NULL,
      longitud decimal(11, 8) NOT NULL,
      created_at timestamp NULL DEFAULT NULL,
      updated_at timestamp NULL DEFAULT NULL,
      PRIMARY KEY(id)
    )

      CREATE TABLE IF NOT exists cliente(
      id int(10) NOT NULL,
      razon_social varchar(45) NOT NULL,
      cuit varchar(45) NOT NULL,
      saldo double DEFAULT '0',
      domicilio_id int(10) NOT NULL,
      PRIMARY KEY(id),
      CONSTRAINT domicilio_id FOREIGN KEY(domicilio_id) REFERENCES domicilio(id) ON UPDATE CASCADE
    )

      CREATE TABLE IF NOT exists pedidoventa(
      id int(10) NOT NULL,
      nro_pedido double NOT NULL,
      fecha_pedido datetime NOT NULL,
      fecha_estimada_entrega datetime DEFAULT NULL,
      gastos_envio double NOT NULL,
      estado varchar(45) NOT NULL,
      entregado tinyint(1) NOT NULL,
      sub_total double NOT NULL,
      monto_total double NOT NULL,
      migrado tinyint(1) NOT NULL,
      cliente_id int(10) NOT NULL,
      domicilio_id int(10) NOT NULL,
      PRIMARY KEY(id),
      CONSTRAINT cliente_id FOREIGN KEY(cliente_id) REFERENCES cliente(id) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT domiicilio_id FOREIGN KEY(domicilio_id) REFERENCES domicilio(id)
    )

      CREATE TABLE IF NOT exists pedidoventadetalle(
      id int(10) NOT NULL,
      cantidad int(11) NOT NULL DEFAULT '1',
      sub_total double NOT NULL,
      porcentaje_descuento double NOT NULL,
      articulo_id int(10) NOT NULL,
      pedido_venta_id int(10) NOT NULL,
      PRIMARY KEY(id),
      CONSTRAINT articulo_id FOREIGN KEY(articulo_id) REFERENCES articulo(id) ON DELETE NO ACTION ON UPDATE CASCADE,
      CONSTRAIN Tpedido_venta_id FOREIGN KEY(pedido_venta_id) REFERENCES pedidoventa(id) ON DELETE CASCADE ON UPDATE CASCADE
    )`



    ]
}



