const search = document.getElementById("search");

const tablereport = (data) => {
  let tablabody = "";

  data.map((item) => {
    tablabody += `
    <tr>
        <td>${item.pedido}</td>
        <td>${item.producto}</td>
        <td>${item.cantidad}</td>
        <td>${item.empleado}</td>
        <td>${item.fecha}</td>
    </tr>
    `;
  });

  let tabla = `
    <div class="contenedor-table">
        <table class="table table-sm table-hover">
            <tr>
            <th>Pedido</th>
            <th>Producto</th>    
            <th>Cantidad</th>
            <th>Empleado</th>
            <th>Fecha</th>
            </tr>
            ${tablabody}
        </table>
    </div>`;

  return tabla;
};

const getreportRequest = async () => {
  const tabla = document.getElementById("contenedortablereport");
  const response = await fetch("/pedidos/api/detail");
  const data = await response.json();
  tabla.innerHTML = tablereport(data);
};

const getpedidoBusquedad = async (item) => {
  const tabla = document.getElementById("contenedortablereport");
  $.ajax({
    url: "/pedidos/api/detail/one",
    type: "POST",
    async: true,
    data: { search: item },

    success: function (response) {
      tabla.innerHTML = tablereport(response);
    },
  });
};

const buscarCampo = async (e) => {
  e.preventDefault();
  const search = document.getElementById("search");
  await getpedidoBusquedad(search.value);
};

search.addEventListener("keyup", buscarCampo); //evento mientras escribes
getreportRequest();
