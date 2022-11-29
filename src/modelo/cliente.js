import conectar from '../config/database.js'

class cliente {
    constructor() {
        this.Id = "";
        this.CliNombre = "";
        this.CliApellido = "";
        this.CliRazonSocial = "";
        this.CliTelef = "";
        this.CliCorreo = "";
        this.CliDire = "";
        this.CliRuc = "";
        this.TipoCliente = "";
        this.Estado = "";
    }

    ObtenerDatosCliente() {
        const datos = async () => {
            return await conectar.query("select * from clientes ") //await: atribuye un tiempo de esperar
        };
        return datos();
    }

    ObtenerDatosUnicoCliente() {
        const unico = async () => {
            return await conectar.query("select * from clientes where CliRuc = ?",[this.CliRuc]) 
        };
        return unico();
    }


    create() {
        const add = async () => {
            return await conectar.query("insert into clientes (CliNombre, CliApellido, CliRazonSocial, CliTelef, CliCorreo, CliDire, CliRuc, TipoCliente) values (?,?,?,?,?,?,?,?)"
                , [this.CliNombre, this.CliApellido, this.CliRazonSocial, this.CliTelef, this.CliCorreo, this.CliDire, this.CliRuc, this.TipoCliente])
        };
        return add();
    }

    delete() {
        const borrar = async () => {
            return await conectar.query("delete from clientes where Id = ? ", [this.Id])
        };
        return borrar();
    }

    update() {
        const actualizar = async () => {
            return await conectar.query("Update clientes set CliNombre = ?, CliApellido = ?, CliRazonSocial = ?, CliTelef = ?, CliCorreo = ?, CliDire = ?, CliRuc = ?, TipoCliente = ?, Estado=? where Id = ?",
                [this.CliNombre, this.CliApellido, this.CliRazonSocial, this.CliTelef, this.CliCorreo, this.CliDire, this.CliRuc, this.TipoCliente, this.Estado, this.Id])
        };
        return actualizar();
    }

    ObtenerDatosActualizados() {
        const data = async () => {
            return await conectar.query("select * from clientes where Id = ?", [this.Id]);
        }
        return data();
    }

    ObtenerBusquedad() {
        const datos = async () => {
            return await conectar.query(`select * from clientes where CliNombre like '${this.CliNombre}%'`) //await: atribuye un tiempo de esperar
        };
        return datos();
    }
}
export default cliente;