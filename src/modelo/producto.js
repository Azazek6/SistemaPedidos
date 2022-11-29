import conectar from '../config/database.js'

class productos {
    constructor(){
        this.Id = "";
        this.ProdModelo = "";
        this.Taco = "";
        this.Estado = "";
        this.Imagen = "";
    }

    ObtenerDatosProductos() {
        const datos = async () => {
            return await conectar.query("select * from productos") //await: atribuye un tiempo de esperar
        };
        return datos();
    }

    ObtenerDatosUnicoProducto() {
        const unico = async () => {
            return await conectar.query("select * from productos where ProdModelo = ?",[this.ProdModelo]) 
        };
        return unico();
    }


    create() {
        const add = async () => {
            return await conectar.query("insert into productos (ProdModelo, Taco, Imagen) values (?,?,?)",[this.ProdModelo,this.Taco,this.Imagen])
        };
        return add();
    }

    delete() {
        const borrar = async () => {
            return await conectar.query("delete from productos where Id = ? ", [this.Id])
        };
        return borrar();
    }

    
    update() {
        const actualizar = async () => {
            return await conectar.query("Update productos set ProdModelo = ?, Taco = ?, Estado = ?, Imagen = ? where Id = ?",
                [this.ProdModelo,this.Taco,this.Estado, this.Imagen, this.Id])
        };
        return actualizar();
    }

    ObtenerDatosActualizados() {
        const data = async () => {
            return await conectar.query("select * from productos where Id = ?", [this.Id]);
        }
        return data();
    }

    ObtenerBusquedad() {
        const datos = async () => {
            return await conectar.query(`select * from productos where ProdModelo like '${this.ProdModelo}%'`) //await: atribuye un tiempo de esperar
        };
        return datos();
    }

}


export default productos;