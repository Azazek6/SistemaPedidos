const empleado = document.getElementById("idEmpleado");
const dateInit = document.getElementById("dateFirts");
const dateEnd = document.getElementById("dateLast");
const btnReport = document.getElementById("btnReport");
const contentChart = document.getElementById("content-chart");
const messagueGrafic = document.getElementById("message-grafic");

const messagueGr = (text) => {
  let content = `
  <div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong style="font-size: 15x">${text.toUpperCase()}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  `;

  return content;
};

const hiddenGrafic = () => {
  contentChart.innerHTML = "";
};

const getpedidoRequest = async () => {
  const report = {
    name: empleado.value,
    dateFirts: dateInit.value,
    dateLast: dateEnd.value,
  };
  const response = await fetch("/pedidos/api/detail", {
    method: "POST",
    body: JSON.stringify(report),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const showGrafic = (data) => {
  const title = [];
  const name = [];
  const count = [];
  const codTrabajador = [];
  for (let i = 0; i < data.length; i++) {
    count.push(data[i].total);
    title.push(data[i].dia);
    name.push(data[i].nombreEmpleado);
    codTrabajador.push(data[i].empleado);
  }
  contentChart.innerHTML = `
  <canvas id="myChart"></canvas>
  `;
  const ctx = document.getElementById("myChart");
  if (data.length != 0) {
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: title,
        datasets: [
          {
            label: `${codTrabajador[0]} - ${name[0]}`,
            data: count,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 99, 132, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  } else {
    messagueGrafic.innerHTML = messagueGr(
      "No se encontraron datos o las fechas pueden estar fuera de rango"
    );
  }
};

const getDataReport = async () => {
  console.log(dateInit.value);
  if (empleado.value == "" || dateInit.value == "" || dateEnd.value == "") {
    messagueGrafic.innerHTML = messagueGr(
      "Debe llenar los campos para Mostrar la Gráfica"
    );
  }
  if (empleado.value != "" && dateInit.value != "" && dateEnd.value != "") {
    const data = await getpedidoRequest();
    hiddenGrafic();
    showGrafic(data);
  }
};

btnReport.addEventListener("click", getDataReport);
