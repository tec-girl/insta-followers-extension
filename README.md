# 🔍 insta-followers — Extractor (extensión de navegador)

Compañera de la app web **[insta-followers](https://tec-girl.github.io/insta-followers.github.io/)**:
extrae **tus propias** listas de Instagram usando la sesión que ya tienes iniciada en
instagram.com y calcula al momento:

- ✅ A quién **sigues**
- 👥 Quién **te sigue**
- ❌ A quién sigues y **no te sigue de vuelta**
- 💌 Quién te sigue y **no sigues de vuelta**

con buscador, copiar y descargar — y **caché local**: al reabrir la extensión, tus listas
siguen ahí sin volver a extraer.

## Seguridad (léelo, es la gracia del diseño)

- **Nunca pide tu contraseña.** Solo funciona si YA iniciaste sesión en instagram.com
  en tu navegador, y solo extrae la cuenta de esa sesión (la tuya).
- **Todo es local:** las listas se calculan en tu navegador y se guardan en el
  almacenamiento de la extensión en tu dispositivo. Nada se envía a ningún servidor.
- **Ritmo lento a propósito** (1.4–2.6 s entre páginas): es la forma respetuosa de leer
  listas largas sin disparar las defensas de Instagram.
- ⚠️ Aun así: leer con automatización es algo que los términos de Instagram restringen.
  Úsala solo con tu propia cuenta y con moderación; si Instagram te pide verificar que
  eres tú, hazlo en la pestaña y espera antes de reintentar.

## Instalación (Chrome / Edge / Brave)

1. Descarga **`insta-followers-extension.zip`** de este repo y descomprímelo.
2. Abre `chrome://extensions` y activa **Modo de desarrollador** (arriba a la derecha).
3. Clic en **Cargar descomprimida** y elige la carpeta descomprimida.
4. Abre **instagram.com** (con tu sesión iniciada), entra a cualquier página de Instagram
   y haz clic en el icono 🔍 de la extensión → **Extraer mis listas**.

## Archivos

`manifest.json` · `popup.html` / `popup.css` / `popup.js` (interfaz en 6 idiomas) ·
`extractor.js` (lógica de extracción con ritmo lento) · `icons/`

Hecho con 💜 por **Tec Girl** — sin afiliación con Instagram ni Meta.
