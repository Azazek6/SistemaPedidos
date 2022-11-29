const myModal = document.getElementById("modalTalla");
const close = document.getElementById("close");
const talla = document.getElementById("talla");
const serie = document.getElementById("serie");
const serie34 = document.getElementById("t34");
const serie35 = document.getElementById("t35");
const serie36 = document.getElementById("t36");
const serie37 = document.getElementById("t37");
const serie38 = document.getElementById("t38");
const serie39 = document.getElementById("t39");
const serie40 = document.getElementById("t40");
const agregartalla = document.getElementById("agregarTalla");

if (talla != null) {
  talla.style.color = "red";
  talla.style.fontWeight = "bold";
}

const clicksalir = () => {
  setTimeout(() => {
    myModal.style.display = "none";
    myModal.classList.remove("animate__slideOutRight");
  }, 2000);
  myModal.classList.remove("animate__slideInLeft");
  myModal.classList.remove("show");
  myModal.classList.add("animate__slideOutRight");
};

const limpiar = (campo0, campo1, campo2, campo3, campo4, campo5, campo6) => {
  campo0.value = "";
  campo1.value = "";
  campo2.value = "";
  campo3.value = "";
  campo4.value = "";
  campo5.value = "";
  campo6.value = "";
};

const clickboton = (e) => {
  const serie0 = document.getElementById("small");
  const serie01 = document.getElementById("chico");
  const serie02 = document.getElementById("pequeno");
  const serie03 = document.getElementById("mediano");
  const serie04 = document.getElementById("grande");
  const serie05 = document.getElementById("muygrande");
  const serie06 = document.getElementById("gigante");

  if (
    serie0.value == "" &&
    serie01.value === "2" &&
    serie02.value === "2" &&
    serie03.value === "4" &&
    serie04.value === "2" &&
    serie05.value === "2" &&
    serie06.value === ""
  ) {
    talla.value = "ESTANDAR";
  } else {
    talla.value = "ESPECIAL";
  }
  serie.value = `${serie0.value}${serie01.value}${serie02.value}${serie03.value}${serie04.value}${serie05.value}${serie06.value}`;
  serie34.value = serie0.value;
  serie35.value = serie01.value;
  serie36.value = serie02.value;
  serie37.value = serie03.value;
  serie38.value = serie04.value;
  serie39.value = serie05.value;
  serie40.value = serie06.value;
  clicksalir();
  //limpiar(serie0,serie01, serie02, serie03, serie04, serie05, serie06);
};

const getpedidoBusquedad = async (item) => {
  $.ajax({
    url: "http://localhost:3000/pedidos/api/pedidone",
    type: "POST",
    async: true,
    data: { id: item },

    success: function (response) {
      console.log(response);
    },
  });
};

if (talla != null) {
  talla.addEventListener("click", (e) => {
    const Serie = document.getElementById("serie");
    const serie0 = document.getElementById("small");
    const serie01 = document.getElementById("chico");
    const serie02 = document.getElementById("pequeno");
    const serie03 = document.getElementById("mediano");
    const serie04 = document.getElementById("grande");
    const serie05 = document.getElementById("muygrande");
    const serie06 = document.getElementById("gigante");

    /*const pedido = document.getElementById(`pedido`);
        const getdata = getpedidoBusquedad(pedido.value);
        console.log(getdata);*/

    serie0.value =
      Serie.value != ""
        ? Serie.value[0] != undefined
          ? Serie.value[0]
          : ""
        : "";
    serie01.value =
      Serie.value != ""
        ? Serie.value[1] != undefined
          ? Serie.value[1]
          : ""
        : "";
    serie02.value =
      Serie.value != ""
        ? Serie.value[2] != undefined
          ? Serie.value[2]
          : ""
        : "";
    serie03.value =
      Serie.value != ""
        ? Serie.value[3] != undefined
          ? Serie.value[3]
          : ""
        : "";
    serie04.value =
      Serie.value != ""
        ? Serie.value[4] != undefined
          ? Serie.value[4]
          : ""
        : "";
    serie05.value =
      Serie.value != ""
        ? Serie.value[5] != undefined
          ? Serie.value[5]
          : ""
        : "";
    serie06.value =
      Serie.value != ""
        ? Serie.value[6] != undefined
          ? Serie.value[6]
          : ""
        : "";

    myModal.classList.add("animate__slideInLeft");
    myModal.classList.add("show");
    myModal.style.display = "block";
    myModal.style.background = "rgba(255, 255, 255, 0.8)";
  });
}

if (agregartalla != null) {
  agregartalla.addEventListener("click", clickboton);
}

if (close != null) {
  close.addEventListener("click", clicksalir);
}
