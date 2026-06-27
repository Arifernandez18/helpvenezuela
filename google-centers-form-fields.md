# Google Form setup for international collection centers

Use this for people to submit collection centers from any country.

## 1. Create the Google Form

Create these questions:

1. Center name
2. Country
3. State / Province
4. City
5. Address
6. Phone
7. Hours
8. What supplies does this center receive?
   - Example: `Medicamentos, insumos medicos, alimentos no perecederos`
   - If the center only receives one kind of donation, write only that type.
9. Only receives
   - Optional. Example: `Solo medicamentos` or `Solo comida para mascotas`.
10. Notes
11. Website
12. Instagram

Spanish field names also work, including `Nombre del centro`, `Pais`, `Ciudad`, `Direccion`, `Telefono`, `Horario`, `Que insumos recibe`, `Solo recibe` and `Notas`.

## 2. Connect responses to Google Sheets

In Google Forms:

1. Open `Responses`.
2. Click the Google Sheets icon.
3. Create or select the response spreadsheet.

## 3. Publish the sheet as CSV

In the response spreadsheet:

1. Go to `File`.
2. Choose `Share`.
3. Choose `Publish to web`.
4. Select the responses sheet/tab.
5. Choose `Comma-separated values (.csv)`.
6. Copy the public CSV link.

## 4. Paste both links into the site

Open `google-form-config.js` and paste:

```js
centerFormUrl: "PASTE_THE_PUBLIC_CENTER_FORM_LINK_HERE",
centerCsvUrl: "PASTE_THE_PUBLISHED_CENTER_SHEET_CSV_LINK_HERE"
```

After that:

- The collection centers page shows an `Agregar centro internacional` button.
- Submitted centers are added to the map and list.
- Search works by country, city, address and accepted supplies.
- The center card/details show if it only receives a specific type of supply.
