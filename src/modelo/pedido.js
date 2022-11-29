import conectar from "../config/database.js";

class pedido {
  constructor() {
    this.Id = "";
    this.OP = "";
    this.IdProd = "";
    this.IdCliente = "";
    this.IdEncargado = "";
    this.PedFecha = "";
    this.PedEstado = "";
    this.TallaProd = "";
    this.Plataforma = "";
    this.Taco = "";
    this.Cantidad = "";
    this.Unidad = "";
    this.T34 = "";
    this.T35 = "";
    this.T36 = "";
    this.T37 = "";
    this.T38 = "";
    this.T39 = "";
    this.T40 = "";
    this.dateInit = "";
    this.dateEnd = "";
  }

  ObtenerDatosPedidos() {
    const datos = async () => {
      return await conectar.query(`SELECT pedido.Id as id, pedido.OP as OP,productos.ProdModelo as modelo,clientes.CliNombre as nombre,
            empleado.CodigoTrb as trabajador, pedido.PedFecha as fecha, pedido.PedEstado as estado, pedido.Plataforma as plataforma, pedido.Taco as taco, 
            pedido.Cantidad as cantidad, pedido.Unidad as unidad , pedido.id_talla as talla,talla.T34 as t34, talla.T35 as t35, talla.T36 as t36, talla.T37 as t37, 
            talla.T38 as t38, talla.T39 as t39, talla.T40 as t40 
            FROM pedido 
            LEFT JOIN productos on pedido.IdProd = productos.Id 
            LEFT JOIN clientes on pedido.IdCliente = clientes.Id 
            LEFT JOIN empleado on pedido.IdEncargado = empleado.Id
            LEFT JOIN talla on pedido.id_talla = talla.Id`); //await: atribuye un tiempo de esperar
    };
    return datos();
  }

  createDetail() {
    const add = async () => {
      return await conectar.query(
        `insert into detallepedido (Cantidad, IdPedido,IdProd, IdEncargado, Fecha) values (?,?,?,?,?)`,
        [this.Cantidad, this.Id, this.IdProd, this.IdEncargado, this.PedFecha]
      );
    };
    return add();
  }
  create() {
    const add = async () => {
      return await conectar.query(
        `insert into pedido (OP, IdProd, IdCliente, IdEncargado, 
                PedFecha, PedEstado, Plataforma, Taco, Cantidad, id_Talla) 
            values (?,?,?,?,?,?,?,?,?,?)`,
        [
          this.OP,
          this.IdProd,
          this.IdCliente,
          this.IdEncargado,
          this.PedFecha,
          this.PedEstado,
          this.Plataforma,
          this.Taco,
          this.Cantidad,
          this.TallaProd,
        ]
      );
    };
    return add();
  }

  delete() {
    const borrar = async () => {
      return await conectar.query("delete from pedido where Id = ? ", [
        this.Id,
      ]);
    };
    return borrar();
  }

  update() {
    const actualizar = async () => {
      return await conectar.query(
        `update pedido set OP = ?, IdProd = ?, IdCliente = ?, IdEncargado = ?, PedFecha = ?, PedEstado = ?, id_talla = ?, 
            Plataforma= ?, Taco=?, Cantidad=?, Unidad=? where pedido.Id= ?`,
        [
          this.OP,
          this.IdProd,
          this.IdCliente,
          this.IdEncargado,
          this.PedFecha,
          this.PedEstado,
          this.TallaProd,
          this.Plataforma,
          this.Taco,
          this.Id,
          this.Cantidad,
          this.Unidad,
        ]
      );
    };
    return actualizar();
  }
  updatePedido() {
    const update = async () => {
      return await conectar.query(
        `update pedido set OP = ?, IdProd = ?, IdCliente = ?, IdEncargado = ?, PedFecha = ?, PedEstado = ?, id_talla = ?, Plataforma= ?, Taco=?, Cantidad=?, Unidad=? where Id= ?`,
        [
          this.OP,
          this.IdProd,
          this.IdCliente,
          this.IdEncargado,
          this.PedFecha,
          this.PedEstado,
          this.TallaProd,
          this.Plataforma,
          this.Taco,
          this.Cantidad,
          this.Unidad,
          this.Id,
        ]
      );
    };
    return update();
  }

  ObtenerDatosActualizados() {
    const data = async () => {
      return await conectar.query(
        `SELECT pedido.Id as id, pedido.OP as OP,productos.ProdModelo as modelo, productos.Id as producto_id,clientes.CliNombre as nombre,clientes.Id as idcliente,clientes.CliRuc as ruc,empleado.CodigoTrb as trabajador, empleado.Nombre as Namempleado, empleado.Id as idempleado, pedido.PedFecha as fecha, pedido.PedEstado as estado, pedido.Plataforma as plataforma, pedido.Taco as taco, pedido.Cantidad as cantidad, pedido.Unidad as unidad , pedido.id_talla as talla,talla.T34 as t34, talla.T35 as t35, talla.T36 as t36, talla.T37 as t37, talla.T38 as t38, talla.T39 as t39, talla.T40 as t40 
            FROM pedido 
            LEFT JOIN productos on pedido.IdProd = productos.Id 
            LEFT JOIN clientes on pedido.IdCliente = clientes.Id 
            LEFT JOIN empleado on pedido.IdEncargado = empleado.Id
            LEFT JOIN talla on pedido.id_talla = talla.Id  
            where pedido.Id = ?`,
        [this.Id]
      );
    };
    return data();
  }

