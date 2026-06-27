/* Loads extra collection centers from a published Google Sheet CSV. */
(function () {
  const HIDDEN_KEY = "va_hidden_centers_v1";
  const VERIFIED_KEY = "va_verified_centers_v1";
  const DEFAULT_ITEMS = [
    "Alimentos no perecederos",
    "Articulos de higiene",
    "Insumos medicos urgentes",
    "Ropa y cobijas en buen estado",
    "Agua potable"
  ];

  function configured() {
    return !!(window.VA_GOOGLE_FORM && window.VA_GOOGLE_FORM.centerCsvUrl);
  }

  function readList(key) {
    try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch (e) { return []; }
  }

  function writeList(key, list) {
    localStorage.setItem(key, JSON.stringify(Array.from(new Set(list))));
  }

  function applyModeration() {
    const VA = window.VA || (window.VA = { centers: [] });
    const hidden = new Set(readList(HIDDEN_KEY));
    const verified = new Set(readList(VERIFIED_KEY));
    VA.centers = (VA.centers || [])
      .filter((center) => !hidden.has(center.id))
      .map((center) => verified.has(center.id) ? { ...center, verified: true, source: "verified" } : center);
    window.dispatchEvent(new CustomEvent("va-centers-change"));
    return VA.centers;
  }

  function verifyCenter(id) {
    writeList(VERIFIED_KEY, [...readList(VERIFIED_KEY), id]);
    return applyModeration();
  }

  function hideCenter(id) {
    writeList(HIDDEN_KEY, [...readList(HIDDEN_KEY), id]);
    return applyModeration();
  }

  function unhideCenter(id) {
    writeList(HIDDEN_KEY, readList(HIDDEN_KEY).filter((value) => value !== id));
    return applyModeration();
  }

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let cell = "";
    let quoted = false;
    for (let i = 0; i < text.length; i += 1) {
      const ch = text[i];
      const next = text[i + 1];
      if (quoted) {
        if (ch === '"' && next === '"') {
          cell += '"';
          i += 1;
        } else if (ch === '"') {
          quoted = false;
        } else {
          cell += ch;
        }
      } else if (ch === '"') {
        quoted = true;
      } else if (ch === ",") {
        row.push(cell);
        cell = "";
      } else if (ch === "\n") {
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
      } else if (ch !== "\r") {
        cell += ch;
      }
    }
    row.push(cell);
    if (row.some((value) => String(value || "").trim())) rows.push(row);
    return rows;
  }

  function normalKey(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function readAny(row, names) {
    const wanted = names.map(normalKey);
    const found = Object.keys(row).find((key) => wanted.includes(normalKey(key)));
    return found ? String(row[found] || "").trim() : "";
  }

  function hashText(value) {
    let hash = 0;
    const text = String(value || "");
    for (let i = 0; i < text.length; i += 1) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(36);
  }

  function splitItems(value) {
    const text = String(value || "").trim();
    if (!text) return DEFAULT_ITEMS;
    return text.split(/[;,|]/).map((item) => item.trim()).filter(Boolean);
  }

  function cleanText(value) {
    return String(value || "").trim().replace(/\s+/g, " ");
  }

  function normalizeCountry(value) {
    const raw = cleanText(value);
    const key = normalKey(raw);
    const aliases = {
      eu: "United States",
      eeuu: "United States",
      "ee uu": "United States",
      usa: "United States",
      us: "United States",
      "u s": "United States",
      "estados unidos": "United States",
      "united states": "United States",
      canad: "Canada",
      canada: "Canada",
      colombia: "Colombia",
      espana: "Spain",
      spain: "Spain",
      panama: "Panamá",
      mexico: "México",
      portugal: "Portugal"
    };
    return aliases[key] || raw || "International";
  }

  function tagsFor(items) {
    const text = normalKey(items.join(" "));
    const tags = ["supplies"];
    if (text.includes("mascota") || text.includes("pet") || text.includes("animal")) tags.push("pets");
    if (text.includes("dinero") || text.includes("financial") || text.includes("money")) tags.push("financial");
    return tags;
  }

  function pointFrom(seed, min, max) {
    const n = parseInt(hashText(seed).slice(0, 4), 36) || 0;
    return min + (n % (max - min + 1));
  }

  function fromSheet(row, index) {
    const name = cleanText(readAny(row, ["Center name", "Nombre del centro", "Nombre del Centro", "Nombre"]));
    const country = normalizeCountry(readAny(row, ["Country", "Pais", "País"]));
    const city = cleanText(readAny(row, ["City", "Ciudad"]));
    const state = cleanText(readAny(row, ["State / Province", "State", "Estado", "Provincia"]));
    const address = cleanText(readAny(row, ["Address", "Direccion", "Dirección"]));
    const items = splitItems(readAny(row, [
      "What supplies does this center receive?",
      "Accepted supplies",
      "Only receives",
      "Que insumos recibe",
      "Qué insumos recibe",
      "Solo recibe",
      "Tipo de insumo"
    ]));
    const idBase = [name, address, city, state, country, index].join("|");
    const notes = cleanText(readAny(row, ["Notes", "Notas", "Instructions", "Instrucciones"]));
    const limited = cleanText(readAny(row, ["Only receives", "Solo recibe", "Solo recibe si aplica", "Solo recibe (si aplica)", "Tipo de insumo"]));
    const displayName = name || address || "Centro de acopio";
    return {
      id: "submitted-center-" + hashText(idBase),
      name: displayName,
      verified: false,
      source: "submitted",
      country,
      state: state || city || country || "International",
      city: city || state || country || "International",
      address: address || [city, state, country].filter(Boolean).join(", "),
      phone: cleanText(readAny(row, ["Phone", "Telefono", "Teléfono", "WhatsApp"])),
      hours: cleanText(readAny(row, ["Hours", "Horario"])) || "Horario no indicado",
      lat: pointFrom(idBase + "lat", 20, 84),
      lng: pointFrom(idBase + "lng", 18, 86),
      tags: tagsFor(items),
      items,
      notes: limited ? "Solo recibe: " + limited : (notes || "Centro agregado por formulario publico."),
      website: cleanText(readAny(row, ["Website", "Web", "Link"])),
      instagram: cleanText(readAny(row, ["Instagram"])),
      submittedAt: cleanText(readAny(row, ["Timestamp", "Marca temporal", "Fecha"])),
      mapsQuery: [displayName, address, city, state, country].filter(Boolean).join(", ")
    };
  }

  async function refreshCenters() {
    if (!configured()) return [];
    try {
      const sep = window.VA_GOOGLE_FORM.centerCsvUrl.includes("?") ? "&" : "?";
      const res = await fetch(window.VA_GOOGLE_FORM.centerCsvUrl + sep + "t=" + Date.now(), { cache: "no-store" });
      if (!res.ok) throw new Error("Google Sheet returned " + res.status);
      const rows = parseCsv(await res.text());
      const headers = rows.shift() || [];
      const centers = rows
        .map((cells, index) => headers.reduce((acc, header, i) => {
          acc[header] = cells[i] || "";
          return acc;
        }, { __index: index }))
        .map((row, index) => fromSheet(row, index))
        .filter((center) => center.name || center.address);
      const VA = window.VA || (window.VA = { centers: [] });
      const seeded = (VA.centers || []).filter((center) => center.source !== "submitted");
      const byId = new Map(seeded.map((center) => [center.id, center]));
      centers.forEach((center) => byId.set(center.id, center));
      VA.centers = Array.from(byId.values());
      applyModeration();
      return centers;
    } catch (e) {
      console.warn("Google Sheet centers refresh failed.", e.message || e);
      return [];
    }
  }

  window.VA_CENTERS = { configured, refreshCenters, applyModeration, verifyCenter, hideCenter, unhideCenter };
  applyModeration();
  if (configured()) refreshCenters();
})();
