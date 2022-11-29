import trabajador from "../modelo/trabajador.js"

export const gettrabajador = async (req, res) => {
        res.render('trabajadores/trabajadores');

}
export const getAgregar = async (req, res) => {
    res.render('trabajadores/agregartrabajador');
}

export const ApigetTrabajador= async (req, res) => {
    const trabajadores = new trabajador();
    try {
        const [rows] = await trabajadores.ObtenerDatosTrabajador(); //trae una arreglo de objetos
        res.json(rows);
    } catch (error) {
        res.send(error);
    }
}

export const ApigetTrabajadorDatos = async (req, res) => {
    const { search } = req.body;
    const trabajadores = new trabajador();
    trabajadores.Nombre = search;
    try {
        const [rows] = await trabajadores.ObtenerBusquedad();//trae una arreglo de objetos
        res.send(rows);
    } catch (error) {
        res.send(error);
    }
}

export const add = async (req, res) => {
    const { CodigoTrb, Nombre, Telefono, Cargo, DNI } = req.body; // destrucctoracion de parametros

    if (!Nombre || !Cargo) {
        req.flash("mensaje_error", "Existen campos vacíos en el Formulario")
        res.redirect("trabajadores/agregartrabajador");
    } else {
        try {
            const trabajadores = new trabajador(); 
            trabajadores.CodigoTrb = !CodigoTrb ? null : CodigoTrb.toUpperCase();
            trabajadores.Nombre = Nombre.toUpperCase();
            trabajadores.Telefono = !Telefono ? null : Telefono;
            trabajadores.Cargo = Cargo.toUpperCase();
            trabajadores.DNI = !DNI ? null : DNI;
            await trabajadores.create();
            res.redirect("/trabajadores"); // te redireccion a al ruta establecida
        } catch (error) {
            req.flash("mensaje_exito", "Se Agrego Correctamente")
            res.redirect("trabajadores/agregartrabajador");
        }

    }

}

export const borrar = async (req, res) => {
    const { id } = req.params; //ruta
    const trabajadores = new trabajador();

    trabajadores.Id = id;
    await trabajadores.delete();
    req.flash("mensaje_exito", "Se borro Correctamente")
    res.redirect("/trabajadores") // principal
}

export const VistaActualizar = async (req, res) => {
    const trabajadores = new trabajador();
    trabajadores.Id = req.params.id;
    const [rows] = await trabajadores.ObtenerDatosActualizados();
    const Trabajadores = {
        id: "",
        codigo: "",
        nombre: "",
        telefono: "",
        cargo: "",
        DNI: "",
        Estado: "",
    };
    rows.map((item) => {
        Trabajadores.id = item.Id
        Trabajadores.codigo = item.CodigoTrb
        Trabajadores.nombre = item.Nombre
        Trabajadores.telefono = item.Telefono
        Trabajadores.cargo = item.Cargo
        Trabajadores.DNI = item.DNI
        Trabajadores.estado = item.Estado
    })
    let estado = false;
    rows.map((item) => {
        estado = item.Estado == "Activo" ? true : false;
    })

    res.render("trabajadores/actualizartrabajadores", { Trabajadores, estado })

}

export const update = async (req, res) => {
    const { CodigoTrb, Nombre, Telefono, Cargo, DNI, Estado } = req.body; // destrucctoracion de parametros - names
    

    if (!Nombre || !Cargo || !Estado) {
        req.flash("mensaje_error", "Existen campos vacíos en el Formulario")
        res.redirect(`/trabajadores/actualizar/${req.params.id}`);
    } else {
        try {
            const trabajadores = new trabajador();
            trabajadores.CodigoTrb = !CodigoTrb ? null : CodigoTrb.toUpperCase();
            trabajadores.Nombre = Nombre.toUpperCase();
            trabajadores.Telefono = !Telefono ? null : Telefono;
            trabajadores.Cargo = Cargo.toUpperCase();
            trabajadores.DNI = !DNI ? null : DNI;
            trabajadores.Estado = Estado;
            trabajadores.Id = req.params.id;
            await trabajadores.update();

            req.flash("mensaje_exito", "Actualización Exitosa")
            res.redirect("/trabajadores"); // te redireccion a al ruta establecida
        } catch (error) {
            req.flash("mensaje_error", error)
            res.redirect(`/trabajadores/actualizar/${req.params.id}`);
        }

    }
}