/*
 * BÚSQUEDA Y FILTROS DEL MENÚ
 *
 * HTML contiene las tarjetas; CSS decide cómo se ven; este archivo decide
 * cuáles se muestran. No descarga datos ni cambia los repositorios de GitHub.
 * Los colores y las animaciones se controlan aparte, en temas.js y temas.css.
 */

// El DOM es la representación de la página que JavaScript puede consultar.
// querySelector busca un elemento por su selector CSS: # significa «id».
const campoBusqueda = document.querySelector("#project-search");

// querySelectorAll devuelve varios elementos. Array.from los convierte en
// una lista que podemos recorrer. data-filter y data-project están en el HTML.
const botonesFiltro = Array.from(document.querySelectorAll("[data-filter]"));
const tarjetasProyecto = Array.from(
  document.querySelectorAll("[data-project]"),
);

// Este valor recuerda qué filtro ha elegido la persona. «all» muestra todos.
let categoriaSeleccionada = "all";

// Esta función se comparte entre la consulta y las tarjetas: comparar ambos textos con las mismas reglas evita resultados inconsistentes.
function prepararTexto(texto) {
  // Quitamos las tildes y pasamos a minúsculas para que «codigo» encuentre
  // también «Código». Esto no cambia el texto que se ve en la página.
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// Es el único punto que combina categoría y búsqueda; después actualiza las tarjetas, los grupos y el contador juntos.
function actualizarProyectos() {
  const busqueda = prepararTexto(campoBusqueda.value.trim());
  let cantidadVisible = 0;

  for (const tarjeta of tarjetasProyecto) {
    // dataset permite leer atributos data-* del HTML. Por ejemplo,
    // data-kind="app" se consulta con tarjeta.dataset.kind.
    const coincideCategoria =
      categoriaSeleccionada === "all" ||
      tarjeta.dataset.kind === categoriaSeleccionada;
    const coincideTexto = prepararTexto(tarjeta.textContent).includes(busqueda);
    const debeMostrarse = coincideCategoria && coincideTexto;

    // hidden oculta la tarjeta, pero no la elimina ni cambia sus enlaces.
    tarjeta.hidden = !debeMostrarse;
    if (debeMostrarse) cantidadVisible += 1;
  }

  const palabraProyecto = cantidadVisible === 1 ? "proyecto" : "proyectos";
  document.querySelector("#project-count").textContent =
    `${cantidadVisible} ${palabraProyecto}`;
  document.querySelector("#no-results").hidden = cantidadVisible > 0;

  // Si un filtro vacía una sección entera, ocultamos también su título.
  for (const nombreGrupo of ["featured", "repositories"]) {
    const tarjetasGrupo = Array.from(
      document.querySelectorAll(`#${nombreGrupo} [data-project]`),
    );
    const tieneResultados = tarjetasGrupo.some((tarjeta) => !tarjeta.hidden);
    document.querySelector(`#${nombreGrupo}-section`).hidden = !tieneResultados;
  }
}

for (const boton of botonesFiltro) {
  // Un evento es algo que ocurre en la página, como pulsar un botón.
  // La función de abajo solo se ejecuta cuando llega ese clic.
  boton.addEventListener("click", () => {
    categoriaSeleccionada = boton.dataset.filter;

    // aria-pressed informa del filtro activo también a los lectores de pantalla.
    for (const otroBoton of botonesFiltro) {
      otroBoton.setAttribute("aria-pressed", String(otroBoton === boton));
    }
    actualizarProyectos();
  });
}

// input se dispara al escribir o borrar; no hace falta pulsar Intro.
campoBusqueda.addEventListener("input", actualizarProyectos);

// La primera llamada actualiza el contador al cargar la página.
actualizarProyectos();
