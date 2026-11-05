// ====== Configuración ======
const USUARIO = "guillermogarcia137";
const REPO = "Primeros-pasos-en-Java";
// Servicio que compila y ejecuta Java. Si deja de funcionar, solo hay que cambiar esta URL.
const URL_EJECUCION = "https://ce.judge0.com/submissions?base64_encoded=false&wait=true";
const ID_JAVA = 62; // Java (OpenJDK) en Judge0

const API = `https://api.github.com/repos/${USUARIO}/${REPO}`;
const RAW = `https://raw.githubusercontent.com/${USUARIO}/${REPO}/HEAD`;

const $ = id => document.getElementById(id);
let codigoActual = "";

// ====== Carga inicial ======
async function iniciar() {
    try {
        const [arbol, commits] = await Promise.all([
            fetch(`${API}/git/trees/HEAD?recursive=1`).then(r => {
                if (!r.ok) throw new Error("HTTP " + r.status);
                return r.json();
            }),
            fetch(`${API}/commits?per_page=5`).then(r => (r.ok ? r.json() : []))
        ]);
        pintarProgramas(arbol.tree.filter(f => f.type === "blob" && f.path.endsWith(".java")));
        pintarCommits(commits);
    } catch (e) {
        $("arbol").textContent =
            "No se pudo cargar GitHub (" + e.message + "). Espera un rato y recarga: la API limita las peticiones por hora.";
    }
}

// ====== Lista de programas agrupados por carpeta ======
function pintarProgramas(archivos) {
    const cont = $("arbol");
    cont.textContent = "";
    if (!archivos.length) {
        cont.textContent = "No hay archivos .java en el repositorio.";
        return;
    }

    const grupos = {};
    archivos.forEach(f => {
        const partes = f.path.split("/");
        const carpeta = partes.length > 1 ? partes.slice(0, -1).join("/") : "Raíz";
        (grupos[carpeta] ??= []).push(f.path);
    });

    Object.keys(grupos).sort().forEach((carpeta, i) => {
        const det = document.createElement("details");
        det.open = i === 0;
        const sum = document.createElement("summary");
        sum.textContent = `${carpeta} (${grupos[carpeta].length})`;
        det.appendChild(sum);

        grupos[carpeta].forEach(ruta => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.textContent = ruta.split("/").pop();
            btn.addEventListener("click", () => abrir(ruta, btn));
            det.appendChild(btn);
        });
        cont.appendChild(det);
    });
}

function pintarCommits(commits) {
    const ul = $("commits");
    commits.forEach(c => {
        const li = document.createElement("li");
        const fecha = new Date(c.commit.author.date).toLocaleDateString("es-ES");
        li.textContent = c.commit.message.split("\n")[0];
        const small = document.createElement("small");
        small.textContent = fecha;
        li.appendChild(small);
        ul.appendChild(li);
    });
}

// ====== Mostrar código ======
async function abrir(ruta, boton) {
    document.querySelectorAll("#arbol button").forEach(b => b.removeAttribute("aria-current"));
    boton.setAttribute("aria-current", "true");

    $("nombre").textContent = ruta;
    $("codigo").textContent = "Cargando…";
    $("salida").textContent = "Aquí aparecerá el resultado.";
    $("salida").classList.remove("error");

    try {
        const url = `${RAW}/${ruta.split("/").map(encodeURIComponent).join("/")}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("HTTP " + res.status);
        codigoActual = await res.text();
    } catch (e) {
        $("codigo").textContent = "No se pudo cargar el archivo: " + e.message;
        return;
    }

    const bloque = $("codigo");
    bloque.textContent = codigoActual;
    bloque.removeAttribute("data-highlighted");
    if (window.hljs) hljs.highlightElement(bloque);

    const enlace = $("enlaceGithub");
    enlace.href = `https://github.com/${USUARIO}/${REPO}/blob/HEAD/${ruta}`;
    enlace.hidden = false;
    $("btnCopiar").hidden = false;
    $("btnEjecutar").hidden = false;
}

$("btnCopiar").addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(codigoActual);
        $("btnCopiar").textContent = "Copiado";
    } catch {
        $("btnCopiar").textContent = "No se pudo copiar";
    }
    setTimeout(() => ($("btnCopiar").textContent = "Copiar"), 1500);
});

// ====== Ejecución ======
// El servicio ejecuta un solo archivo y espera una clase "Main".
// Si tu clase se llama distinto, se añade una clase Main que la llama.
function prepararJava(src) {
    src = src.replace(/^\s*package\s+[\w.]+;\s*$/m, "");
    const pos = src.search(/public\s+static\s+void\s+main/);
    if (pos < 0) return null;

    const clases = [...src.slice(0, pos).matchAll(/class\s+(\w+)/g)];
    if (!clases.length) return null;

    const nombre = clases[clases.length - 1][1];
    if (nombre === "Main") return src;

    src = src.replace(new RegExp(`public\\s+class\\s+${nombre}\\b`), `class ${nombre}`);
    return src + `\npublic class Main { public static void main(String[] a) throws Exception { ${nombre}.main(a); } }\n`;
}

$("btnEjecutar").addEventListener("click", async () => {
    const salida = $("salida");
    const btn = $("btnEjecutar");
    salida.classList.remove("error");

    const fuente = prepararJava(codigoActual);
    if (!fuente) {
        salida.classList.add("error");
        salida.textContent = "Este archivo no tiene un método main, así que no se puede ejecutar solo.";
        return;
    }

    btn.disabled = true;
    salida.textContent = "Compilando y ejecutando…";

    try {
        const res = await fetch(URL_EJECUCION, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                source_code: fuente,
                language_id: ID_JAVA,
                stdin: $("stdin").value
            })
        });
        if (!res.ok) throw new Error("HTTP " + res.status);
        const r = await res.json();

        const error = r.compile_output || r.stderr || "";
        if (error) salida.classList.add("error");
        salida.textContent =
            (r.stdout || "") + (error ? "\n" + error : "") ||
            (r.status ? r.status.description : "El programa no ha mostrado nada.");
    } catch (e) {
        salida.classList.add("error");
        salida.textContent = "No se pudo ejecutar (" + e.message + "). Prueba más tarde o cambia URL_EJECUCION en java.js.";
    } finally {
        btn.disabled = false;
    }
});

iniciar();
