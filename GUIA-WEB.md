# Archivos de la web

- `index.html`: portada principal. Sus enlaces y desplegables funcionan sin JavaScript.
- `inicio.css`: conserva el fondo original `img/fondo2.avif` y la paleta original (`#173e76`, `#0b1f3a`, `#4da6ff`, `#1769aa`). Organiza los enlaces sin posiciones absolutas e incluye foco visible, salto al contenido y adaptación a móvil. También lo utiliza el índice de Lenguaje de marcas.
- `index2.html` y `style.css`: índice anterior conservado con su apariencia y los accesos locales a Java y Webs.
- `proyectos/index.html`: catálogo con Focusrite, aplicaciones y repositorios. `menu.js` controla los filtros y la búsqueda; los archivos `temas.*` conservan el selector de apariencia. La guía de esa carpeta explica el JavaScript.
- `proyectos/Focusrite/interfaz.html`: panel de audio, trasladado desde `Proyectos/Focusrite`. La carpeta con mayúscula ya no se utiliza: GitHub distingue las mayúsculas de las minúsculas.
- `Lenguajedemarcas/indexLenguajeDeMarcas.html`: acceso a los ejercicios de ambas copias, al PDF de CSS y a la práctica de HTML recuperada del área de preparación de Git.
- `web-ggp-extra/`: herramientas locales de Java y webs de interés, incorporadas al repositorio.
- `personal/`: demos y pruebas existentes, conservadas.

Los comentarios del HTML y CSS explican las secciones nuevas. El formulario de búsqueda envía la consulta a Google; los enlaces del sitio abren en la misma pestaña.

## Menú, escritorio y Pinterest

- El menú hamburguesa usa `details` y `summary` en `index.html`. Funciona sin JavaScript. `inicio.js` añade cierre con Escape, clic fuera y selección de enlaces; Escape devuelve el foco al control.
- La clase `portada` permite distribuir las secciones en dos columnas y las herramientas en cuatro en escritorio, sin cambiar la disposición de otras páginas. En móvil vuelve a una columna.
- Los cuatro iconos de cabecera se muestran a 32 × 32 píxeles, dentro de enlaces de 44 × 44 para facilitar la pulsación.
- Para poner tu perfil de Pinterest, busca `https://www.pinterest.com/` en `index.html` y cambia sus dos apariciones (icono y sección Mis enlaces).
- `img/pinterest.svg` procede de [Simple Icons](https://github.com/simple-icons/simple-icons/blob/develop/icons/pinterest.svg), bajo [CC0 1.0](https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md). El SVG tiene un trazado negro y huecos transparentes, sin capa blanca. Las marcas pertenecen a sus titulares.
