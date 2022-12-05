import pool from "../config/database.js";
import pedido from "../modelo/pedido.js";
import Cliente from "../modelo/cliente.js";
import Empleado from "../modelo/trabajador.js";
import Producto from "../modelo/producto.js";

export const apipedunico = async (req, res) => {
  const { id } = req.body;
  const pedidos = new pedido();
  pedidos.Id = id;
  try {
    const [rows] = await pedidos.ObtenerDatosActualizados();
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const apiProunico = async (req, res) => {
  const { producto } = req.body;
  const productos = new Producto();
  productos.ProdModelo = producto;
  try {
    const [rows] = await productos.ObtenerDatosUnicoProducto();
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const apiTraunico = async (req, res) => {
  const { emple } = req.body;
  const empleados = new Empleado();
  empleados.CodigoTrb = emple;
  try {
    const [rows] = await empleados.ObtenerDatosUnicoEmpleado();
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const apiCliunico = async (req, res) => {
  const { cliente } = req.body;
  const clientes = new Cliente();
  clientes.CliRuc = cliente;
  try {
    const [rows] = await clientes.ObtenerDatosUnicoCliente();
    res.send(rows);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const getPedido = async (req, res) => {
  res.render("pedidos/pedidos");
};

export const ApigetPedido = async (req, res) => {
  const pedidos = new pedido();
  try {
    const [rows] = await pedidos.ObtenerDatosPedidos(); //trae una arreglo de objetos
    res.json(rows);
  } catch (error) {
    res.send(error);
  }
};

export const ApigetPedidoDatos = async (req, res) => {
  const { search } = req.body;
  const pedidos = new pedido();
  pedidos.OP = search;
  try {
    const [rows] = await pedidos.ObtenerBusquedad(); //trae una arreglo de objetos
    res.send(rows);
  } catch (error) {
    res.send(error);
  }
};

export const getAgregar = async (req, res) => {
  res.render("pedidos/agregarpedido");
};

export const add = async (req, res) => {
  const {
    codigo,
    idproducto,
    idcliente,
    idempleado,
    estado,
    serie,
    plataforma,
    taco,
    cantidad,
    t34,
    t35,
    t36,
    t37,
    t38,
    t39,
    t40,
  } = req.body; // destrucctoracion de parametros
  const date = new Date();
  if (
    !idproducto ||
    !idcliente ||
    !estado ||
    !serie ||
    !plataforma ||
    !taco ||
    !cantidad
  ) {
    req.flash("mensaje_error", "Existen campos vacíos en el Formulario");
    res.redirect("/pedidos/agregar");
  } else {
    try {
      const pedidos = new pedido();
      pedidos.OP = !codigo ? null : codigo; // name
      pedidos.IdProd = idproducto;
      pedidos.IdCliente = idcliente;
      pedidos.IdEncargado = !idempleado ? null : idempleado;
      pedidos.PedFecha = date;
      pedidos.PedEstado = "DISEÑADOR";
      pedidos.Plataforma = plataforma.toUpperCase();
      pedidos.Taco = taco;
      pedidos.Cantidad = cantidad;
      pedidos.T34 = t34 != "" ? t34 : null;
      pedidos.T35 = t35 != "" ? t35 : null;
      pedidos.T36 = t36 != "" ? t36 : null;
      pedidos.T37 = t37 != "" ? t37 : null;
      pedidos.T38 = t38 != "" ? t38 : null;
      pedidos.T39 = t39 != "" ? t39 : null;
      pedidos.T40 = t40 != "" ? t40 : null;

      await pedidos.createtalla();
      const [rowsItem] = await pedidos.Obtenerultimonitem();

      let tallas = "";
      rowsItem.map((items) => {
        tallas = items.id;
      });

      pedidos.TallaProd = tallas;
      await pedidos.create();

      req.flash("mensaje_exito", "Creado");
      res.redirect("/pedidos"); // te redireccion a al ruta establecida
    } catch (error) {
      req.flash("mensaje_error", "Error");
      console.log(error);
      res.redirect("/pedidos/agregar");
    }
  }
};

export const borrar = async (req, res) => {
  const { id } = req.params; //ruta
  const pedidos = new pedido();
  try {
    pedidos.Id = id;
    await pedidos.delete();
    req.flash("mensaje_exito", "Se borro Correctamente");
    res.redirect("/pedidos"); // principal
  } catch (error) {
    console.log(error);
  }
};

export const VistaActualizar = async (req, res) => {
  const pedidos = new pedido();
  const clientes = new Cliente();
  const productos = new Producto();
  const empleados = new Empleado();

  pedidos.Id = req.params.id;
  const [rows] = await pedidos.ObtenerDatosActualizados();

  const Pedidos = {
    id: "",
    codigo: "",
    producto: "",
    cliente: "",
    empleado: "",
    fecha: "",
    estado: "",
    talla: "",
    plataforma: "",
    taco: "",
    ruc: "",
    modelo: "",
    trabajador: "",
    idcliente: "",
    idproducto: "",
    idempleado: "",
    cantidad: "",
    unidad: "",
  };

  rows.map((item) => {
    Pedidos.id = item.id;
    Pedidos.codigo = item.OP; // name
    Pedidos.fecha = item.fecha;
    Pedidos.estado = item.estado;
    Pedidos.talla = item.talla;
    Pedidos.plataforma = item.plataforma;
    Pedidos.taco = item.taco;
    Pedidos.ruc = item.ruc;
    Pedidos.modelo = item.modelo;
    Pedidos.trabajador = item.trabajador;
    Pedidos.cliente = item.nombre;
    Pedidos.idcliente = item.idcliente;
    Pedidos.empleado = item.Namempleado;
    Pedidos.idempleado = item.idempleado;
    Pedidos.idproducto = item.producto_id;
    Pedidos.cantidad = item.cantidad;
    Pedidos.unidad = item.unidad;
  });

  let nameTalla = Pedidos.talla == 22422 ? "Estándar" : "Especial";

  res.render("pedidos/actualizarpedido", { Pedidos, nameTalla });
};

export const update = async (req, res) => {
  const {
    codigo,
    idproducto,
    idcliente,
    idempleado,
    estado,
    serie,
    plataforma,
    taco,
    cantidad,
    unidad,
  } = req.body;
  const date = new Date();
  if (
    !idproducto ||
    !idcliente ||
    !serie ||
    !plataforma ||
    !taco ||
    !cantidad ||
    !unidad
  ) {
    req.flash("mensaje_error", "Existen campos vacíos en el Formulario");
    res.redirect(`/pedidos/actualizar/${req.params.id}`); // get
  } else {
    try {
      const pedidos = new pedido();
      pedidos.OP = codigo; // name
      pedidos.IdProd = idproducto;
      pedidos.IdCliente = idcliente;
      pedidos.IdEncargado = !idempleado ? null : idempleado;
      pedidos.PedFecha = date;
      pedidos.PedEstado = estado;
      pedidos.TallaProd = serie;
      pedidos.Plataforma = plataforma;
      pedidos.Taco = taco;
      pedidos.Cantidad = cantidad;
      pedidos.Unidad = unidad;
      pedidos.Id = req.params.id;
      await pedidos.updatePedido();

      req.flash("mensaje_exito", "Actualización Exitosa");
      res.redirect("/pedidos"); // te redireccion a al ruta establecida
    } catch (error) {
      req.flash("mensaje_error", "Error");
      console.log(error);
      res.redirect(`/pedidos/actualizar/${req.params.id}`);
    }
  }
};

export const endProccess = async (req, res) => {
  let name = "";
  let action = true;
  const pedidos = new pedido();
  const [status] = await pool.query(
    "select PedEstado from pedido where Id = ?",
    [req.params.id]
  );
  const [rows] = await pool.query("select * from pedido where Id = ?", [
    req.params.id,
  ]);

  if (status[0].PedEstado == "DISEÑADOR") {
    name = "DESPACHO";
    action = false;
  }
  if (status[0].PedEstado == "DESPACHO") {
    name = "PERFILADOR";
  }
  if (status[0].PedEstado == "PERFILADOR") {
    name = "ENSUELADOR";
  }
  if (status[0].PedEstado == "ENSUELADOR") {
    name = "ALISTADO";
    action = false;
  }
  if (status[0].PedEstado == "ALISTADO") {
    name = "COMPLETADO";
  }
  if (status[0].PedEstado == "COMPLETADO") {
    name = "COMPLETADO";
    action = false;
  }
  try {
    if (action) {
      pedidos.Cantidad = rows[0].Cantidad;
      pedidos.Id = rows[0].Id;
      pedidos.IdProd = rows[0].IdProd;
      pedidos.IdEncargado = rows[0].IdEncargado;
      pedidos.PedFecha = rows[0].PedFecha;

      await pedidos.createDetail();

      pedidos.IdEncargado = null;
      pedidos.PedEstado = name;
      pedidos.Id = req.params.id;
      await pedidos.updateStatus();
      req.flash("mensaje_exito", "Actualización Exitosa");
      res.redirect("/pedidos"); // te redireccion a al ruta establecida
    } else {
      pedidos.IdEncargado = rows[0].IdEncargado;
      pedidos.PedEstado = name;
      pedidos.Id = req.params.id;
      await pedidos.updateStatus();
      req.flash("mensaje_exito", "Actualización Exitosa");
      res.redirect("/pedidos"); // te redireccion a al ruta establecida
    }
  } catch (error) {
    req.flash("mensaje_error", "Error");
    console.log(error);
    res.redirect(`/pedidos`);
  }
};

export const obtenerTotalPedidos = async (req, res) => {
  const [rows] = await pool.query(
    "SELECT Count(*) as total from pedido where PedEstado = 'DISEÑADOR' or 'DESPACHO' or 'PERFILADOR' or 'ENSUELADOR'"
  );
  res.json(rows);
};

export const getDetailP = async (req, res) => {
  const pedidos = new pedido();
  const [rows] = await pedidos.getDetailPedido();
  res.json(rows);
};
export const getDetailOneP = async (req, res) => {
  const { search } = req.body;
  const pedidos = new pedido();
  pedidos.OP = search;
  const [rows] = await pedidos.getDetailOnePedido();
  res.json(rows);
};
export const getOneDetailGrafic = async (req, res) => {
  const { name, dateFirts, dateLast } = req.body;
  const pedidos = new pedido();
  pedidos.IdEncargado = name;
  pedidos.dateInit = dateFirts;
  pedidos.dateEnd = dateLast;
  const [rows] = await pedidos.getOnePedidoCode();
  res.json(rows);
};
