# Sito web — Lucia Cercolani Parrucchieri Estetica

Sito statico (HTML + CSS + JS puro, nessuna build necessaria) creato a partire dalla
scheda Google Maps del salone.

## Struttura

```
index.html
css/style.css
js/script.js
assets/images/
  hero-salone.svg    ← placeholder foto principale
  about-salone.svg   ← placeholder foto "Chi siamo"
  gallery-1.svg       ← placeholder foto extra
  favicon.svg
```

## Come sostituire le foto

I placeholder sono file SVG con etichetta. Per sostituirli:

1. Esporta le foto reali del salone (es. quelle da Google Maps, in buona risoluzione).
2. Rinominale `hero-salone.jpg` e `about-salone.jpg`.
3. Sostituisci nei tag `<img>` di `index.html` il riferimento da `.svg` a `.jpg`
   (due punti: uno nella sezione hero, uno nella sezione "Chi siamo").
4. Carica i file `.jpg` dentro `assets/images/`, al posto degli `.svg` (o accanto,
   basta che il nome combaci col riferimento nell'HTML).

## Pubblicare gratis su GitHub Pages

1. Crea un nuovo repository su GitHub (es. `lucia-cercolani-sito`), pubblico.
2. Carica tutti i file di questa cartella nella root del repository
   (mantenendo la struttura `css/`, `js/`, `assets/`).
3. Vai su **Settings → Pages** nel repository.
4. In **Source**, seleziona il branch `main` e la cartella `/root`, poi **Save**.
5. Dopo 1-2 minuti il sito sarà online su:
   `https://<tuo-utente-github>.github.io/lucia-cercolani-sito/`

## Cose da personalizzare prima di andare online

- **Link recensioni Google**: nel file `index.html`, cerca `reviews-more` e sostituisci
  l'URL con il link diretto alla scheda Google Maps del salone (quello con "Scrivi una
  recensione" / tutte le recensioni).
- **Prezzi servizi**: la sezione "Servizi" non riporta prezzi (non presenti nella
  panoramica fornita). Se vuoi aggiungerli, modifica le card in `index.html`
  (sezione `#servizi`).
- **Foto**: vedi sopra.

## Note tecniche

- Font: Fraunces (titoli) + Manrope (testo), caricati da Google Fonts via CDN.
- Nessuna dipendenza da installare: apri semplicemente `index.html` nel browser
  per vedere un'anteprima locale.
- Lo stato "Aperto ora / Chiuso ora" in home è calcolato automaticamente in
  JavaScript in base agli orari reali del salone (martedì–venerdì 9–19,
  sabato 8:30–19, lunedì e domenica chiuso).
