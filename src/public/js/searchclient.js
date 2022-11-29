const search = document.getElementById("search")
const rolUser = document.getElementById("rolUser")

const tableclient = (data) => {
    let tablabody = "";

    data.map((item)=>{
        tablabody += `<tr>
        <td>${item.CliNombre}</td>
        <td>${item.CliApellido == null ? "" : item.CliApellido }</td>
        <td>${item.CliRazonSocial == null ? "" : item.CliRazonSocial }</td>
        <td>${item.CliTelef == null ? "" : item.CliTelef }</td>
        <td>${item.CliCorreo == null ? "" : item.CliCorreo }</td>
        <td>${item.CliDire == null ? "" : item.CliDire }</td>
        <td>${item.CliRuc}</td>
        <td>${item.TipoCliente}</td>
        <td>${item.Estado}</td>
        ${rolUser.value == 1 || rolUser.value == 3? `
        <td>
            <div class="accion">
                <form action="/clientes/delete/${item.Id}?_method=DELETE" method="post">
                    <button><i class="fa-solid fa-trash"></i></button>
                    <input type="hidden" name="_method" value="DELETE">
                </form>
                <a href="/clientes/actualizar/${item.Id}">
                    <i class="fa-solid fa-pen-to-square"></i>
                </a>
            </div>
        </td>
        ` : ""}
        
    </tr>`
    });

    let tabla = `
    <div class="contenedor-table">
        <table class="table table-sm table-hover">
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Razon Social</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Dirección</th>
                <th>Ruc</th>
                <th>Tipo Cliente</th>
                <th>Estado</th>
                <th>Accion</th>
            </tr>
            ${tablabody}
        </table>
    </div>`;

    return tabla;
}

const getclientRequest = async () => {
    const tabla = document.getElementById('contenedortablecliente');
    const response = await fetch("/clientes/api");
    const data = await response.json();
    tabla.innerHTML = tableclient(data);
}

const getclientBusquedad = async (item) => {
    const tabla = document.getElementById('contenedortablecliente');
    $.ajax({
        url: "/clientes/api/letra",
        type: "POST",
        async: true,
        data: {search: item},
        
        success: function(response){
            tabla.innerHTML = tableclient(response);
        }
    });
}


const buscarCampo = async(e) => {
    e.preventDefault();
    const search = document.getElementById("search");
    await getclientBusquedad(search.value)
};

if (search != null) {
    search.addEventListener("keyup", buscarCampo) //evento mientras escribes
    getclientRequest()
}
