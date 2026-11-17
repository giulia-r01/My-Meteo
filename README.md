# myMeteo

Single page application meteo in italiano, realizzata con React e Vite. Ricerca città con scelta della località, meteo attuale, otto ore successive, dettagli e previsioni a sette giorni. Include cambio °C/°F e preferiti salvati nel browser.

## Avvio

```sh
npm install
npm run dev
```

Su Windows, se PowerShell blocca `npm.ps1`, usare `npm.cmd`. Per la build di produzione: `npm run build`; per servirla localmente: `npm run preview`.

I test del servizio meteo si eseguono con `npm test`, senza richieste di rete.

All’avvio viene ripristinata l’ultima città scelta; senza una scelta precedente si mostra Firenze. Il pulsante «Usa la mia posizione» richiede il consenso del browser e carica il meteo dalle coordinate. Il servizio di geocodifica inversa [BigDataCloud](https://www.bigdatacloud.com/docs/free-api/free-reverse-geocode-to-city-api), chiamato direttamente dal browser con le coordinate rilevate, permette di mostrare città e regione in italiano. Le previsioni mantengono le coordinate originali del dispositivo. La ricerca del nome viene annullata dopo 5 secondi: in caso di errore il meteo resta disponibile e un messaggio spiega che il nome della città non è stato recuperato. Se il permesso è già concesso, la posizione viene cercata automaticamente. In caso di rifiuto o errore, resta disponibile la ricerca manuale. La geolocalizzazione richiede HTTPS oppure localhost; le coordinate del dispositivo non vengono memorizzate come ultima città. Un luogo viene salvato nei preferiti solo premendo «Salva».

## Dati e accessibilità

I dati sono forniti da [Open-Meteo](https://open-meteo.com/) e dalla sua API di geocodifica, senza chiavi nel client. L’endpoint gratuito è destinato all’uso non commerciale: verificare le condizioni del fornitore prima di un utilizzo commerciale. Gli orari si riferiscono alla località selezionata. Le chiamate richiedono una connessione; eventuali errori sono segnalati e possono essere ritentati.

## Struttura

- `App.jsx`: punto di ingresso dell’interfaccia.
- `pages/WeatherPage.jsx`: composizione della pagina e collegamento fra dati e sezioni.
- `components/layout/`: intestazione, logo, footer e ritorno in alto.
- `components/weather/`: ricerca città, meteo attuale, previsioni orarie, dettagli e settimana.
- `hooks/`: caricamento meteo, ricerca, preferenze persistenti e sezione attiva.
- `services/weatherApi.js`: accesso alle API e conversione delle risposte nel modello usato dall’interfaccia.
- `utils/`: formattazione e accesso protetto allo storage; `data/`: città suggerite.

Lo stato resta vicino al componente che lo usa: la ricerca non fa ridisegnare l’intera pagina ad ogni carattere e lo scorrimento aggiorna solo la navigazione e il pulsante di ritorno in alto. Non servono librerie aggiuntive per lo stato globale.

## Accessibilità

Navigazione per ancore nella stessa pagina, link per saltare al contenuto, focus visibile, controlli con nomi accessibili, notifiche di stato, supporto alla riduzione del movimento e layout adattivo. Le ore si scorrono anche da tastiera. I preferiti e l’unità scelta restano nel browser; se lo storage è disabilitato funzionano nella sessione corrente.
