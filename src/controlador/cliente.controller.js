import cliente from "../modelo/cliente.js"

export const getCliente = async (req, res) => {
    res.render('clientes/cliente');
}

export const ApigetCliente = async (req, res) => {
    const clientes = new cliente();
    try {
        const [rows] = await clientes.ObtenerDatosCliente(); //trae una arreglo de objetos
        res.json(rows);
    } catch (error) {
        res.send(error);
    }
}

export const ApigetClienteDatos = async (req, res) => {
    const { search } = req.body;
    const clientes = new cliente();
    clientes.CliNombre = search;
    try {
        const [rows] = await clientes.ObtenerBusquedad();//trae una arreglo de objetos
        res.send(rows);
    } catch (error) {
        res.send(error);
    }
}

export const getAgregar = async (req, res) => {
    res.render('clientes/agregarcliente');
}

export const add = async (req, res) => {
    const { nombre, apellido, razonsocial, telefono, correo, direccion, ruc, tipocliente } = req.body; // destrucctoracion de parametros
    if (!nombre || !ruc || !tipocliente) {
        req.flash("mensaje_error", "Existen campos vacíos en el Formulario")
        res.redirect("clientes/agregarcliente");
    } else {
        try {
            const clientes = new cliente();
            clientes.CliNombre = nombre.toUpperCase(); // name
            clientes.CliApellido = !apellido ? null : apellido.toUpperCase();
            clientes.CliRazonSocial = !razonsocial ? null : razonsocial.toUpperCase();
            clientes.CliTelef = !telefono ? null : telefono;
            clientes.CliCorreo = !correo ? null : correo.toUpperCase();
            clientes.CliDire = !direccion.toUpperCase() ? null : direccion.toUpperCase();
            clientes.CliRuc = ruc;
            clientes.TipoCliente = tipocliente.toUpperCase();
            await clientes.create();
            res.redirect("/clientes"); // te redireccion a al ruta establecida
        } catch (error) {
            req.flash("mensaje_exito", "Se Agrego Correctamente")
            res.redirect("clientes/agregarcliente");
        }

    }

}

export const borrar = async (req, res) => {
    const { id } = req.params; //ruta
    const clientes = new cliente();

    clientes.Id = id;
    await clientes.delete();
    req.flash("mensaje_exito", "Se borro Correctamente")
    res.redirect("/clientes") // principal
}

export const VistaActualizar = async (req, res) => {
    const clientes = new cliente();
    clientes.Id = req.params.id;
    const [rows] = await clientes.ObtenerDatosActualizados();
    const Clientes = {
        id: "",
        Nombre: "",
        Apellido: "",
        RazonSocial: "",
        Telef: "",
        Correo: "",
        Dire: "",
        Ruc: "",
        TipoCliente: "",
        Estado: "",
    };

    rows.map((item) => {
        Clientes.id = item.Id
        Clientes.Nombre = item.CliNombre
        Clientes.Apellido = item.CliApellido
        Clientes.RazonSocial = item.CliRazonSocial
        Clientes.Telef = item.CliTelef
        Clientes.Correo = item.CliCorreo
        Clientes.Dire = item.CliDire
        Clientes.Ruc = item.CliRuc
        Clientes.TipoCliente = item.TipoCliente
        Clientes.Estado = item.Estado
    })

    let estado = false;
    rows.map((item) => {
        estado = item.Estado == "Activo" ? true : false;
    })

    let tipocliente = false;
    rows.map((item)=>{
        tipocliente = item.TipoCliente == "CLIENTE JURÍDICO" ? true: false;
    })

    console.log(tipocliente);

    res.render("clientes/actualizarclientes", {Clientes,estado,tipocliente})

}

export const update = async (req, res) => {
    const { nombre, apellido, razonsocial, telefono, correo, direccion, ruc, tipocliente, estado } = req.body;

    if (!nombre || !ruc || !tipocliente || !estado) {
        req.flash("mensaje_error", "Existen campos vacíos en el Formulario")
        res.redirect(`/clientes/actualizar/${req.params.id}`); // get
    } else {
        try {
            const clientes = new cliente();
            clientes.CliNombre = nombre.toUpperCase(); // name
            clientes.CliApellido = !apellido ? null : apellido.toUpperCase();
            clientes.CliRazonSocial = !razonsocial ? null : razonsocial.toUpperCase();
            clientes.CliTelef = !telefono ? null : telefono;
            clientes.CliCorreo = !correo ? null : correo.toUpperCase();
            clientes.CliDire = !direccion ? null : direccion.toUpperCase();
            clientes.CliRuc = ruc;
            clientes.TipoCliente = tipocliente.toUpperCase();
            clientes.Estado = estado;
            clientes.Id = req.params.id;
            await clientes.update();

            req.flash("mensaje_exito", "Actualización Exitosa")
            res.redirect("/clientes"); // te redireccion a al ruta establecida
        } catch (error) {
            req.flash("mensaje_exito", "Actualización no")
            res.redirect(`/clientes/actualizar/${req.params.id}`);
        }

    }

}
