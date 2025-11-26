const getRelojes = async () => {  
  try {
    const res = await fetch("http://localhost:3000/api/relojes");
    const data = await res.json();
    return data.relojes || [];
  } catch (error) {
    console.error("Error al obtener los Relojes:", error);
    return [];
  }
};

const mezclarRelojes = (arr) => arr.sort(() => Math.random() - 0.6);


/* ===============================================================
   2. HELPERS GENERALES
================================================================ */
const $ = (s) => document.querySelector(s);

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return isNaN(d) ? "" : d.toLocaleDateString();
}

function truncate(str = "", n = 120) {
  return str.length > n ? str.slice(0, n) + "…" : str;
}

function renderSuggestions(lista) {
  const box = $("#search-suggestions");

  if (!lista.length) {
    box.style.display = "none";
    return;
  }

  box.innerHTML = lista
    .map(
      r => `
      <div class="search-item" data-id="${r._id}">
        <img src="${escapeHtml(r.imagen || "")}" onerror="this.src=''">
        <div>
          <strong>${escapeHtml(r.marca)} ${escapeHtml(r.modelo)}</strong><br>
          <span class="text-muted">${escapeHtml(r.empresa || "")}</span>
        </div>
      </div>
    `
    )
    .join("");

  box.style.display = "block";
}

function renderGestionSuggestions(lista) {
  const box = $("#gestion-suggestions");

  if (!lista.length) {
    box.style.display = "none";
    return;
  }

  box.innerHTML = lista
    .map(
      r => `
      <div class="search-item" data-id="${r._id}">
        <img src="${escapeHtml(r.imagen || "")}" onerror="this.src=''">
        <div>
          <strong>${escapeHtml(r.marca)} ${escapeHtml(r.modelo)}</strong><br>
          <span class="text-muted">${escapeHtml(r.empresa || "")}</span>
        </div>
      </div>
    `
    )
    .join("");

  box.style.display = "block";
}

// Evento de clic sobre una sugerencia
document.addEventListener("click", async (e) => {
  const item = e.target.closest(".search-item");
  if (!item) return;

  const id = item.dataset.id;
  const todos = await getRelojes();

  const seleccionado = todos.find(r => r._id === id);
  const resto = todos.filter(r => r._id !== id);

  const lista = $("#lista-relojes");
  lista.innerHTML = "";
  [seleccionado, ...resto].forEach(r => lista.appendChild(crearCardRelojSimple(r)));

  $("#search-suggestions").style.display = "none";
  $("#hero-search").value = `${seleccionado.marca} ${seleccionado.modelo}`;
});

document.addEventListener("click", async (e) => {

  // 🟦 CLICK EN SUGERENCIA DE GESTIÓN
  const itemGestion = e.target.closest("#gestion-suggestions .search-item");

  if (itemGestion) {
    const id = itemGestion.dataset.id;
    const data = await getRelojes();
    const reloj = data.find(r => r._id === id);

    const cont = $("#lista-gestion-relojes");
    if (cont) {
      cont.innerHTML = "";
      cont.appendChild(crearCardRelojDOM(reloj)); // usa tarjeta editable
    }

    $("#gestion-suggestions").style.display = "none";
    $("#gestion-search").value = `${reloj.marca} ${reloj.modelo}`;
  }
});

/* ===============================================================
   3. CREACIÓN DE TARJETAS (LISTA PRINCIPAL)
================================================================ */
function crearCardRelojDOM(r) {
  const col = document.createElement("div");
  col.className = "col-md-6 col-lg-4 col-xl-3";

  col.innerHTML = `
    <div class="card reloj-card h-100 rounded position-relative">
      
      ${r.imagen ? `
        <img src="${escapeHtml(r.imagen)}" class="card-img-top" 
             onerror="this.style.display='none';">
      ` : `
        <div class="no-img d-flex align-items-center justify-content-center bg-light" 
             style="min-height:220px;">
          ${escapeHtml(r.marca)} ${escapeHtml(r.modelo)}
        </div>
      `}

      <div class="card-body d-flex flex-column">

        <h5 class="card-title">${escapeHtml(r.marca)} ${escapeHtml(r.modelo)}</h5>

        <p class="text-muted mb-1">${escapeHtml(r.empresa || "")}
           <span class="reloj-fecha">${formatDate(r.fechaLanzamiento)}</span>
        </p>

        <p class="mb-2">${truncate(r.descripcion || "")}</p>

        <div class="mb-2">
          ${(r.caracteristicas || [])
            .map(c => `<span class="badge bg-light text-dark me-1">${escapeHtml(c)}</span>`)
            .join("")}
        </div>

        <div class="mt-auto d-flex justify-content-between align-items-center">
          <strong class="text-primary fs-5">$${Number(r.precio || 0).toFixed(2)}</strong>

          <div>
            <button class="btn btn-sm btn-outline-secondary me-1 btn-editar" data-id="${r._id}">
              <i class="fa fa-edit"></i>
            </button>

            <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${r._id}">
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>

      </div>
    </div>
  `;
  return col;
}


