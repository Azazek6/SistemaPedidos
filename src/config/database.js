import {data} from './configuracion.js'
import mysql from 'mysql2/promise' 

const conexion = mysql.createPool(data)

conexion.getConnection((err, connection)=>{
    if(err){
        console.log("Error en la conexion con la base de datos");
    }
    if(connection){
        connection.release();
        console.log("Conectado")
    }
    return;
})

export default conexion;