  ObtenerBusquedad() {
    const datos = async () => {
      return await conectar.query(`SELECT pedido.Id as id,pedido.OP as OP,productos.ProdModelo as modelo,clientes.CliNombre as nombre,empleado.CodigoTrb as trabajador, 
            pedido.PedFecha as fecha, pedido.PedEstado as estado, pedido.TallaProd as talla, pedido.Plataforma as plataforma, pedido.Taco as taco, 
            pedido.Cantidad as cantidad, pedido.Unidad as unidad 
            FROM pedido 
            INNER JOIN productos on pedido.IdProd = productos.Id 
            INNER JOIN clientes on pedido.IdCliente = clientes.Id 
            INNER JOIN  empleado on pedido.IdEncargado = empleado.Id where OP like '${this.OP}%'`); //await: atribuye un tiempo de esperar
    };
    return datos();
  }

  createtalla() {
    const talla = async () => {
      return await conectar.query(
        "insert into talla (T34,T35,T36,T37,T38,T39,T40) values (?,?,?,?,?,?,?)",
        [this.T34, this.T35, this.T36, this.T37, this.T38, this.T39, this.T40]
      );
    };
    return talla();
  }

  Obtenerultimonitem() {
    const obtalla = async () => {
      return await conectar.query("SELECT MAX(id) as id FROM talla");
    };
    return obtalla();
  }

  updateStatus() {
    const data = async () => {
      return await conectar.query(
        "update pedido set idEncargado = ?, PedEstado = ? where Id = ?",
        [this.IdEncargado, this.PedEstado, this.Id]
      );
    };
    return data();
  }
  getDetailPedido() {
    const obtalla = async () => {
      return await conectar.query(`
      SELECT d.Id as id, pe.OP as pedido, pr.ProdModelo as producto, SUM(d.Cantidad) as cantidad,e.CodigoTrb as empleado, d.Fecha as fecha
      from detallepedido d inner join pedido pe on d.IdPedido=pe.Id
                           inner join productos pr on d.IdProd=pr.Id
                           inner join empleado e on d.IdEncargado=e.Id
      GROUP BY e.CodigoTrb, d.fecha
      `);
    };
    return obtalla();
  }
  getDetailOnePedido() {
    const obtalla = async () => {
      return await conectar.query(
        `
      SELECT d.Id as id, pe.OP as pedido, pr.ProdModelo as producto, SUM(d.Cantidad) as cantidad,e.CodigoTrb as empleado, d.Fecha as fecha
      from detallepedido d inner join pedido pe on d.IdPedido=pe.Id
                           inner join productos pr on d.IdProd=pr.Id
                           inner join empleado e on d.IdEncargado=e.Id
      where pe.OP like '${this.OP}%'
      GROUP BY e.CodigoTrb, d.fecha
      `
      );
    };
    return obtalla();
  }
  getOnePedidoCode() {
    const obtalla = async () => {
      return await conectar.query(
        `
      SELECT d.Id as id, pe.OP as pedido, pr.ProdModelo as producto, d.Cantidad  as cantidad,e.CodigoTrb as empleado,e.Nombre as nombreEmpleado, d.Fecha as fecha, SUM(d.Cantidad) as total,
      CASE
        WHEN DAYNAME(fecha) = 'Monday' THEN 'Lunes'
        WHEN DAYNAME(fecha) = 'Tuesday' THEN 'Martes'
        WHEN DAYNAME(fecha) = 'Wednesday' THEN 'Miercoles'
        WHEN DAYNAME(fecha) = 'Thursday' THEN 'Jueves'
        WHEN DAYNAME(fecha) = 'Friday' THEN 'Viernes'
        WHEN DAYNAME(fecha) = 'Saturday' THEN 'Sabado'
        WHEN DAYNAME(fecha) = 'Sunday' THEN 'Domingo'
        ELSE 'esto no es un mes'
      END AS dia
      from detallepedido d inner join pedido pe on d.IdPedido=pe.Id
                     inner join productos pr on d.IdProd=pr.Id
                     inner join empleado e on d.IdEncargado=e.Id
      where e.CodigoTrb = ? and d.Fecha BETWEEN ? and ?
      GROUP BY d.Fecha
      `,
        [this.IdEncargado, this.dateInit, this.dateEnd]
      );
    };
    return obtalla();
  }
}
export default pedido;
