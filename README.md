# pdp-shopify-callmewine

Progetto demo per il product detail page e carrello Shopify con gestione del regalo e messaggio personalizzato.

## Live demo

Il progetto è disponibile compilato su [Vercel](https://pdp-shopify-callmewine.vercel.app).

## Setup locale

1. Crea un file `.env` nella radice del progetto.
2. Imposta le variabili di ambiente:

```env
SHOPIFY_ENDPOINT="https://XXXX"
SHOPIFY_TOKEN="XXXXXXXXX"
```

3. Installa le dipendenze:

```bash
npm install
```

4. Avvia l'app in locale:

```bash
npm run dev
```

## Architettura del progetto

Questo progetto è basato su Nuxt 3 e utilizza un piccolo BFF (Backend For Frontend) lato `server/api` per gestire le chiamate a Shopify e l'interazione con il carrello.

### Struttura principale

- `app/pages/` - contengono le pagine Vue:
  - `index.vue` - homepage o lista prodotti
  - `products/[id].vue` - pagina prodotto dinamica (product detail page)
- `app/components/` - componenti riutilizzabili dell'interfaccia, ad esempio `Header.vue` e `CartPanel.vue`.
- `composables/` - logica riutilizzabile:
  - `useCart.ts` - gestione dello stato del carrello
  - `useProduct.ts` - caricamento dati prodotto
  - `useLocale.ts` - gestione localizzazione e traduzioni
- `server/api/` - endpoint BFF:
  - `product.ts` - recupera dati prodotto da Shopify
  - `cart/create.post.ts` - crea il carrello o aggiunge articoli
  - `cart/get.get.ts` - legge lo stato corrente del carrello
- `utils/` - helper e formatter condivisi, ad esempio `formatters.ts`.
- `i18n/locales/` - traduzioni per le lingue supportate: `en`, `es`, `fr`, `it`.

### Flow di visualizzazione e BFF

L'interfaccia utente chiama i composables dal frontend per ottenere i dati. Questi composables invocano gli endpoint in `server/api/`, che a loro volta parlano con Shopify usando le credenziali definite in `.env`.

Questo approccio mantiene separata la logica di business frontend (view) dalla logica di integrazione con Shopify, migliorando sicurezza e manutenibilità.

## Gestione del regalo + messaggio

Per il pacco regalo e il messaggio ho scelto di utilizzare i `Line Item Attributes` di Shopify.

- Vantaggio: il dato viene legato al singolo prodotto.
- Permette di generare più linee distinct nel carrello anche se lo stesso `variantId` viene aggiunto più volte.

Se il pacco regalo dovesse essere legato all'intero carrello, si potrebbe invece utilizzare `Cart Attributes`.

> In generale, questa soluzione è ideale quando non è possibile modificare i prodotti lato Shopify, perché consente di gestire l'intero flusso solo dal frontend.
