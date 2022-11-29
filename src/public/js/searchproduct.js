
const search = document.getElementById("search")
const rolUser = document.getElementById("rolUser")

const tableproduct = (data) => {
    let tablabody = "";

    data.map((item) => {
        tablabody += `<tr>
                        <td>${item.ProdModelo}</td>
                        <td>${item.Taco}</td>
                        <td>${item.Imagen == null ? "" : `<img class="zapato" style="width: 150px; height:150px" src="/fotos/${item.Imagen}" alt="Foto">`}</td>
                        <td> ${item.Estado} </td>
                        ${rolUser.value == 1 ? `
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
            <th>Modelo</th>
            <th>Taco</th>
            <th>Foto</th>
            <th>Estado</th>
            <th>Accion</th>
        </tr>
        ${tablabody}
    </table>
    </div>
    `;

    return tabla;
}

const getproductRequest = async () => {
    const tabla = document.getElementById('contenedortableproducto');
    const response = await fetch("/producto/api");
    const data = await response.json();
    console.log(data)
    tabla.innerHTML = tableproduct(data);
}

const getproductBusquedad = async (item) => {
    const tabla = document.getElementById('contenedortableproducto');
    $.ajax({
        url: "/producto/api/letra",
        type: "POST",
        async: true,
        data: { search: item },

        success: function (response) {
            tabla.innerHTML = tableproduct(response);
        }
    });
}

const buscarCampo = async (e) => {
    e.preventDefault();
    const search = document.getElementById("search");
    await getproductBusquedad(search.value)
};

if (search != null) {
    search.addEventListener("keyup", buscarCampo) //evento mientras escribes
    getproductRequest()
}
