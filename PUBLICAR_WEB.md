# Publicar Venezuela Ayuda

Sube toda esta carpeta a tu hosting estatico: `C:\Users\arian\Downloads\Venezuela ayuda`.

Paginas principales:

- Inicio: `index.html`
- Centros de acopio: `collection-centers.html`
- Agregar centro: `add-center.html`
- Donar: `donate.html`
- Pedir ayuda: `request-help.html`
- Formulario interno de ayuda: `help-request-form.html`
- Familias verificadas: `verified-families.html`
- Voluntariado: `volunteers.html`
- Busqueda: `search.html`
- Admin: `admin.html`

Tambien debes subir estos archivos y carpetas porque la pagina los usa:

- `assets/`
- `support.js`
- `theme.css`
- `data.js`
- `va-lang.js`
- `va-db.js`
- `va-centers.js`
- `google-form-config.js`
- `google-form-submit.js`
- `supabase-config.js`
- `Nav.dc.html`
- `Footer.dc.html`

Notas:

- La pagina principal debe abrir automaticamente como `index.html`.
- El admin directo sera `tudominio.com/admin.html`.
- Los formularios internos envian respuestas a Google Forms y luego se leen desde las hojas CSV publicadas.
- Verificar/ocultar centros desde admin funciona en el navegador donde se hace la accion. Para borrar un centro para todos, elimina la fila en Google Sheets.
