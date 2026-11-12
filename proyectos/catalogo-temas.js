/*
 * CATÁLOGO DE TEMAS
 *
 * Cada objeto representa una opción del selector. Este archivo solo contiene
 * datos: el comportamiento está en temas.js y los efectos están en temas.css.
 * Para añadir un tema, copia un objeto, cambia su id y elige colores legibles.
 * Ninguna paleta cambia archivos, enlaces ni datos de los proyectos.
 */
const temasNuevos = [
  {
    id: "azul",
    nombre: "Azul",
    modo: "dark",
    arte: null,
    colores: {
      fondo: "#0a1020",
      panel: "#111e35",
      linea: "#2d405e",
      texto: "#edf3ff",
      secundario: "#a4b5cf",
      acento: "#9ac5ff",
      tintaBoton: "#081a35",
      tonoA: "#133b78",
      tonoB: "#0d2243",
    },
  },
  {
    id: "claro",
    nombre: "Claro",
    modo: "light",
    arte: null,
    colores: {
      fondo: "#f4f7fc",
      panel: "#ffffff",
      linea: "#cbd6e7",
      texto: "#15243a",
      secundario: "#4e6078",
      acento: "#1556af",
      tintaBoton: "#ffffff",
      tonoA: "#e0ebff",
      tonoB: "#f0f5ff",
    },
  },
  {
    id: "blueprint",
    nombre: "Blueprint",
    modo: "dark",
    arte: "blueprint",
    colores: {
      fondo: "#092958",
      panel: "#0e3568",
      linea: "#4d719f",
      texto: "#f4f8ff",
      secundario: "#bbd1ef",
      acento: "#b5d9ff",
      tintaBoton: "#092653",
      tonoA: "#12447e",
      tonoB: "#0a2a56",
    },
  },
  {
    id: "pixel",
    nombre: "Píxel",
    modo: "dark",
    arte: "pixel",
    colores: {
      fondo: "#090f24",
      panel: "#142341",
      linea: "#5276ad",
      texto: "#f0f6ff",
      secundario: "#b1c4df",
      acento: "#9acbff",
      tintaBoton: "#0a1933",
      tonoA: "#194a87",
      tonoB: "#12264e",
    },
  },
  {
    id: "degradado",
    nombre: "Degradado azul",
    modo: "dark",
    arte: null,
    colores: {
      fondo: "#07162e",
      panel: "#10284a",
      linea: "#365a86",
      texto: "#f1f7ff",
      secundario: "#b0c9e8",
      acento: "#a6d8ff",
      tintaBoton: "#09203d",
      tonoA: "#1452a2",
      tonoB: "#0e3261",
    },
  },
  {
    id: "cristal",
    nombre: "Cristal",
    modo: "dark",
    arte: null,
    colores: {
      fondo: "#0b1a34",
      panel: "#132b4b",
      linea: "#52729c",
      texto: "#f5f9ff",
      secundario: "#c0d0e7",
      acento: "#b3d9ff",
      tintaBoton: "#10243f",
      tonoA: "#1e4d85",
      tonoB: "#183452",
    },
  },
  {
    id: "ascii",
    nombre: "ASCII",
    modo: "dark",
    arte: "ascii",
    colores: {
      fondo: "#060e19",
      panel: "#0d1b2a",
      linea: "#36566f",
      texto: "#dbf2ff",
      secundario: "#98bbd0",
      acento: "#95d9ff",
      tintaBoton: "#061728",
      tonoA: "#15364e",
      tonoB: "#0b1b2b",
    },
  },
  {
    id: "isometrico",
    nombre: "Isométrico",
    modo: "dark",
    arte: "isometrico",
    colores: {
      fondo: "#101b32",
      panel: "#192b48",
      linea: "#496384",
      texto: "#f2f6ff",
      secundario: "#b3c4dc",
      acento: "#a6cbff",
      tintaBoton: "#10213c",
      tonoA: "#254d7c",
      tonoB: "#182f51",
    },
  },
  {
    id: "indigo",
    nombre: "Índigo",
    modo: "dark",
    arte: null,
    colores: {
      fondo: "#101737",
      panel: "#1a2851",
      linea: "#50669a",
      texto: "#f2f5ff",
      secundario: "#b7c7e7",
      acento: "#bed1ff",
      tintaBoton: "#15204a",
      tonoA: "#304b92",
      tonoB: "#1d2c60",
    },
  },
  {
    id: "cinetico",
    nombre: "Cinético",
    modo: "dark",
    arte: "cinetico",
    colores: {
      fondo: "#080e1a",
      panel: "#121e32",
      linea: "#465973",
      texto: "#f4f7ff",
      secundario: "#a9bbd5",
      acento: "#a5c7ff",
      tintaBoton: "#0c1b32",
      tonoA: "#274570",
      tonoB: "#111f36",
    },
  },
];

// Las opciones nuevas se añaden al catálogo anterior; no sustituyen sus temas.
for (const tema of temasNuevos) {
  tema.nuevo = true;
  tema.grupo = "Nuevos";
  tema.colores.enlace = tema.colores.acento;
}
window.TemasProyectos = window.PaletasExistentes.concat(temasNuevos);
