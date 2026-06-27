/* Venezuela Ayuda database adapter.
   Uses a published Google Sheet when configured, then Supabase/localStorage as fallback. */
(function () {
  const KEY = "va_db_v1";
  const SESSION_KEY = "va_session_v1";
  const ADMIN_KEY = "va_admin_session_v1";
  const SUPABASE_JS = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

  const nowIso = () => new Date().toISOString();
  const money = (n) => "$" + Number(n || 0).toLocaleString("en-US");
  const uid = (prefix) => prefix + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);

  const seed = {
    users: [],
    requests: []
  };

  function load() {
    try {
      const parsed = JSON.parse(localStorage.getItem(KEY) || "null");
      if (parsed && typeof parsed === "object") return { ...seed, ...parsed };
    } catch (e) {}
    save(seed);
    return { ...seed };
  }

  function save(db) {
    localStorage.setItem(KEY, JSON.stringify(db));
    window.dispatchEvent(new CustomEvent("va-db-change"));
    return db;
  }

  function configured() {
    return !!(window.VA_SUPABASE && window.VA_SUPABASE.url && window.VA_SUPABASE.publishableKey);
  }

  function sheetConfigured() {
    return !!(window.VA_GOOGLE_FORM && window.VA_GOOGLE_FORM.csvUrl);
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

  function supportType(value) {
    const text = normalKey(value);
    if (text.includes("both") || text.includes("ambas") || text.includes("ambos")) return "both";
    if (text.includes("suppl") || text.includes("insumo") || text.includes("cosa") || text.includes("producto")) return "supplies";
    return "money";
  }

  function dateFrom(value) {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? nowIso() : new Date(parsed).toISOString();
  }

  function categoryFrom(value) {
    return String(value || "General").trim() || "General";
  }

  function fromSheet(row, index) {
    const timestamp = readAny(row, ["Timestamp", "Marca temporal", "Fecha"]);
    const email = readAny(row, ["Email address", "Email", "Correo", "Correo electronico"]);
    const name = readAny(row, ["Full name", "Nombre completo", "Nombre"]);
    const city = readAny(row, ["City", "Ciudad"]);
    const state = readAny(row, ["State", "Estado", "Provincia"]);
    const story = readAny(row, ["Describe your situation", "Describa su situacion", "Historia", "Situacion", "Describe tu situacion"]);
    const idBase = [timestamp, email, name, story, index].join("|");
    return {
      id: "sheet-" + hashText(idBase),
      userId: null,
      name,
      email,
      category: categoryFrom(readAny(row, ["Category", "Categoria"])),
      supportType: supportType(readAny(row, ["What are you requesting?", "What are you requesting", "Tipo de ayuda", "Solicita", "Que solicitas?"])),
      city,
      state,
      story,
      requested: Number(String(readAny(row, ["Amount needed (USD)", "Monto Solicitado (USD)", "Monto solicitado", "Monto", "Dinero solicitado"]) || "0").replace(/[^0-9.-]/g, "")) || 0,
      method: readAny(row, ["Preferred donation method", "Preferencia de metodo de donacion", "Metodo de donacion", "Metodo"]),
      details: readAny(row, ["Donation details", "Detalles", "Link de donacion", "Datos de donacion"]),
      files: readAny(row, ["Photos, videos & supporting documents", "Archivos", "Documentos"]),
      status: "published",
      raised: Number(String(readAny(row, ["Funds already received (USD)", "Fondos ya recibidos", "Fondos recibidos", "Recibido"]) || "0").replace(/[^0-9.-]/g, "")) || 0,
      receipt: readAny(row, ["Receipt / proof link", "Recibo/Link", "Recibo", "Prueba", "Comprobante"]),
      trackingNotes: readAny(row, ["Fund tracking notes", "Notas de tracking", "Notas", "Seguimiento"]),
      updates: [],
      createdAt: timestamp ? dateFrom(timestamp) : nowIso(),
      reviewedAt: ""
    };
  }

  async function refreshGoogleSheet() {
    if (!sheetConfigured()) return load();
    try {
      const sep = window.VA_GOOGLE_FORM.csvUrl.includes("?") ? "&" : "?";
      const res = await fetch(window.VA_GOOGLE_FORM.csvUrl + sep + "t=" + Date.now(), { cache: "no-store" });
      if (!res.ok) throw new Error("Google Sheet returned " + res.status);
      const rows = parseCsv(await res.text());
      const headers = rows.shift() || [];
      const sheetRequests = rows
        .map((cells, index) => headers.reduce((acc, header, i) => {
          acc[header] = cells[i] || "";
          return acc;
        }, { __index: index }))
        .map((row, index) => fromSheet(row, index))
        .filter((request) => request.name || request.story || request.details);
      const db = load();
      const localById = new Map((db.requests || []).map((r) => [r.id, r]));
      sheetRequests.forEach((remote) => {
        localById.set(remote.id, { ...remote, ...(localById.get(remote.id) || {}) });
      });
      db.requests = Array.from(localById.values()).sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
      save(db);
      return db;
    } catch (e) {
      console.warn("Google Sheet refresh failed; using local data.", e.message || e);
      return load();
    }
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (window.supabase) return resolve();
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        existing.addEventListener("load", resolve, { once: true });
        existing.addEventListener("error", reject, { once: true });
        return;
      }
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  async function client() {
    if (!configured()) return null;
    await loadScript(SUPABASE_JS);
    if (!window.__vaSupabase) {
      window.__vaSupabase = window.supabase.createClient(
        window.VA_SUPABASE.url,
        window.VA_SUPABASE.publishableKey
      );
    }
    return window.__vaSupabase;
  }

  function fromRemote(row) {
    return {
      id: row.id,
      userId: row.user_id || null,
      name: row.name || "",
      email: row.email || "",
      category: row.category || "Medical",
      supportType: row.support_type || "money",
      city: row.city || "",
      state: row.state || "",
      story: row.story || "",
      requested: Number(row.requested || 0),
      method: row.method || "GoFundMe URL",
      details: row.details || "",
      files: row.files || "",
      status: row.status || "published",
      raised: Number(row.raised || 0),
      receipt: row.receipt || "",
      trackingNotes: row.tracking_notes || "",
      updates: row.updates || [],
      createdAt: row.created_at || nowIso(),
      reviewedAt: row.reviewed_at || ""
    };
  }

  function toRemote(request) {
    return {
      id: request.id,
      user_id: request.userId || null,
      name: request.name,
      email: request.email,
      category: request.category,
      support_type: request.supportType || "money",
      city: request.city,
      state: request.state,
      story: request.story,
      requested: Number(request.requested || 0),
      method: request.method,
      details: request.details,
      files: request.files,
      status: request.status || "published",
      raised: Number(request.raised || 0),
      receipt: request.receipt,
      tracking_notes: request.trackingNotes,
      updates: request.updates || [],
      created_at: request.createdAt || nowIso(),
      reviewed_at: request.reviewedAt || null
    };
  }

  async function refreshRemote() {
    if (sheetConfigured()) return refreshGoogleSheet();
    try {
      const sb = await client();
      if (!sb) return load();
      const { data, error } = await sb
        .from("requests")
        .select("*")
        .neq("status", "rejected")
        .order("created_at", { ascending: false });
      if (error) throw error;
      const db = load();
      const localById = new Map((db.requests || []).map((r) => [r.id, r]));
      (data || []).map(fromRemote).forEach((remote) => {
        localById.set(remote.id, { ...(localById.get(remote.id) || {}), ...remote });
      });
      db.requests = Array.from(localById.values()).sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
      save(db);
      return db;
    } catch (e) {
      console.warn("Supabase refresh failed; using local data.", e.message || e);
      return load();
    }
  }

  async function pushRemote(request) {
    if (sheetConfigured()) return;
    try {
      const sb = await client();
      if (!sb) return;
      const { error } = await sb.from("requests").upsert(toRemote(request), { onConflict: "id" });
      if (error) throw error;
      await refreshRemote();
    } catch (e) {
      console.warn("Supabase save failed; kept local copy.", e.message || e);
    }
  }

  function session() {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch (e) { return null; }
  }

  function adminSession() {
    return localStorage.getItem(ADMIN_KEY) === "yes";
  }

  function initials(nameOrEmail) {
    const raw = String(nameOrEmail || "User").replace(/@.*/, "").trim();
    const parts = raw.split(/\s+/).filter(Boolean);
    return (parts.length > 1 ? parts[0][0] + parts[1][0] : raw.slice(0, 2)).toUpperCase();
  }

  function login(email, name) {
    const db = load();
    const safeEmail = String(email || "guest@example.com").trim().toLowerCase();
    const safeName = String(name || safeEmail.split("@")[0] || "Guest User").trim();
    let user = db.users.find((u) => u.email === safeEmail);
    if (!user) {
      user = { id: uid("user"), email: safeEmail, name: safeName, createdAt: nowIso() };
      db.users.push(user);
      save(db);
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id }));
    signInRemote(safeEmail, safeName);
    return user;
  }

  async function signInRemote(email, name) {
    try {
      const sb = await client();
      if (!sb) return;
      const { data } = await sb.auth.getSession();
      if (data && data.session) return;
      await sb.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          data: { name }
        }
      });
      console.info("Supabase magic link sent to", email);
    } catch (e) {
      console.warn("Supabase login failed; local session is active.", e.message || e);
    }
  }

  function currentUser() {
    const s = session();
    if (!s) return null;
    return load().users.find((u) => u.id === s.userId) || null;
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  function adminLogin(password) {
    if (String(password || "").trim() === "admin123") {
      localStorage.setItem(ADMIN_KEY, "yes");
      return true;
    }
    return false;
  }

  function adminLogout() {
    localStorage.removeItem(ADMIN_KEY);
  }

  function addRequest(input) {
    const db = load();
    const user = currentUser();
    const request = {
      id: uid("req"),
      userId: user ? user.id : null,
      name: String(input.name || (user && user.name) || "Anonymous").trim(),
      email: user ? user.email : String(input.email || "").trim(),
      category: String(input.category || "Medical").trim(),
      supportType: String(input.supportType || "money").trim(),
      city: String(input.city || "").trim(),
      state: String(input.state || "").trim(),
      story: String(input.story || "").trim(),
      requested: Number(input.requested || 0),
      method: String(input.method || "GoFundMe URL").trim(),
      details: String(input.details || "").trim(),
      files: String(input.files || "").trim(),
      status: "published",
      raised: Number(input.raised || 0),
      receipt: String(input.receipt || "").trim(),
      trackingNotes: String(input.trackingNotes || "").trim(),
      updates: [],
      createdAt: nowIso(),
      reviewedAt: ""
    };
    db.requests.unshift(request);
    save(db);
    pushRemote(request);
    return request;
  }

  function updateRequest(id, patch) {
    const db = load();
    db.requests = db.requests.map((r) => r.id === id ? { ...r, ...patch } : r);
    save(db);
    const updated = db.requests.find((r) => r.id === id);
    if (updated) pushRemote(updated);
    return updated;
  }

  function publicFamilies() {
    return load().requests
      .filter((r) => r.status !== "rejected")
      .map((r) => ({
        id: r.id,
        name: r.name,
        category: r.category,
        supportType: r.supportType || "money",
        location: [r.city, r.state].filter(Boolean).join(", ") || "Venezuela",
        story: r.story,
        requested: Number(r.requested || 0),
        raised: Number(r.raised || 0),
        updates: (r.updates || []).length || 1,
        method: r.method,
        details: r.details,
        receipt: r.receipt,
        trackingNotes: r.trackingNotes,
        createdAt: r.createdAt
      }));
  }

  function exportCsv() {
    const db = load();
    const rows = [["id", "name", "email", "category", "location", "requested", "method", "status", "createdAt"]];
    db.requests.forEach((r) => rows.push([r.id, r.name, r.email, r.category, [r.city, r.state].filter(Boolean).join(", "), r.requested, r.method, r.status, r.createdAt]));
    return rows.map((row) => row.map((cell) => '"' + String(cell || "").replace(/"/g, '""') + '"').join(",")).join("\n");
  }

  window.VADB = {
    load, save, money, initials,
    login, currentUser, logout,
    adminLogin, adminLogout, adminSession,
    addRequest, updateRequest, publicFamilies, exportCsv,
    refreshRemote, refreshGoogleSheet, sheetConfigured
  };

  if (sheetConfigured() || configured()) refreshRemote();
})();
