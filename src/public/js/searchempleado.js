const search = document.getElementById("search");
const rolUser = document.getElementById("rolUser");

const tableempleado = (data) => {
  let tablabody = "";

  data.map((item) => {
    tablabody += `
            <tr>
                <td> ${item.CodigoTrb == null ? "" : item.CodigoTrb} </td>
                <td> ${item.Nombre} </td>
                <td> ${item.Telefono == null ? "" : item.Telefono} </td>
                <td> ${item.Cargo} </td>
                <td> ${item.DNI == null ? "" : item.DNI} </td>
                <td> ${item.Estado} </td>
                ${
                  rolUser.value == 1
                    ? `
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
        `
                    : ""
                }
            </tr>
            `;
  });

  let tabla = `

    <div class="contenedor-table">
    <table class="table table-sm table-hover">
        <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Celular</th>
            <th>Cargo</th>
            <th>DNI</th>
            <th>Estado</th>
            <th>Accion</th>
         </tr>
         ${tablabody}
    </table>
    </div>

    `;

  return tabla;
};

const getempleadoRequest = async () => {
  const tabla = document.getElementById("contenedortableempleado");
  const response = await fetch("http://localhost:3000/trabajadores/api");
  const data = await response.json();
  tabla.innerHTML = tableempleado(data);
};

const getempleadoBusquedad = async (item) => {
  const tabla = document.getElementById("contenedortableempleado");
  $.ajax({
    url: "http://localhost:3000/trabajadores/api/letra",
    type: "POST",
    async: true,
    data: { search: item },

    success: function (response) {
      tabla.innerHTML = tableempleado(response);
    },
  });
};

const buscarCampo = async (e) => {
  e.preventDefault();
  const search = document.getElementById("search");
  await getempleadoBusquedad(search.value);
};

if (search != null) {
  search.addEventListener("keyup", buscarCampo); //evento mientras escribes
  getempleadoRequest();
}
