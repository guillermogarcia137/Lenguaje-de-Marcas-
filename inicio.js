/* COMPORTAMIENTO DEL MENÚ DE LA PORTADA
 * El desplegable funciona con el HTML nativo. Este archivo añade el cierre
 * al elegir un enlace, pulsar Escape o hacer clic fuera del menú.
 * No guarda preferencias ni realiza peticiones a otros sitios.
 */

// El DOM representa los elementos del HTML. Buscamos el desplegable por su id
// y su summary, que es el control con el que se abre y se cierra.
const menuNavegacion = document.querySelector("#menu-navegacion");
const controlMenu = menuNavegacion.querySelector("summary");

// Un evento es una acción que sucede en la página. Escuchamos los clics en
// los enlaces sin cancelar su navegación: solo cerramos el panel después.
for (const enlace of menuNavegacion.querySelectorAll("nav a")) {
  enlace.addEventListener("click", () => {
    menuNavegacion.open = false;
  });
}

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && menuNavegacion.open) {
    menuNavegacion.open = false;
    // Devolvemos el foco al control para continuar navegando con el teclado.
    controlMenu.focus();
  }
});

document.addEventListener("click", (evento) => {
  // contains comprueba si se ha pulsado dentro del desplegable. Así un clic
  // en el control no lo cierra justo después de abrirlo.
  if (!menuNavegacion.contains(evento.target)) {
    menuNavegacion.open = false;
  }
});