/* ===============================================================
   4. CARRUSEL DESTACADOS (OWL)
================================================================ */
function crearItemCarruselHTML(r) {
  return `
    <div class="item">
      <div class="card reloj-card rounded">

        ${r.imagen ? `
          <img src="${escapeHtml(r.imagen)}" class="card-img-top"
               onerror="this.style.display='none';">
        ` : `
          <div class="no-img-carousel d-flex align-items-center justify-content-center bg-light" 
               style="min-height:200px;">
            ${escapeHtml(r.marca)} ${escapeHtml(r.modelo)}
          </div>
        `}

        <div class="card-body">
          <h6 class="mb-1">${escapeHtml(r.marca)} ${escapeHtml(r.modelo)}</h6>
          <p class="mb-1"><strong>$${Number(r.precio).toFixed(2)}</strong></p>

          <button class="btn btn-sm btn-outline-secondary me-1 btn-editar" data-id="${r._id}">
            <i class="fa fa-edit"></i>
          </button>

          <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${r._id}">
            <i class="fa fa-trash"></i>
          </button>
        </div>

      </div>
    </div>
  `;
}


/* ===============================================================
   5. HERO CAROUSEL – 10 RELOJES MÍNIMO
================================================================ */
async function renderHero() {
  const container = $("#carouselId .carousel-inner");
  if (!container) return;

  let relojes = await getRelojes();
  if (!Array.isArray(relojes)) relojes = [];

  // 10 como mínimo
  let lista = [...relojes];
  while (lista.length < 10) lista = [...lista, ...relojes];
  lista = lista.slice(0, 10);

  container.innerHTML = lista.map((r, i) => `
    <div class="carousel-item ${i === 0 ? "active" : ""}">
      <img src="${escapeHtml(r.imagen || "")}" 
           class="d-block w-100 h-100" 
           onerror="this.style.display='none';">
    </div>
  `).join("");
}


/* ===============================================================
   6. RENDER GENERAL
================================================================ */
async function renderAll() {
  try {
    showSpinner(true);

    const data = await getRelojes();
    const mezclados = mezclarRelojes([...data]);

    // ⭐ Lista principal
    const lista = $("#lista-relojes");
    if (lista) {
      lista.innerHTML = "";
      mezclados.forEach(r => lista.appendChild(crearCardRelojSimple(r)));
    }

    // ⭐ Carrusel destacados
    const carrusel = $("#carrusel-relojes");
    if (carrusel) {
      if (window.jQuery && jQuery("#carrusel-relojes").data('owl.carousel')) {
        try { jQuery("#carrusel-relojes").owlCarousel("destroy"); } catch {}
      }
      carrusel.innerHTML = mezclados.map(crearItemCarruselHTML).join("");
      initializeOwlIfAvailable();
    }

    // Eventos
    attachDelegatedEvents();

  } finally {
    showSpinner(false);
  }
}


/* ===============================================================
   7. EDITAR / NUEVO / ELIMINAR
================================================================ */
function attachDelegatedEvents() {
  document.removeEventListener("click", delegatedClickHandler);
  document.addEventListener("click", delegatedClickHandler);
}

function crearModalInfoHTML(r) {
  return `
    <div class="text-center">
      ${r.imagen ? `
        <img src="${escapeHtml(r.imagen)}" class="img-fluid rounded mb-3" style="max-height:240px;">
      ` : ""}

      <h3>${escapeHtml(r.marca)} ${escapeHtml(r.modelo)}</h3>

      <p class="text-primary fw-bold fs-4">$${Number(r.precio).toFixed(2)}</p>

      <p class="text-muted mb-2">${escapeHtml(r.empresa || "Sin empresa")}</p>

      <p class="mb-3">${escapeHtml(r.descripcion || "")}</p>

      <div class="mb-3">
        ${(r.caracteristicas || [])
          .map(c => `<span class="badge bg-light text-dark me-1">${escapeHtml(c)}</span>`)
          .join("")}
      </div>

      <p class="text-muted">Lanzado: ${formatDate(r.fechaLanzamiento)}</p>
    </div>
  `;
}

