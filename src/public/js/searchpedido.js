const formato = (date) => {
  let newDate = new Date(date);
  return `${newDate.getDate()}-${
    newDate.getMonth() + 1
  }-${newDate.getFullYear()}`;
};

const search = document.getElementById("search");

const getSerie = (t34, t35, t36, t37, t38, t39, t40) => {
  let talla = "";
  if (t34 != null) {
    talla += t34;
  }
  if (t35 != null) {
    talla += t35;
  }
  if (t36 != null) {
    talla += t36;
  }
  if (t37 != null) {
    talla += t37;
  }
  if (t38 != null) {
    talla += t38;
  }
  if (t39 != null) {
    talla += t39;
  }
  if (t40 != null) {
    talla += t40;
  }

  return talla;
};
const getSerieFormat = (t34, t35, t36, t37, t38, t39, t40) => {
  let talla = "";
  if (t34 != null) {
    talla += `<sup>${t34}/</sup>34 `;
  }
  if (t35 != null) {
    talla += ` <sup>${t35}/</sup>35`;
  }
  if (t36 != null) {
    talla += ` <sup>${t36}/</sup>36`;
  }
  if (t37 != null) {
    talla += ` <sup>${t37}/</sup>37`;
  }
  if (t38 != null) {
    talla += ` <sup>${t38}/</sup>38`;
  }
  if (t39 != null) {
    talla += ` <sup>${t39}/</sup>39`;
  }
  if (t40 != null) {
    talla += ` <sup>${t40}/</sup>40`;
  }

  return talla;
};

const tablepedido = (data) => {
  let tablabody = "";

  data.map((item) => {
    tablabody += `<tr>
        <td>${item.OP == null ? "" : item.OP}</td>
        <td>${item.modelo}</td>
        <td>${item.nombre}</td>
        <td>${item.trabajador == null ? "" : item.trabajador}</td>
        <td>${formato(item.fecha)}</td>
        <td>${item.estado}</td>
        <td>${
          getSerie(
            item.t34,
            item.t35,
            item.t36,
            item.t37,
            item.t38,
            item.t39,
            item.t40
          ) == "22422"
            ? "Estandar"
            : "Especial"
        }</td>   
        <td>${getSerieFormat(
          item.t34,
          item.t35,
          item.t36,
          item.t37,
          item.t38,
          item.t39,
          item.t40
        )}</button></td>
        <td>${item.plataforma}</td>
        <td>${item.taco}</td>
        <td>${item.cantidad}</td>
        <td>${item.unidad}</td>
        <td>
            <div class="accion">
                <form action="/pedidos/delete/${
                  item.id
                }?_method=DELETE" method="post">
                    <button><i class="fa-solid fa-trash"></i></button>
                    <input type="hidden" name="_method" value="DELETE">
                </form>
                <a href="/pedidos/actualizar/${
                  item.id
                }"><i class="fa-solid fa-pen-to-square"></i></a>
                ${
                  item.estado != "COMPLETADO"
                    ? `
                <form action="/pedidos/end/${item.id}" method="post">
                    <button><i class="fa-solid fa-circle-check"></i></button>
                </form>
                `
                    : ""
                }
                
            </div>
        </td>
    </tr>`;
  });

  let tabla = `
    <div class="contenedor-table">
    <table class="table table-sm table-hover" id="table">
        <tr>
            <th>Código OP</th>
            <th>Producto</th>
            <th>Clientes</th>
            <th>Encargado</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Talla</th>
            <th>Serie</th>
            <th>Plataforma</th>
            <th>Taco</th>
            <th>Cantidad</th>
            <th>Unidad Medida</th>
            <th>Accion</th>
        </tr>
        ${tablabody}
    </table>
</div>`;

  return tabla;
};

const getpedidoRequest = async () => {
  const tabla = document.getElementById("contenedortablepedido");
  const response = await fetch("/pedidos/api");
  const data = await response.json();
  tabla.innerHTML = tablepedido(data);
};

const getpedidoBusquedad = async (item) => {
  const tabla = document.getElementById("contenedortablepedido");
  $.ajax({
    url: "/pedidos/api/letra",
    type: "POST",
    async: true,
    data: { search: item },

    success: function (response) {
      tabla.innerHTML = tablepedido(response);
    },
  });
};

const buscarCampo = async (e) => {
  e.preventDefault();
  const search = document.getElementById("search");
  await getpedidoBusquedad(search.value);
};

if (search != null) {
  search.addEventListener("keyup", buscarCampo); //evento mientras escribes
  getpedidoRequest();
}
