# Google Form setup for Venezuela Ayuda

Use this if you want the website to work without Supabase or a custom backend.

## 1. Create the Google Form

Create these questions in Google Forms:

1. Full name
2. Email address
3. Category
4. What are you requesting?
   - Money
   - Supplies
   - Both
5. City
6. State
7. Describe your situation
8. Amount needed (USD)
9. Preferred donation method
10. Donation details
11. Funds already received (USD)
12. Receipt / proof link
13. Fund tracking notes

The website also understands Spanish versions like `Nombre completo`, `Correo`, `Categoria`, `Ciudad`, `Estado`, `Monto solicitado`, `Detalles`, `Recibo` and `Notas`.

## 2. Connect the responses to Google Sheets

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
window.VA_GOOGLE_FORM = {
  formUrl: "PASTE_THE_PUBLIC_GOOGLE_FORM_LINK_HERE",
  csvUrl: "PASTE_THE_PUBLISHED_GOOGLE_SHEET_CSV_LINK_HERE"
};
```

After that:

- `Request Help` sends people to the Google Form.
- `Verified Families` shows submitted requests.
- `Transparency` shows fund tracking fields from the sheet.

Important: without a backend, admin edits are only local to the browser where they are made. To edit publicly for everyone, update the Google Sheet row directly.
