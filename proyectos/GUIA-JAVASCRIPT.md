# Cómo está hecho el menú

Empieza por `index.html` y después abre `menu.js`. El código lleva comentarios en español que explican los bloques y las decisiones. Estas pautas se aplicarán también a futuros cambios de los proyectos; están recogidas en el `AGENTS.md` del repositorio y del espacio de trabajo.

## Archivos

| Archivo | Para qué sirve |
| --- | --- |
| `index.html` | Contiene enlaces, tarjetas, búsqueda y el cuadro de temas. |
| `menu.css` | Coloca los elementos, adapta el menú al móvil y define el aspecto base. |
| `menu.js` | Decide qué tarjetas mostrar al buscar o elegir un filtro. |
| `paletas-existentes.js` | Conserva las 42 paletas que ya se utilizaban en PanelVerse. |
| `catalogo-temas.js` | Añade diez estilos nuevos a las 42 paletas anteriores: 52 opciones en total. |
| `temas.js` | Aplica el tema, recuerda la selección y controla la animación ASCII. |
| `temas.css` | Define las cuadrículas, cristal, píxeles, degradados y movimientos. |
| `arte/iconos.svg` | Iconos de píxel originales, agrupados en un archivo. |
| `arte/dibujos.svg` | Robot, paisaje, engranaje, mesa isométrica y líneas. |
| `arte/RECURSOS.md` | Explica la procedencia y la licencia de los dibujos. |

La página principal del sitio (`/index.html`) no carga estos archivos y no se ha cambiado.

## Conceptos que aparecen en el código

- **DOM:** es la página convertida en elementos que JavaScript puede consultar y modificar. Por ejemplo, el campo de búsqueda o un botón.
- **Selector:** indica qué elemento buscas. `#project-search` significa «el elemento que tiene ese id» y `[data-project]` significa «los elementos que tienen ese atributo».
- **Variable:** guarda un valor que después se utiliza. `categoriaSeleccionada` recuerda el filtro actual.
- **Función:** agrupa una tarea con nombre. `actualizarProyectos()` revisa todas las tarjetas y decide cuáles mostrar.
- **Evento:** avisa de algo que ocurre, como escribir, pulsar o cambiar la preferencia de movimiento del sistema.
- **`data-*`:** atributos propios del HTML. `data-kind="app"` permite identificar una tarjeta como aplicación. JavaScript lo lee con `dataset.kind`.
- **`hidden`:** oculta un elemento sin eliminarlo ni modificar su enlace.
- **Variable CSS:** un valor reutilizable como `--bg`. Al cambiarlo, todos los estilos que lo utilizan reciben el nuevo color.
- **`localStorage`:** almacén de este navegador. Aquí recuerda el tema y el permiso de animaciones. No sincroniza preferencias entre dispositivos ni modifica otros proyectos.
- **`try/catch`:** permite responder a un error sin romper la página. Se usa por si el navegador no permite guardar preferencias.
- **`setInterval`:** ejecuta una función cada cierto tiempo. Solo se utiliza para cambiar los fotogramas ASCII mientras ese tema está visible y se permiten animaciones.

## Qué ocurre al elegir un tema

1. `paletas-existentes.js` prepara las 42 paletas anteriores y `catalogo-temas.js` añade las diez opciones nuevas.
2. `temas.js` busca una preferencia válida guardada. Si no existe, utiliza Azul.
3. `aplicarTema()` cambia los colores CSS y el atributo `data-tema` del elemento principal.
4. `temas.css` activa las reglas correspondientes, sin tocar los enlaces ni la lista de proyectos.
5. El botón «Temas» abre un diálogo. Cada miniatura llama a la misma función y guarda la selección.

Los nombres de las funciones describen lo que hacen. No hace falta entender todas las líneas de golpe: puedes seguir primero `actualizarProyectos()` y después `aplicarTema()`.

## Movimiento y accesibilidad

El interruptor «Animaciones» detiene los efectos decorativos. Si el sistema solicita movimiento reducido, esa preferencia tiene prioridad. La animación ASCII se para también cuando la pestaña no está visible. Los dibujos no contienen información necesaria para usar el menú y están marcados como decorativos.

## Cambios sencillos

- **Cambiar un texto o un enlace:** editar la tarjeta correspondiente en `index.html`.
- **Cambiar un color:** buscar el tema en `catalogo-temas.js` y modificar su paleta.
- **Cambiar una animación:** buscar sus `@keyframes` en `temas.css`.
- **Añadir un dibujo:** crear un símbolo nuevo en `arte/dibujos.svg`, añadir su elemento decorativo al HTML y asociarlo desde el catálogo.

Para comprobar cambios se puede servir el repositorio con un servidor estático y abrir `/proyectos/`. No hacen falta dependencias ni un paso de compilación.
