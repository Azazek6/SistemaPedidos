import producto from "../modelo/producto.js";
import multer from "multer";
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const storage = multer.diskStorage({
    destination: join(__dirname, "../public/fotos"),
    filename: (req, file, cb) => { // se llama a la misma funcion creada
        cb(null, file.originalname) // nombre original del archivo 
    }
})

const subirImagen = multer({
    storage,
    limits: { fileSize: 1000000 }
}).single("imagen")

export const getProducto = async (req, res) => {
        res.render('productos/producto');
}

export const ApigetProducto = async (req, res) => {
    const productos = new producto();
    try {
        const [rows] = await productos.ObtenerDatosProductos(); //trae una arreglo de objetos
        res.json(rows);
    } catch (error) {
        res.send(error);
    }
}

export const ApigetProductosDatos = async (req, res) => {
    const { search } = req.body;
    const productos = new producto();
    productos.ProdModelo = search;
    try {
        const [rows] = await productos.ObtenerBusquedad();//trae una arreglo de objetos
        res.send(rows);
    } catch (error) {
        res.send(error);
    }
}

export const getAgregar = async (req, res) => {
    res.render('productos/agregarproducto');
}

export const add = async (req, res) => {
    subirImagen(req, res, async (err) => {
        if (err) {
            err.message = "Éxiste un error"
            req.flash("mensaje_error", err)
            return res.redirect("/producto/agregar");
        }
        const { modelo, taco } = req.body
        if (modelo == "") {
            req.flash("mensaje_error", "Existen campos vacíos en el Formulario")
            res.redirect("/producto/agregar");
        } else {
            try {
                const productos = new producto();
                productos.ProdModelo = modelo; // name
                productos.Taco = !taco ? null : taco;
                productos.Imagen = !req.file ? null : req.file.originalname;
                await productos.create();
                req.flash("mensaje_exito", "Registrado con éxito")
                res.redirect("/producto"); // te redireccion a al ruta establecida
            } catch (error) {
                req.flash("mensaje_error", "Existen campos vacíos en el Formulario")
                res.redirect("/producto/agregar");
            }
        }
    });
}

export const borrar = async (req, res) => {
    const { id } = req.params; //ruta
    const productos = new producto();

    productos.Id = id;
    await productos.delete();
    req.flash("mensaje_exito", "Se borro Correctamente")
    res.redirect("/producto") // principal
}

export const VistaActualizar = async (req, res) => {
    const productos = new producto();
    productos.Id = req.params.id;
    const [rows] = await productos.ObtenerDatosActualizados();
    const Productos = {
        id: "",
        modelo: "",
        taco: "",
        imagen: "",
        estado: "",
    };

    rows.map((item) => {
        Productos.id = item.Id
        Productos.modelo = item.ProdModelo
        Productos.taco = item.Taco
        Productos.imagen = item.Imagen
        Productos.estado = item.Estado
    })

    let estado = false;
    rows.map((item) => {
        estado = item.Estado == "Activo" ? true : false;
    })

    res.render("productos/actualizarproductos", { Productos, estado })


}

export const update = async (req, res) => {
    subirImagen(req, res, async (err) => {
        if (err) {
            err.message = "Éxiste un error"
            req.flash("mensaje_error", err)
            return res.redirect("/producto/actualizar");
        }

        const { modelo,taco, estado, imagen } = req.body; // destrucctoracion de parametros

        if (!modelo || !estado) {
            req.flash("mensaje_error", "Existen campos vacíos en el Formulario")
            res.redirect(`/producto/actualizar/${req.params.id}`);
        } else {
            if (req.file) {
                try {
                    const productos = new producto();
                    productos.ProdModelo = modelo; // name
                    productos.Estado = estado;
                    productos.Taco = !taco ? null : taco;
                    productos.Imagen = !req.file ? null : req.file.originalname;
                    productos.Id = req.params.id;
                    await productos.update();

                    req.flash("mensaje_exito", "Actualización Exitosa")
                    res.redirect("/producto"); // te redireccion a al ruta establecida
                } catch (error) {
                    console.log(error)
                    req.flash("mensaje_error", error)
                    res.redirect(`/producto/actualizar/${req.params.id}`);
                }
            } else {
                const productos = new producto();
                productos.Id = req.params.id;
                const [rows] = await productos.ObtenerDatosActualizados();
                const Productos = {
                    imagen: "",
                };
                rows.map((item) => {
                    Productos.imagen = item.Imagen;
                });
                try {
                    productos.ProdModelo = modelo; // name
                    productos.Estado = estado;
                    productos.Taco = taco;
                    productos.Imagen = Productos.imagen;
                    productos.Id = req.params.id;
                    await productos.update();

                    req.flash("mensaje_exito", "Actualización Exitosa")
                    res.redirect("/producto"); // te redireccion a al ruta establecida
                } catch (error) {
                    console.log(error)
                    req.flash("mensaje_error", error)
                    res.redirect(`/producto/actualizar/${req.params.id}`);
                }
            }
        }
    });
}
