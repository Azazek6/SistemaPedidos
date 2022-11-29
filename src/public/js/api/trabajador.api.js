const empleado = document.getElementById("empleado");

const getObtenerEmpleadoUnico = (emple)=>{
    $.ajax({
        url:"/pedidos/api/empleadone",
        method:"POST",
        async:true,
        data:{emple:emple},

        success: function(response){
            const name = document.getElementById("emple");
            const id = document.getElementById("idempleado");
            let namempleado = "";
            let idempleado = ""; 

            response.map((item)=>{ 
                namempleado = item.Nombre;
                idempleado = item.Id
            })

            if (response.length > 0) {
                name.innerHTML = `
                Empleado: <span style="color:blue;"><b>${namempleado}</b></span>
                `
                id.value = idempleado;
            } else {
                name.innerHTML = `Empleado:`
                id.value = "";
            }
        }
    });
}

const EventEmpleado = (e) =>{
    e.preventDefault();
    getObtenerEmpleadoUnico(e.target.value);
}

empleado.addEventListener("keyup",EventEmpleado);