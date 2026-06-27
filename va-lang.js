(function () {
  const KEY = "va_lang_v1";
  const DEFAULT_LANG = "en";
  const textOriginals = new WeakMap();
  const attrOriginals = new WeakMap();
  let applying = false;

  const dictionary = {
    "Collection Centers": "Centros de acopio",
    "Centros": "Centros",
    "Donate": "Donar",
    "Families": "Familias",
    "Request Help": "Pedir ayuda",
    "Volunteer": "Voluntariado",
    "Search": "Buscar",
    "Admin": "Admin",
    "Venezuela Ayuda": "Venezuela Ayuda",
    "Together for\nVenezuela": "Juntos por\nVenezuela",
    "Together for Venezuela": "Juntos por Venezuela",
    "Connecting people around the world with trusted ways to support Venezuelan families after natural disasters.": "Conectamos a personas alrededor del mundo con formas confiables de apoyar a familias venezolanas despues de desastres naturales.",
    "Find Collection Centers": "Buscar centros de acopio",
    "Become a Volunteer": "Ser voluntario",
    "Every center & family verified": "Cada centro y familia verificados",
    "Donations reviewed before publishing": "Donaciones revisadas antes de publicarse",
    "55 centers live": "55 centros activos",
    "International collection network": "Red internacional de centros",
    "Search centers by country, city, address or accepted supplies.": "Busca centros por pais, ciudad, direccion o insumos aceptados.",
    "View centers": "Ver centros",
    "The response, in real time": "La respuesta en tiempo real",
    "How it works": "Como funciona",
    "Trust built into every step": "Confianza en cada paso",
    "No donation link goes public until our team has reviewed and verified it. Every center and family is checked before it appears here.": "Ningun enlace de donacion se publica hasta que nuestro equipo lo revise. Cada centro y familia se verifica antes de aparecer aqui.",
    "Find your way to help": "Encuentra tu forma de ayudar",
    "Four trusted paths — choose the one that fits you.": "Cuatro caminos confiables: elige el que mejor encaje contigo.",
    "Verified families needing support": "Familias verificadas que necesitan apoyo",
    "Each story is reviewed by our team before it is published.": "Cada historia es revisada por nuestro equipo antes de publicarse.",
    "View families →": "Ver familias ->",
    "Verified families coming soon": "Familias verificadas proximamente",
    "No family stories have been published yet. As soon as a request is submitted and verified by our team, it will appear here.": "Todavia no se han publicado historias de familias. Cuando alguien envie una solicitud, aparecera aqui.",
    "Submit a request": "Enviar solicitud",
    "Verified": "Verificado",
    "Donate now": "Donar ahora",
    "Give through verified organizations": "Dona a traves de organizaciones verificadas",
    "Every organization below is vetted by our team. Track exactly how funds are raised and where aid is delivered.": "Cada organizacion de abajo fue revisada por nuestro equipo. Puedes ver como se recaudan los fondos y donde se entrega la ayuda.",
    "Raised across partners": "Recaudado entre aliados",
    "Transparent reporting": "Reportes transparentes",
    "Donation methods": "Metodos de donacion",
    "Prefer to give directly to a family?": "Prefieres donar directamente a una familia?",
    "Browse verified families and support a specific story — every case is reviewed before publishing.": "Explora familias verificadas y apoya una historia especifica. Cada caso se revisa antes de publicarse.",
    "Choose an amount & method": "Elige monto y metodo",
    "Method": "Metodo",
    "You'll be securely redirected to the organization's official donation page. Venezuela Ayuda never holds your funds.": "Seras redirigido de forma segura a la pagina oficial de donacion. Venezuela Ayuda nunca retiene tus fondos.",
    "Request help through the public form": "Pide ayuda con el formulario publico",
    "Fill out the form once with your story, location, donation details and tracking notes. When the response reaches the connected sheet, it appears on the public families page.": "Llena el formulario una sola vez con tu historia, ubicacion, datos de donacion y notas de seguimiento. Cuando la respuesta llegue a la hoja conectada, aparecera en la pagina publica de familias.",
    "Open help form": "Abrir formulario de ayuda",
    "Request verified support": "Solicita apoyo verificado",
    "Create a free account and publish your situation with donation and tracking details in one step.": "Crea una cuenta gratis y publica tu situacion con datos de donacion y seguimiento en un solo paso.",
    "Create your account": "Crea tu cuenta",
    "Already registered?": "Ya estas registrado?",
    "Sign in": "Iniciar sesion",
    "Continue with Google": "Continuar con Google",
    "Continue with Apple": "Continuar con Apple",
    "or with email": "o con correo",
    "Email address": "Correo electronico",
    "Password": "Contrasena",
    "Create account": "Crear cuenta",
    "By continuing you agree to our Terms and Privacy Policy.": "Al continuar aceptas nuestros Terminos y Politica de privacidad.",
    "Welcome back,": "Bienvenido de nuevo,",
    "Member profile": "Perfil de miembro",
    "Sign out": "Cerrar sesion",
    "Submit a request for help": "Enviar una solicitud de ayuda",
    "Fields marked * are required. Your information appears publicly after you submit it.": "Los campos marcados con * son obligatorios. Tu informacion aparece publicamente despues de enviarla.",
    "Full name *": "Nombre completo *",
    "Category *": "Categoria *",
    "What are you requesting? *": "Que estas solicitando? *",
    "Money / direct financial help": "Dinero / ayuda economica directa",
    "Supplies only": "Solo insumos",
    "Money and supplies": "Dinero e insumos",
    "City *": "Ciudad *",
    "State *": "Estado *",
    "Describe your situation *": "Describe tu situacion *",
    "Amount needed (USD) *": "Monto necesario (USD) *",
    "Preferred donation method": "Metodo de donacion preferido",
    "Donation details": "Datos de donacion",
    "Funds already received (USD)": "Fondos ya recibidos (USD)",
    "Receipt / proof link": "Recibo / enlace de prueba",
    "Fund tracking notes": "Notas de seguimiento de fondos",
    "Photos, videos & supporting documents": "Fotos, videos y documentos de apoyo",
    "Drag files here or": "Arrastra archivos aqui o",
    "browse": "buscar",
    "JPG, PNG, MP4, PDF · up to 25MB each": "JPG, PNG, MP4, PDF · hasta 25MB cada uno",
    "Your donation link and tracking details will be published when you submit. Only share information you want donors to see.": "Tu enlace de donacion y detalles de seguimiento se publicaran al enviar. Comparte solo informacion que quieras que vean los donantes.",
    "Publish request": "Publicar solicitud",
    "Save draft": "Guardar borrador",
    "Your requests": "Tus solicitudes",
    "Track the status of each submission.": "Sigue el estado de cada solicitud.",
    "Publishing guide": "Guia de publicacion",
    "Real stories, reviewed and verified": "Historias reales, revisadas y verificadas",
    "Every family here has been verified by our team. Choose a story to support directly — your gift goes where it's needed most.": "Cada familia aqui fue verificada por nuestro equipo. Elige una historia para apoyar directamente: tu ayuda va donde mas se necesita.",
    "No families published yet": "Todavia no hay familias publicadas",
    "We're not showing any family stories yet. Once someone publishes a request, it will appear here with its story, donation link and progress.": "Todavia no mostramos historias de familias. Cuando alguien publique una solicitud, aparecera aqui con su historia, enlace de donacion y progreso.",
    "Donate to an organization": "Donar a una organizacion",
    "Collection centers": "Centros de acopio",
    "Collection Centers": "Centros de acopio",
    "Find verified collection points": "Encuentra puntos de acopio verificados",
    "Search by country, city, center name, address or accepted supplies. Families and volunteers can also add international centers through the public form.": "Busca por pais, ciudad, nombre del centro, direccion o insumos aceptados. Familias y voluntarios tambien pueden agregar centros internacionales con el formulario publico.",
    "Add a collection center": "Agregar centro de acopio",
    "Search centers": "Buscar centros",
    "Verified and submitted locations": "Ubicaciones verificadas y enviadas",
    "What to bring": "Que llevar",
    "Open in Google Maps": "Abrir en Google Maps",
    "Venezuela Ayuda never holds your funds.": "Venezuela Ayuda nunca retiene tus fondos.",
    "A verified bridge between people who want to help and Venezuelan families, organizations and collection centers around the world.": "Un puente verificado entre quienes quieren ayudar y familias venezolanas, organizaciones y centros de acopio alrededor del mundo.",
    "Get Involved": "Participa",
    "Become a Partner": "Ser aliado",
    "Explore": "Explorar",
    "Organization": "Organizacion",
    "About": "Acerca de",
    "Contact": "Contacto",
    "Emergency contacts": "Contactos de emergencia",
    "Component library": "Biblioteca de componentes",
    "A nonprofit relief network": "Una red de ayuda sin fines de lucro",
    "Privacy Policy": "Politica de privacidad",
    "Terms": "Terminos",
    "Add an international center": "Agregar un centro internacional",
    "Add international center": "Agregar centro internacional",
    "Back to centers": "Volver a centros",
    "Complete the collection point information. When submitted, it is saved in the connected form and appears automatically on the centers page when Google updates the sheet.": "Completa la informacion del punto de acopio. Al enviarlo, se guarda en el formulario conectado y aparece automaticamente en la pagina de centros cuando Google actualice la hoja.",
    "Center name *": "Nombre del centro *",
    "Country *": "Pais *",
    "Address *": "Direccion *",
    "Phone": "Telefono",
    "Hours": "Horario",
    "What supplies does it receive? *": "Que insumos recibe *",
    "Does it only receive something specific?": "Solo recibe algo especifico?",
    "Notes": "Notas",
    "Send center": "Enviar centro",
    "Sending...": "Enviando...",
    "View centers": "Ver centros",
    "Back": "Volver",
    "Publish a help request": "Publica una solicitud de ayuda",
    "Fill out your information once. The response is saved in the connected form and appears automatically in families when the public sheet updates.": "Llena tu informacion una sola vez. La respuesta se guarda en el formulario conectado y aparece automaticamente en familias cuando la hoja publica se actualice.",
    "Full name": "Nombre completo",
    "Email": "Correo",
    "Category": "Categoria",
    "What are you requesting?": "Que estas solicitando?",
    "Medicine": "Medicina",
    "Supplies": "Suministros",
    "Both": "Ambos",
    "City": "Ciudad",
    "State": "Estado",
    "Describe your situation": "Describe tu situacion",
    "Requested amount (USD) *": "Monto solicitado (USD) *",
    "Donation method": "Metodo de donacion",
    "Funds already received": "Fondos ya recibidos",
    "Receipt / link": "Recibo / link",
    "Donation details": "Detalles de donacion",
    "Tracking notes": "Notas de seguimiento",
    "Send request": "Enviar solicitud",
    "View families": "Ver familias",
    "Collection centers": "Centros de acopio",
    "Collection Centers": "Centros de acopio",
    "Points to bring aid": "Puntos para llevar ayuda",
    "Find the closest center and bring donations in good condition. Before going, check the hours and confirm by phone when available.": "Busca el centro mas cercano y lleva donaciones en buen estado. Antes de ir, revisa el horario y confirma por telefono cuando este disponible.",
    "What should you bring to collection centers?": "¿Qué llevar a los centros de acopio?",
    "For people:": "Para personas:",
    "For pets:": "Para mascotas:",
    "Clear all": "Limpiar todo",
    "collection centers": "centros de acopio",
    "No centers match those filters": "No hay centros con esos filtros",
    "Try removing a filter or searching a different city.": "Intenta quitar un filtro o buscar otra ciudad.",
    "Reset filters": "Reiniciar filtros",
    "Directions": "Direcciones",
    "Details": "Detalles",
    "Address": "Direccion",
    "Get directions": "Como llegar",
    "Website": "Sitio web",
    "Legend": "Leyenda",
    "America": "America",
    "Europe": "Europa",
    "Admin Console": "Panel admin",
    "Moderation overview": "Resumen de moderacion",
    "Edit public submissions after users publish them.": "Edita envios publicos despues de que los usuarios los publiquen.",
    "Admin login": "Login admin",
    "Enter the admin password to edit public submissions.": "Ingresa la clave admin para editar envios publicos.",
    "Demo password:": "Clave demo:",
    "Log in": "Entrar",
    "Submissions": "Envios",
    "Collection centers": "Centros de acopio",
    "Organizations": "Organizaciones",
    "Fraud & flags": "Fraude y alertas",
    "Analytics": "Analiticas",
    "Published submissions": "Envios publicados",
    "Requests": "Solicitudes",
    "Centers": "Centros",
    "Verify": "Verificar",
    "Hide": "Ocultar",
    "Export CSV": "Exportar CSV",
    "View public site": "Ver sitio publico",
    "No submissions yet": "Todavia no hay envios",
    "Published user submissions will appear here.": "Los envios publicados por usuarios apareceran aqui.",
    "Public records": "Registros publicos",
    "Edit submitted info": "Editar informacion enviada",
    "Select a submission from the queue. Admins can correct or verify uploaded information, not create standalone tracking records.": "Selecciona un envio de la lista. Los admins pueden corregir o verificar informacion enviada, no crear registros separados.",
    "Choose the pencil button on a request to edit it.": "Elige el boton del lapiz en una solicitud para editarla.",
    "Save changes": "Guardar cambios",
    "Public submissions": "Envios publicos",
    "Edited records": "Registros editados",
    "Hidden": "Ocultos",
    "Funds tracked": "Fondos registrados",
    "Submitted center": "Centro enviado",
    "Verified center": "Centro verificado",
    "Real stories, reviewed and verified": "Historias reales, revisadas y verificadas",
    "Verified Families": "Familias verificadas",
    "Recent updates": "Actualizaciones recientes",
    "Donate to this family": "Donar a esta familia",
    "Share": "Compartir",
    "Verified by our team": "Verificado por nuestro equipo",
    "Volunteer dashboard": "Panel de voluntarios",
    "Lend your skills to Venezuela": "Presta tus habilidades a Venezuela",
    "Tell us how you can help and we'll connect you with the verified organizations where your skills make the biggest difference — from doctors to translators to developers.": "Cuentanos como puedes ayudar y te conectaremos con organizaciones verificadas donde tus habilidades hagan mayor diferencia: de doctores a traductores y desarrolladores.",
    "Register as a volunteer": "Registrarse como voluntario",
    "Choose a role": "Elige un rol",
    "Weekly availability": "Disponibilidad semanal",
    "Country & languages": "Pais e idiomas",
    "Select where you can help — you can pick more than one.": "Selecciona donde puedes ayudar; puedes elegir mas de una opcion.",
    "Apply to volunteer": "Postular como voluntario",
    "Trusted partners delivering aid": "Aliados confiables entregando ayuda",
    "Your help changes a life today": "Tu ayuda cambia una vida hoy",
    "Whether you give, volunteer your skills, or need support yourself — there's a verified, trusted path for you.": "Ya sea que dones, ofrezcas tus habilidades o necesites apoyo, hay un camino verificado y confiable para ti.",
    "Back to home": "Volver al inicio",
    "We couldn't find that page": "No pudimos encontrar esa pagina",
    "The link may be broken or the page may have moved.": "El enlace puede estar roto o la pagina pudo haberse movido.",
    "No results found": "No se encontraron resultados",
    "Search everything": "Buscar todo",
    "Try a different city, organization name, or category.": "Prueba otra ciudad, organizacion o categoria."
  };

  const placeholders = {
    "Search by country, city, address, accepted supplies...": "Busca por pais, ciudad, direccion o insumos aceptados...",
    "you@example.com": "tu@email.com",
    "e.g. Mérida": "ej. Merida",
    "Tell us what happened and what kind of help you need…": "Cuenta que paso y que tipo de ayuda necesitas...",
    "GoFundMe link, PayPal email, or Zelle…": "Enlace de GoFundMe, correo de PayPal o Zelle...",
    "Receipt, photo, drive link…": "Recibo, foto o enlace de Drive...",
    "Explain what has been received, delivered, pending, or how funds will be tracked…": "Explica que se ha recibido, entregado, que falta o como se rastrearan los fondos...",
    "Ej. HOLA Lakeway": "E.g. HOLA Lakeway",
    "Ej. Estados Unidos": "E.g. United States",
    "Ej. Doral": "E.g. Doral",
    "Ej. 1850 NW 84th Ave": "E.g. 1850 NW 84th Ave",
    "WhatsApp o telefono": "WhatsApp or phone",
    "Ej. Lun-Vie 9am-5pm": "E.g. Mon-Fri 9am-5pm",
    "Ej. Solo medicinas": "E.g. Medicine only",
    "Indicaciones o detalles": "Instructions or details",
    "Medicina, comida, vivienda...": "Medicine, food, housing...",
    "Cuenta que paso y que ayuda necesitas": "Tell us what happened and what help you need",
    "Zelle, GoFundMe, Pago Movil u otros detalles": "Zelle, GoFundMe, mobile payment or other details",
    "Que se ha recibido, que falta, y como se usaran los fondos": "What has been received, what is pending, and how funds will be used"
  };

  const reverseDictionary = {};
  Object.keys(dictionary).forEach((key) => { reverseDictionary[clean(dictionary[key])] = key; });
  const reversePlaceholders = {};
  Object.keys(placeholders).forEach((key) => { reversePlaceholders[clean(placeholders[key])] = key; });

  function clean(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function getLanguage() {
    try { return localStorage.getItem(KEY) || DEFAULT_LANG; } catch (e) { return DEFAULT_LANG; }
  }

  function setLanguage(lang) {
    const next = lang === "es" ? "es" : "en";
    try { localStorage.setItem(KEY, next); } catch (e) {}
    document.documentElement.lang = next;
    window.dispatchEvent(new CustomEvent("va-language-change", { detail: { lang: next } }));
    applyLanguage(next);
  }

  function translateTextNode(node, lang) {
    if (!textOriginals.has(node)) textOriginals.set(node, node.nodeValue);
    const original = textOriginals.get(node);
    const normalized = clean(original);
    const translated = lang === "es" ? dictionary[normalized] : reverseDictionary[normalized];
    const leading = original.match(/^\s*/)?.[0] || "";
    const trailing = original.match(/\s*$/)?.[0] || "";
    node.nodeValue = translated ? leading + translated + trailing : original;
  }

  function translateAttributes(el, lang) {
    ["placeholder", "aria-label", "title"].forEach((attr) => {
      if (!el.hasAttribute(attr)) return;
      let store = attrOriginals.get(el);
      if (!store) {
        store = {};
        attrOriginals.set(el, store);
      }
      if (!store[attr]) store[attr] = el.getAttribute(attr);
      const original = store[attr];
      const normalized = clean(original);
      const translated = lang === "es"
        ? (placeholders[normalized] || dictionary[normalized])
        : (reversePlaceholders[normalized] || reverseDictionary[normalized]);
      el.setAttribute(attr, translated || original);
    });
  }

  function walk(root, lang) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
      acceptNode(node) {
        const parent = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.closest("script, style, svg, path, noscript")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.TEXT_NODE) translateTextNode(node, lang);
      else translateAttributes(node, lang);
    }
  }

  function applyLanguage(lang = getLanguage()) {
    if (applying || !document.body) return;
    applying = true;
    document.documentElement.lang = lang;
    walk(document.body, lang);
    applying = false;
  }

  window.VALang = { getLanguage, setLanguage, applyLanguage };

  document.addEventListener("DOMContentLoaded", () => {
    applyLanguage();
    const observer = new MutationObserver(() => {
      if (!applying) setTimeout(() => applyLanguage(getLanguage()), 0);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
