# pdp-shopify-callmewine

il progetto è disponibile compilato su ______________________

per lanciarlo in locale basta creare un file .env così impostato con l'endpoint graphql e lo storefront access Token

SHOPIFY_ENDPOINT="https://XXXX"
SHOPIFY_TOKEN="XXXXXXXXX"

dopodichè lanciare npm install per le dipendenze e poi npm run dev per fare il run del progetto in locale

Per quanto riguarda la gestione del pacco regalo + messaggio ho scelto di utilizzare i Line Item Attributes, così da legare il dato al singolo prodotto (e nel caso generare diverse linee nel carrello nonostante si abbia lo stesso variantId).
Nel caso il pacco regalo debba essere invece legato all'intero carrello, allora avrei potuto utilizzare i Cart Attributes.
In generale questo approccio permette la libertà di gestire il tutto solo FE visto che non abbiamo avuto la possibilità di modificare i prodotti lato shopify.