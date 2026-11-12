const search = document.querySelector("#project-search");
const buttons = [...document.querySelectorAll("[data-filter]")];
const projects = [...document.querySelectorAll("[data-project]")];
let category = "all";
const normalize = (text) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
function filter() {
  const query = normalize(search.value.trim());
  let count = 0;
  for (const project of projects) {
    const show =
      (category === "all" || project.dataset.kind === category) &&
      normalize(project.textContent).includes(query);
    project.hidden = !show;
    if (show) count++;
  }
  document.querySelector("#project-count").textContent =
    `${count} ${count === 1 ? "proyecto" : "proyectos"}`;
  document.querySelector("#no-results").hidden = count > 0;
  for (const group of ["featured", "repositories"])
    document.querySelector("#" + group + "-section").hidden = ![
      ...document.querySelectorAll("#" + group + " [data-project]"),
    ].some((project) => !project.hidden);
}
buttons.forEach((button) =>
  button.addEventListener("click", () => {
    category = button.dataset.filter;
    buttons.forEach((item) =>
      item.setAttribute("aria-pressed", String(item === button)),
    );
    filter();
  }),
);
search.addEventListener("input", filter);
filter();