async function abrirInfoReloj(id) {
  const res = await fetch(`http://localhost:3000/api/relojes/${id}`);
  const data = await res.json();
  const r = data.reloj ?? data;

  $("#modalInfoBody").innerHTML = crearModalInfoHTML(r);

  const md = new bootstrap.Modal("#modalInfoReloj");
  md.show();
}

async function delegatedClickHandler(e) {
  const edit = e.target.closest(".btn-editar");
  const del  = e.target.closest(".btn-eliminar");
const info = e.target.closest(".btn-info-reloj");

if (info) return abrirInfoReloj(info.dataset.id);
  if (edit) return abrirModalEditar(edit.dataset.id);
  if (del)  return eliminarRelojConfirm(del.dataset.id);
}


function abrirModalNuevo() {
  $("#form-reloj").reset();
  $("#reloj-id").value = "";
  $("#modalRelojLabel").textContent = "Nuevo Reloj";
  
  modalRelojInstance = new bootstrap.Modal("#modalReloj");
  modalRelojInstance.show();
}

async function abrirModalEditar(id) {
  const res = await fetch(`http://localhost:3000/api/relojes/${id}`);
  const data = await res.json();

  // Si tu API responde { reloj: {... } }
  const r = data.reloj ? data.reloj : data;

  $("#reloj-id").value = r._id || "";
  $("#marca").value = r.marca || "";
  $("#modelo").value = r.modelo || "";
  $("#precio").value = r.precio || 0;
  $("#imagen").value = r.imagen || "";
  $("#caracteristicas").value = (r.caracteristicas || []).join(", ");
  $("#fechaLanzamiento").value = r.fechaLanzamiento
    ? new Date(r.fechaLanzamiento).toISOString().slice(0, 10)
    : "";
  $("#empresa").value = r.empresa || "";

  $("#modalRelojLabel").textContent = "Editar Reloj";

  modalRelojInstance = new bootstrap.Modal("#modalReloj");
  modalRelojInstance.show();
}

async function guardarRelojHandler(e) {
  e.preventDefault();

  const id = $("#reloj-id").value;

  const payload = {
    marca: $("#marca").value.trim(),
    modelo: $("#modelo").value.trim(),
    precio: Number($("#precio").value),
    imagen: $("#imagen").value.trim(),
    caracteristicas: $("#caracteristicas").value.split(",").map(s => s.trim()),
    fechaLanzamiento: $("#fechaLanzamiento").value || null,
    empresa: $("#empresa").value.trim(),
  };

  const url = id 
    ? `http://localhost:3000/api/relojes/${id}`
    : `http://localhost:3000/api/relojes`;

  const method = id ? "PUT" : "POST";

  try {
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    // 🔹 Cerrar modal correctamente
    if (modalRelojInstance) modalRelojInstance.hide();

    // 🔹 Mostrar mensaje de éxito
    mostrarToast("Reloj guardado correctamente");

    // 🔹 Refrescar vista
    renderAll();
    renderHero();

  } catch (err) {
    console.error(err);
    mostrarToast("Error al guardar", "danger");
  }
}

//eliminar reloj
let relojAEliminar = null;

function eliminarRelojConfirm(id) {
  relojAEliminar = id;

  const modal = new bootstrap.Modal("#modalConfirm");
  modal.show();

  $("#btn-confirm-yes").onclick = async () => {
    try {
      await fetch(`http://localhost:3000/api/relojes/${relojAEliminar}`, {
        method: "DELETE"
      });

      // 👉 Cerrar el modal después de eliminar
      const instance = bootstrap.Modal.getInstance(document.getElementById("modalConfirm"));
      instance.hide();

      // 👉 Mostrar mensaje de éxito
      mostrarToast("Reloj eliminado correctamente", "danger");

      // 👉 Actualizar listas
      renderAll();
      renderHero();

    } catch (err) {
      mostrarToast("Error al eliminar", "danger");
    }
  };
}


/* ===============================================================
   8. SEARCH (buscador)
================================================================ */

let searchTimer = null;

$("#hero-search")?.addEventListener("input", async (e) => {
  clearTimeout(searchTimer);

  searchTimer = setTimeout(async () => {
    const q = e.target.value.trim().toLowerCase();
    const todos = await getRelojes();

    if (!q) {
      $("#search-suggestions").style.display = "none";
      renderAll();
      return;
    }

    // 🔍 filtrar
    const matches = todos.filter(r =>
      `${r.marca} ${r.modelo} ${r.empresa} ${(r.caracteristicas || []).join(" ")}`.toLowerCase().includes(q)
    );

    // mostrar sugerencias
    renderSuggestions(matches);

  }, 150);
});

