const menu = document.getElementById("btnmenu");
const dash = document.getElementById("dash");
const dash2 = document.getElementById("dash2");

const accion = () => {
  dash.classList.toggle("acciondash1");
  dash2.classList.toggle("acciondash2");
};

if (menu != null) {
  menu.addEventListener("click", accion);
}
