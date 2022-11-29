const notify = document.getElementById("notify");

const messague = (text) => {
  let content = `
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong style="font-size: 20px">Existen nuevos PEDIDOS: ${text}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  `;

  return content;
};

const getData = async () => {
  const response = await fetch("/pedidos/api/count");
  const data = await response.json();
  if (data.length > 0) {
    if (data[0].total != 0) {
      notify.innerHTML = messague(data[0].total);
    }
  }
};

if (notify != null) {
  getData();
}