async function searchAndRender(q) {
  const todos = await getRelojes();
  if (!q) return renderAll();

  const query = q.toLowerCase();

  const matches = todos.filter((r) =>
    `${r.marca} ${r.modelo} ${r.empresa} ${(r.caracteristicas || []).join(" ")}`
      .toLowerCase()
      .includes(query)
  );

  const rest = todos.filter((r) => !matches.includes(r));
  const ordenados = [...matches, ...rest];

  const lista = $("#lista-relojes");
  lista.innerHTML = "";
  ordenados.forEach((r) => lista.appendChild(crearCardRelojSimple(r)));
}

/* ===============================================================
   BUSCADOR EN GESTIÓN DE RELOJES
================================================================ */
let gestionSearchTimer = null;

$("#gestion-search")?.addEventListener("input", async (e) => {
  clearTimeout(gestionSearchTimer);

  gestionSearchTimer = setTimeout(async () => {
    const q = e.target.value.toLowerCase();
    const clean = q.trim();

    // Si borró todo → limpiar lista y ocultar sugerencias
    if (!clean) {
      $("#gestion-suggestions").style.display = "none";

      const cont = $("#lista-gestion-relojes");
      if (cont) cont.innerHTML = ""; // ⬅ limpiar resultados anteriores

      return;
    }

    const todos = await getRelojes();

    const matches = todos.filter(r =>
      `${r.marca} ${r.modelo} ${r.empresa} ${(r.caracteristicas || []).join(" ")}`
        .toLowerCase()
        .includes(clean)
    );

    renderGestionSuggestions(matches);
  }, 150);
});


/* ===============================================================
   9. SPINNER
================================================================ */
function showSpinner(v) {
  const s = $("#spinner");
  if (!s) return;
  v ? s.classList.add("show") : s.classList.remove("show");
}

function initializeOwlIfAvailable() {
  if (!window.jQuery || !jQuery.fn.owlCarousel) return;

  setTimeout(() => {
    const $c = jQuery("#carrusel-relojes"); // ← selector jQuery real
    if ($c.length > 0) {
      $c.owlCarousel({
        loop: true,
        margin: 25,
        autoplay: true,
        smartSpeed: 800,
        autoplayTimeout: 3000,
        nav: true,
        navText: [
              '<i class="fa fa-chevron-left"></i>',
              '<i class="fa fa-chevron-right"></i>'
          ],
        responsive: {
          0: { items: 1 },
          576: { items: 2 },
          768: { items: 3 },
          1200: { items: 4 }
        }
      });
    }
  }, 300);
}

function crearCardRelojSimple(r) {
  const col = document.createElement("div");
  col.className = "col-md-6 col-lg-4 col-xl-3";

  col.innerHTML = `
    <div class="card reloj-card h-100 rounded position-relative">

      ${
        r.imagen
          ? `<img src="${escapeHtml(r.imagen)}" class="card-img-top" onerror="this.style.display='none';">`
          : `<div class="no-img d-flex align-items-center justify-content-center bg-light" 
                style="min-height:220px;">
              ${escapeHtml(r.marca)} ${escapeHtml(r.modelo)}
             </div>`
      }

      <div class="card-body d-flex flex-column text-center">

        <h5 class="card-title mb-2">
          ${escapeHtml(r.marca)} ${escapeHtml(r.modelo)}
        </h5>

        <p class="fw-bold text-primary fs-5 mb-3">
          $${Number(r.precio || 0).toFixed(2)}
        </p>

        <button class="btn btn-outline-primary btn-info-reloj" data-id="${r._id}">
          Ver información
        </button>

      </div>
    </div>
  `;

  return col;
}

/* ===============================================================
   10. INICIALIZACIÓN FINAL
================================================================ */
function init() {
  $("#btn-nuevo-reloj").addEventListener("click", abrirModalNuevo);
  $("#form-reloj").addEventListener("submit", guardarRelojHandler);

  // búsqueda
  $("#hero-search-btn")?.addEventListener("click", () =>
    searchAndRender($("#hero-search").value.trim())
  );

  $("#hero-search")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchAndRender($("#hero-search").value.trim());
    }
  });

  renderAll();
  renderHero();
}

document.addEventListener("DOMContentLoaded", init);
let modalRelojInstance = null;
function mostrarToast(msg, tipo = "success") {
  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-white bg-${tipo} border-0 position-fixed bottom-0 end-0 m-3`;
  toast.style.zIndex = 9999;
  toast.role = "alert";
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${msg}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;
  document.body.appendChild(toast);

  const bsToast = new bootstrap.Toast(toast);
  bsToast.show();

  toast.addEventListener("hidden.bs.toast", () => toast.remove());
}