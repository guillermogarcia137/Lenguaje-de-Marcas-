/*
 * SELECTOR DE TEMAS Y EFECTOS
 *
 * Se carga en el <head>, antes del contenido. Así podemos recuperar el tema
 * guardado antes de dibujar la página y evitamos un cambio brusco de colores.
 * Los dibujos son propios y locales; este archivo no pide recursos externos.
 */
(() => {
  const temas = window.TemasProyectos;
  const raiz = document.documentElement;
  const claveGuardado = "ggp.proyectos.apariencia.v1";
  const preferenciaSistema = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  let temaActual = "azul";
  let permitirAnimaciones = true;
  let temporizadorAscii = null;
  let numeroFotograma = 0;
  let filtroTemas = "todos";

  // localStorage es un pequeño almacén de este navegador. Solo guardamos
  // apariencia, nunca datos de otros proyectos. Puede estar bloqueado: por
  // eso leerlo y escribirlo se hace dentro de try/catch.
  try {
    const guardado = JSON.parse(localStorage.getItem(claveGuardado));
    if (guardado && temas.some((tema) => tema.id === guardado.tema)) {
      temaActual = guardado.tema;
      permitirAnimaciones = guardado.animaciones !== false;
    }
  } catch {
    // Si no hay un valor válido, la página sigue funcionando con el tema Azul.
  }

  function obtenerTema(id) {
    return temas.find((tema) => tema.id === id) || temas[0];
  }

  function movimientoActivo() {
    // La preferencia del sistema tiene prioridad sobre el interruptor de la web.
    return permitirAnimaciones && !preferenciaSistema.matches;
  }

  function aplicarTema(id) {
    const tema = obtenerTema(id);
    temaActual = tema.id;

    // data-tema activa las reglas de temas.css. Las variables --bg, --ink,
    // etc. son colores compartidos por el CSS existente, no estilos duplicados.
    raiz.dataset.tema = tema.id;
    raiz.dataset.estilo = tema.estilo || tema.id;
    raiz.dataset.movimiento = movimientoActivo() ? "si" : "no";
    raiz.style.colorScheme = tema.modo;
    const colorNavegador = document.querySelector('meta[name="theme-color"]');
    if (colorNavegador) colorNavegador.content = tema.colores.fondo;
    const variables = {
      "--bg": tema.colores.fondo,
      "--panel": tema.colores.panel,
      "--line": tema.colores.linea,
      "--ink": tema.colores.texto,
      "--muted": tema.colores.secundario,
      "--accent": tema.colores.acento,
      "--link": tema.colores.enlace,
      "--tinta-boton": tema.colores.tintaBoton,
      "--tono-a": tema.colores.tonoA,
      "--tono-b": tema.colores.tonoB,
    };
    for (const [nombre, color] of Object.entries(variables)) {
      raiz.style.setProperty(nombre, color);
    }

    // Al ejecutar esto desde el head los botones aún no existen. Estas
    // consultas aceptan ese caso; repetimos la aplicación cuando el DOM esté listo.
    const etiqueta = document.querySelector("#nombre-tema");
    if (etiqueta) etiqueta.textContent = tema.nombre;
    for (const boton of document.querySelectorAll("[data-elegir-tema]")) {
      boton.setAttribute(
        "aria-pressed",
        String(boton.dataset.elegirTema === tema.id),
      );
    }
    const figura = document.querySelector("#arte-tema");
    if (figura) figura.hidden = !tema.arte;
    for (const dibujo of document.querySelectorAll("[data-arte]")) {
      dibujo.toggleAttribute("hidden", dibujo.dataset.arte !== tema.arte);
    }
    actualizarAscii();
  }

  function guardarPreferencias() {
    const aviso = document.querySelector("#estado-tema");
    try {
      localStorage.setItem(
        claveGuardado,
        JSON.stringify({ tema: temaActual, animaciones: permitirAnimaciones }),
      );
      if (aviso) aviso.textContent = "Preferencia guardada en este navegador.";
    } catch {
      if (aviso)
        aviso.textContent =
          "Tema aplicado. Este navegador no permite guardar la preferencia.";
    }
  }

  // Estos tres fotogramas de un cubo están dibujados aquí, carácter a carácter.
  // Cambiar textContent muestra texto literal: nunca lo interpreta como HTML.
  const fotogramasAscii = [
    "      +---------+\n     /         /|\n    +---------+ |\n    |         | |\n    |         | +\n    |         |/\n    +---------+",
    "        +-----+\n       /|    /|\n      / +---/-+\n     +-----+  |\n     | /   | /\n     |/    |/\n     +-----+",
    "    +---------+\n    |\\         \\\n    | +---------+\n    + |         |\n     \\|         |\n      +---------+",
  ];

  function actualizarAscii() {
    // Limpiamos el temporizador anterior para no acumular varias animaciones.
    clearInterval(temporizadorAscii);
    const cuadro = document.querySelector("#dibujo-ascii");
    if (!cuadro) return;
    cuadro.textContent = fotogramasAscii[0];
    if (temaActual !== "ascii" || !movimientoActivo() || document.hidden)
      return;
    temporizadorAscii = setInterval(() => {
      // El resto de dividir (%) permite volver al primer fotograma al terminar.
      numeroFotograma = (numeroFotograma + 1) % fotogramasAscii.length;
      cuadro.textContent = fotogramasAscii[numeroFotograma];
    }, 900);
  }

  // Esta llamada sucede antes del primer pintado de la página.
  aplicarTema(temaActual);

  document.addEventListener("DOMContentLoaded", () => {
    const dialogo = document.querySelector("#dialogo-temas");
    const listaTemas = document.querySelector("#lista-temas");
    const interruptor = document.querySelector("#animaciones-tema");

    for (const tema of temas) {
      // Creamos elementos en lugar de concatenar HTML. Los nombres del
      // catálogo se insertan como texto, y cada botón conserva su propio id.
      const boton = document.createElement("button");
      boton.type = "button";
      boton.className = "opcion-tema";
      boton.dataset.elegirTema = tema.id;
      boton.setAttribute("aria-label", "Aplicar tema " + tema.nombre);
      const miniatura = document.createElement("span");
      miniatura.className = "miniatura-tema";
      miniatura.dataset.vista = tema.id;
      miniatura.setAttribute("aria-hidden", "true");
      miniatura.style.setProperty("--mini-fondo", tema.colores.fondo);
      miniatura.style.setProperty("--mini-panel", tema.colores.panel);
      miniatura.style.setProperty("--mini-acento", tema.colores.acento);
      const ventana = document.createElement("span");
      ventana.className = "mini-ventana";
      for (let numero = 0; numero < 3; numero += 1)
        ventana.append(document.createElement("i"));
      miniatura.append(ventana);
      const nombre = document.createElement("strong");
      nombre.textContent = tema.nombre;
      const modo = document.createElement("small");
      const nombreModo = tema.modo === "light" ? "Claro" : "Oscuro";
      modo.textContent = tema.nuevo
        ? `Nuevo · ${nombreModo}`
        : `${tema.grupo} · ${nombreModo}`;
      boton.append(miniatura, nombre, modo);
      boton.addEventListener("click", () => {
        aplicarTema(tema.id);
        guardarPreferencias();
      });
      listaTemas.append(boton);
    }

    const campoTema = document.querySelector("#buscar-tema");
    const botonesTemas = Array.from(
      document.querySelectorAll("[data-filtrar-temas]"),
    );
    function filtrarTemas() {
      // El filtro del catálogo es independiente de los filtros de proyectos.
      // Normalizamos las tildes para que «indigo» encuentre «Índigo».
      const consulta = campoTema.value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
      let cantidad = 0;
      for (const boton of listaTemas.children) {
        const tema = obtenerTema(boton.dataset.elegirTema);
        const coincideGrupo =
          filtroTemas === "todos" ||
          (filtroTemas === "nuevos" && tema.nuevo) ||
          (filtroTemas === "claros" && tema.modo === "light") ||
          (filtroTemas === "oscuros" && tema.modo === "dark") ||
          (filtroTemas === "omarchy" && tema.grupo === "Omarchy");
        const nombre = `${tema.nombre} ${tema.grupo}`
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
        boton.hidden = !coincideGrupo || !nombre.includes(consulta);
        if (!boton.hidden) cantidad += 1;
      }
      document.querySelector("#contador-temas").textContent =
        `${cantidad} de ${temas.length} temas`;
      for (const boton of botonesTemas)
        boton.setAttribute(
          "aria-pressed",
          String(boton.dataset.filtrarTemas === filtroTemas),
        );
    }
    campoTema.addEventListener("input", filtrarTemas);
    for (const boton of botonesTemas)
      boton.addEventListener("click", () => {
        filtroTemas = boton.dataset.filtrarTemas;
        filtrarTemas();
      });
    filtrarTemas();

    const abrir = document.querySelector("#abrir-temas");
    abrir.disabled = false;
    abrir.addEventListener("click", () => dialogo.showModal());
    document
      .querySelector("#cerrar-temas")
      .addEventListener("click", () => dialogo.close());

    function actualizarInterruptor() {
      interruptor.checked = movimientoActivo();
      interruptor.disabled = preferenciaSistema.matches;
      document.querySelector("#aviso-movimiento").hidden =
        !preferenciaSistema.matches;
    }
    interruptor.addEventListener("change", () => {
      permitirAnimaciones = interruptor.checked;
      aplicarTema(temaActual);
      guardarPreferencias();
    });
    preferenciaSistema.addEventListener("change", () => {
      aplicarTema(temaActual);
      actualizarInterruptor();
    });
    document.addEventListener("visibilitychange", actualizarAscii);

    // storage avisa si otra pestaña cambia la preferencia de este mismo sitio.
    window.addEventListener("storage", (evento) => {
      if (evento.key !== claveGuardado) return;
      try {
        const valor = JSON.parse(evento.newValue);
        temaActual = obtenerTema(valor?.tema).id;
        permitirAnimaciones = valor?.animaciones !== false;
        aplicarTema(temaActual);
        actualizarInterruptor();
      } catch {
        /* Un valor incompleto no debe romper la página. */
      }
    });
    aplicarTema(temaActual);
    actualizarInterruptor();
  });
})();
