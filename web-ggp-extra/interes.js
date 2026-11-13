// ====== Tus enlaces: edita solo esta parte ======
// "u" es la dirección. Si un elemento no tiene "u", se muestra como texto.
const GRUPOS = [
    {
        nombre: "Estudio DAM",
        enlaces: [
            { t: "Libro: Sistemas informáticos (Jesús Beas Arco, Ed. Síntesis)" },
            { t: "Plantilla: Mi horario de clases", u: "https://www.notion.com/es-es/templates/my-class-schedule-7" },
            { t: "Plantilla: Habits tracker", u: "https://www.notion.com/es-es/templates/habits-tracker-833" },
            { t: "Plantilla: Planificador de informática", u: "https://app.notion.com/marketplace/templates/planificador-inform-tica?product_id=2b8d872b-594c-81df-b94b-0077d976e1cb" }
        ]
    },
    {
        nombre: "Zombies y Call of Duty",
        enlaces: [
            { t: "BO1 Zombies", u: "https://vel.gg/bo1z" },
            { t: "Moon", u: "https://moon-zombies.pages.dev" },
            { t: "Kino der Toten", u: "https://kino-der-toten.pages.dev" },
            { t: "BO3 Cheese Cube", u: "https://cheese-cube.pages.dev" },
            { t: "Black Ops 2", u: "https://vibeslops.luckeysystems.com" },
            { t: "Modern Warfare 2", u: "https://ovz-game-production.up.railway.app" }
        ]
    },
    {
        nombre: "Shooters clásicos",
        enlaces: [
            { t: "Quake 1", u: "https://q1.pieter.com" },
            { t: "Quake 2", u: "https://q2.pieter.com" },
            { t: "Quake 3", u: "https://q3.pieter.com" },
            { t: "Return to Castle Wolfenstein", u: "https://rtcw.pieter.com" },
            { t: "Unreal Tournament", u: "https://ut.pieter.com" },
            { t: "Half Life", u: "https://pixelsuft.github.io/hl/" },
            { t: "CS Surf", u: "https://surfd.net" },
            { t: "Halo CE", u: "https://mitchellhynes.com/halo" },
            { t: "Halo CE móvil", u: "https://hcemobile.com" }
        ]
    },
    {
        nombre: "Deportes y skate",
        enlaces: [
            { t: "Skate 3", u: "https://skate.aaddpp.lol" },
            { t: "Skate Rust", u: "https://global-terror.net" },
            { t: "PES 6", u: "https://pes6.optijuegos.net" }
        ]
    },
    {
        nombre: "Otros juegos",
        enlaces: [
            { t: "Diablo", u: "https://johnimril.github.io/diablo_web/" },
            { t: "Hedgewars", u: "https://webwars.link" },
            { t: "The Simpsons: Hit & Run", u: "https://shar-wasm.cjoseph.workers.dev/?skipm" }
        ]
    }
];

// Pendientes: en Notion se ven cortados con "...". Pega aquí el enlace completo
// y muévelo al grupo que quieras:
//   GTA 5 (web.archive.org/web/2026100605...)
//   GTA Vice City (joncodeofficial.github.io/gta-vice-city-...)
//   Half Life / CS 1.6 (x8bitrain.github.io/we...ash/)

// ====== Pintado ======
const cont = document.getElementById("grupos");
const filtro = document.getElementById("filtro");

function dominio(u) {
    try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return ""; }
}

function pintar(texto = "") {
    const q = texto.trim().toLowerCase();
    cont.textContent = "";
    let total = 0;

    GRUPOS.forEach(g => {
        const items = g.enlaces.filter(e => e.t.toLowerCase().includes(q));
        if (!items.length) return;
        total += items.length;

        const det = document.createElement("details");
        det.className = "grupo";
        det.open = true;

        const sum = document.createElement("summary");
        sum.textContent = g.nombre;
        const n = document.createElement("small");
        n.textContent = `(${items.length})`;
        sum.appendChild(n);
        det.appendChild(sum);

        const ul = document.createElement("ul");
        items.forEach(e => {
            const li = document.createElement("li");
            if (e.u) {
                const a = document.createElement("a");
                a.href = e.u;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                a.textContent = e.t;
                const d = document.createElement("small");
                d.textContent = dominio(e.u);
                a.appendChild(d);
                li.appendChild(a);
            } else {
                const s = document.createElement("span");
                s.textContent = e.t;
                li.appendChild(s);
            }
            ul.appendChild(li);
        });
        det.appendChild(ul);
        cont.appendChild(det);
    });

    if (!total) {
        const p = document.createElement("p");
        p.className = "vacio";
        p.textContent = "No hay enlaces que coincidan.";
        cont.appendChild(p);
    }
}

filtro.addEventListener("input", () => pintar(filtro.value));
pintar();
