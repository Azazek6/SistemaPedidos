import conectar from '../config/database.js'

class reporte {
    constructor(){
        this.Id="";
        this.Codigo="";
        this.IdPedido="";
        this.IdProd="";
        this.Cantidad="";
        this.IdEncargado="";
        this.Fecha="";

    }

ObtenerDatosReporte() {
    const datos = async () => {
        return await conectar.query("select * from detallepedido ") //await: atribuye un tiempo de esperar
    };
    return datos();
}

ObtenerDatosUnicoCliente() {
    const unico = async () => {
        return await conectar.query("select * from detallepedido where Codigo = ?",[this.Codgio]) 
    };
    return unico();
}

ObtenerBusquedad() {
    const datos = async () => {
        return await conectar.query(`select * from detallepedido where Codigo = ?`) //await: atribuye un tiempo de esperar
    };
    return datos();
}

}

export default reporte;

