import conectar from '../config/database.js'

class trabajador {
    constructor() {
        this.Id = "";
        this.CodigoTrb = "";
        this.Nombre = "";
        this.Telefono = "";
        this.Cargo = "";
        this.DNI = "";
        this.Estado="";
    }

    ObtenerDatosTrabajador() {
        const datos = async () => {
            return await conectar.query("select * from empleado") //await: atribuye un tiempo de espera
        };
        return datos();
    }

    
    ObtenerDatosUnicoEmpleado() {
        const unico = async () => {
            return await conectar.query("select * from empleado where CodigoTrb = ?",[this.CodigoTrb]) 
        };
        return unico();
    }


    create() {
        const add = async () => {
            return await conectar.query("insert into empleado (CodigoTrb,Nombre, Telefono, Cargo, DNI) values (?,?,?,?,?)"
                , [this.CodigoTrb, this.Nombre, this.Telefono, this.Cargo, this.DNI])
        };
        return add();
    }

    delete(){
        const borrar = async ()=>{
            return await conectar.query("delete from empleado where Id = ? ", [this.Id])
        };
        return borrar();
    }

    update(){
        const actualizar = async ()=>{
            return await conectar.query("Update empleado set CodigoTrb = ?, Nombre = ?, Telefono = ?, Cargo = ?, DNI = ?, Estado = ? where Id = ?", 
            [this.CodigoTrb,this.Nombre,this.Telefono,this.Cargo,this.DNI,this.Estado,this.Id])
        };
        return actualizar();
    }

    ObtenerDatosActualizados(){
        const data = async () => {
            return await conectar.query("select * from empleado where Id = ?", [this.Id]);
        }
        return data();
    }

    ObtenerBusquedad() {
        const datos = async () => {
            return await conectar.query(`select * from empleado where Nombre like '%${this.Nombre}%'`) //await: atribuye un tiempo de esperar
        };
        return datos();
    }

}

export default trabajador;