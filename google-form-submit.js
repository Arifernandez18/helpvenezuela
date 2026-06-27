(function () {
  const FORMS = {
    center: {
      action: "https://docs.google.com/forms/d/e/1FAIpQLSe9HuhWFag1UYTw0dhYDS_OjUx0JA12iAlVwXDFzDiZFQIp4Q/formResponse",
      fields: {
        name: "entry.2111542119",
        country: "entry.1624348130",
        city: "entry.1043335046",
        address: "entry.3309479",
        phone: "entry.424041154",
        hours: "entry.838473256",
        supplies: "entry.1383609387",
        only: "entry.1506889287",
        notes: "entry.37247572",
        website: "entry.755232823",
        instagram: "entry.813601558"
      }
    },
    help: {
      action: "https://docs.google.com/forms/d/e/1FAIpQLSfbTpZS8ccLjrZrObeB1DFTxSXUZaY_C7GTJt3fyLOwaKDo5Q/formResponse",
      fields: {
        name: "entry.1649110661",
        email: "entry.1264652272",
        category: "entry.848192217",
        supportType: "entry.195272638",
        city: "entry.1913059678",
        state: "entry.1323681687",
        story: "entry.1736743023",
        requested: "entry.1413463865",
        method: "entry.1939278884",
        details: "entry.996822814",
        raised: "entry.280800158",
        receipt: "entry.1239704211",
        notes: "entry.1319322100"
      }
    }
  };

  function appendValue(formData, entry, value) {
    if (Array.isArray(value)) {
      value.filter(Boolean).forEach((item) => formData.append(entry, item));
      return;
    }
    formData.append(entry, String(value || "").trim());
  }

  async function submit(kind, values) {
    const config = FORMS[kind];
    if (!config) throw new Error("Unknown form: " + kind);
    const formData = new FormData();
    Object.keys(config.fields).forEach((key) => appendValue(formData, config.fields[key], values[key]));
    await fetch(config.action, { method: "POST", mode: "no-cors", body: formData });
    if (kind === "center" && window.VA_CENTERS && window.VA_CENTERS.refreshCenters) {
      setTimeout(() => window.VA_CENTERS.refreshCenters(), 1800);
    }
    if (kind === "help" && window.VADB && window.VADB.refreshRemote) {
      setTimeout(() => window.VADB.refreshRemote(), 1800);
    }
    return true;
  }

  window.VA_FORMS = { submit };
})();
