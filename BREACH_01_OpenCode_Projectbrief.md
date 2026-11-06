# BREACH_01 — Operation Black Vault
## Projectbrief en bouwinstructies voor OpenCode

**Versie:** 1.0  
**Doel:** Een zelfstandige, offline mini-hackinggame voor de open dag van de mbo-opleiding Software Developer.  
**Bouwstrategie:** Kleine, testbare stappen. Bouw niet het volledige product in één keer.

---

## 0. Instructie aan OpenCode (lees dit eerst)

Je bent de ontwikkelassistent voor **BREACH_01**. Dit document is de bron voor productkeuzes en acceptatiecriteria.

1. Lees eerst de hele projectbrief.
2. Stel vóór het programmeren een beknopt stappenplan voor met afzonderlijk testbare taken.
3. Implementeer **alleen de eerstvolgende bouwfase**; spring niet vooruit naar latere features.
4. Houd de techniek zo eenvoudig mogelijk. Geen frameworks, backend, database of extra dependencies zonder duidelijke noodzaak.
5. Geef na elke fase aan: welke bestanden zijn veranderd, hoe is het lokaal te testen, welke eisen zijn afgerond en wat is de volgende kleine stap.
6. Vermijd overengineering, demo-data met echte gegevens en onnodige architectuur.
7. Bij onduidelijkheid: kies voor de eenvoudigste oplossing die de bezoekerservaring ondersteunt en documenteer de aanname.

**Startopdracht:** Maak eerst een kort implementatieplan. Bouw daarna uitsluitend **Fase 1: de basisinterface en het startscherm**. Test dat de app lokaal werkt door `index.html` te openen. Stop vervolgens en beschrijf hoe Fase 1 gecontroleerd kan worden.

---

## 1. Het concept in één zin

**BREACH_01** is een cyberpunk-achtige, volledig fictieve cybersecurity-simulatie waarin een bezoeker in 3–5 minuten met een eenvoudige terminal een beveiligingslek ontdekt, een digitale kluis binnendringt en vervolgens met een mini-code-editor het probleem repareert.

**Pay-off:** *Hack it. Fix it. Become a developer.*

### Waarom bestaat dit?

Bezoekers moeten **ervaren** dat softwareontwikkeling meer is dan code intikken. Zij gaan:

- een digitaal systeem onderzoeken;
- een logische fout herkennen;
- de gevolgen van die fout zien;
- één stukje code zelf aanpassen;
- testen of de reparatie werkt.

Het doel is nieuwsgierigheid en plezier — geen toets, examen of realistische pentesttraining.

## 2. Doelgroep en randvoorwaarden

- **Primaire doelgroep:** jongeren van ongeveer 12–16 jaar, zonder programmeerervaring.
- **Secundair:** ouders, andere bezoekers en geïnteresseerden die al kunnen programmeren.
- **Duur:** idealiter 3 minuten; maximaal circa 5 minuten bij normaal gebruik.
- **Apparaat:** één Windows-laptop, eventueel aangesloten op groot scherm.
- **Gebruik:** één persoon tegelijk, met meekijkende bezoekers.
- **Taal:** Nederlandse uitleg en knoppen; bekende hackertermen mogen Engels zijn met duidelijke context.
- **Internet:** niet beschikbaar of niet nodig.
- **Installatie:** geen installatie of login voor bezoekers.
- **Begeleiding:** optioneel. Een bezoeker moet zelfstandig verder kunnen.
- **Reset:** altijd zichtbaar of gemakkelijk bereikbaar, zodat de volgende bezoeker direct kan starten.

### Niet het doel

Geen echte netwerkscan, geen shell, geen echte externe systemen, geen authenticatie naar een server, geen realistische exploitketen, geen accounts, geen multiplayer, geen scoringdatabase, geen AI-functionaliteit.

**Belangrijk:** Alles speelt zich af binnen de browserapp. Terminalcommando's zijn vooraf ontworpen spelacties, geen uitvoerbare besturingssysteemcommando's.

---

## 3. Verhaal en sfeer

**Operatienaam:** Operation Black Vault  
**Locatie in het verhaal:** Een fictief onderzoekscentrum met een digitale kluis.  
**Rol van bezoeker:** Junior ethical hacker, ingehuurd om een vermoedelijk beveiligingslek te onderzoeken.

### Introductietekst voor het startscherm

> **OPERATION BLACK VAULT**  
> In de digitale kluis van een onderzoekscentrum zit mogelijk een beveiligingsfout.  
> Jij bent ingeschakeld om het systeem te testen.  
> **Jouw missie:** ontdek het lek, breek in en repareer de beveiliging.  
> Geen programmeerervaring nodig.

**Primaire knop:** `START MISSIE`  
**Kleine ondertitel:** `Een fictieve hacking-simulatie — 3 tot 5 minuten`

Niet meer dan 2–3 zinnen instructie tegelijk tonen. Laat bezoekers leren door te doen.

---

## 4. Bezoekersflow — exact verloop

### Scherm A — Intro / briefing (15–20 seconden)

- Indrukwekkend maar overzichtelijk startscherm, met merknaam BREACH_01 en missiekaart.
- Bezoeker drukt op `START MISSIE`.
- Scherm schakelt naar de terminal.
- Er staat één duidelijke opdracht: **"Onderzoek het systeem. Begin met `help`."**

### Scherm B — Onderzoeken via terminal (45–90 seconden)

De terminal lijkt echt, maar accepteert slechts een kleine, gecontroleerde verzameling commando's.

**Commando's in MVP:**

| Commando | Betekenis / gewenste reactie |
|---|---|
| `help` | Toont beschikbare commando's met eenvoudige uitleg. |
| `scan` | Toont fictieve diensten: `BLACK_VAULT` en `AUTH_GATE`; hint dat het account `admin` bestaat. |
| `inspect auth` | Toont een verdacht fictief inloglog: gebruikersnaam correct, wachtwoord fout, toch toegang. |
| `login <gebruikersnaam> <wachtwoord>` | Voert een gesimuleerde inlogpoging uit met de kwetsbare beveiligingslogica. |
| `clear` | Maakt alleen de zichtbare terminalgeschiedenis leeg, niet de voortgang. |

**Gewenst ontdekpad:**

1. `help` — speler ontdekt welke opdrachten bestaan.
2. `scan` — speler ontdekt een authenticatiesysteem en de naam `admin`.
3. `inspect auth` — speler ziet iets vreemds: het systeem stond toegang toe ondanks een fout wachtwoord.
4. Speler probeert bijvoorbeeld `login admin 1234`.
5. De inlogpoging slaagt ten onrechte. De kluis is gekraakt.

**Cruciale ontwerpkeuze:** de terminal is geen star script. Wie eerder `login admin 1234` probeert, mag ook slagen; wie een ander commando kiest, krijgt een begrijpelijke reactie. De puzzel hoeft niet in een vaste volgorde opgelost te worden.

#### Voorbeeldterminal (fictieve output)

```text
BREACH_01 SECURITY TERMINAL
CONNECTED TO BLACK_VAULT (SIMULATION)
Type 'help' to begin.

> scan
[FOUND] BLACK_VAULT — secure storage
[FOUND] AUTH_GATE — authentication service
[INFO] Known account: admin

> inspect auth
[LOG] Username check: PASS
[LOG] Password check: FAIL
[LOG] Final decision: ALLOW
[WARNING] Suspicious authentication behavior detected.

> login admin 1234
[AUTH] Username: VALID
[AUTH] Password: INVALID
[!] ACCESS GRANTED
[!] SECURITY BREACH DETECTED
```

**Belangrijk:** `1234` is *expres niet* het juiste wachtwoord. De exploit werkt alleen vanwege de logische fout in de gesimuleerde code.

### Scherm C — Breach / wow-moment (5–10 seconden)

Na succesvolle misbruikpoging:

- De status gaat van `LOCKED` naar `BREACHED`.
- Een eenvoudige kluisanimatie / overlay toont `ACCESS GRANTED`.
- Korte, niet-verplichte animatie (liever CSS dan video).
- Daarna volgt direct de volgende missie:

> **Je bent binnen. Maar dit is niet veilig!**  
> Andere mensen kunnen precies hetzelfde doen.  
> **Repareer de code en beveilig de kluis.**

**Knop:** `OPEN CODE-EDITOR`

### Scherm D — Patch / code-editor (60–90 seconden)

De bezoeker ziet alleen een zeer klein stukje code:

```javascript
if (username === "admin" ||
    password === "secret123") {
  openVault();
}
```

- De bezoeker hoeft geen hele JavaScript-functie te schrijven.
- Alleen **`||`** is aanpasbaar. De rest is alleen leesbaar.
- De bezoeker kan `||` zelf vervangen door `&&` via een inline veldje of vergelijkbare simpele code-interactie.
- Toon uitleg op aanvraag, niet meteen het antwoord:
  - `||` betekent **OF**: één controle mag slagen.
  - `&&` betekent **EN**: beide controles moeten slagen.
- Een knop `TEST REPARATIE` voert automatisch de veiligheidstests uit.

**Geen nepresultaat:** de testuitslag moet echt voortkomen uit de gekozen operator in de browserlogica. Het hoeft geen ingevoerde JavaScript-code uit te voeren.

#### Tests na een patch

| Scenario | Veilige uitkomst |
|---|---|
| `admin` + verkeerd wachtwoord | `DENIED` |
| verkeerde gebruikersnaam + `secret123` | `DENIED` |
| `admin` + `secret123` | `GRANTED` |

Bij `||` falen minstens de eerste twee tests. Bij `&&` slagen alle drie.

Bij foutieve of ongeldige invoer: toon een vriendelijke foutmelding en geef de mogelijkheid opnieuw te proberen. Nooit een JavaScript-error of vastgelopen scherm tonen.

### Scherm E — Missie voltooid (15–20 seconden)

Bij drie geslaagde tests:

- Kluisstatus verandert naar `SECURED`.
- Toon groen schild / veiligheidsvisualisatie.
- Eindtekst:

> **MISSION COMPLETE — SYSTEM SECURED**  
> Je hebt een beveiligingslek ontdekt, uitgebuit én opgelost.  
> Dat is precies het soort probleem dat software developers leren begrijpen en oplossen.  
> **Titel verdiend: Junior Security Engineer**

**Knop:** `NIEUWE MISSIE` / `OPNIEUW SPELEN` — begint onmiddellijk bij het intro, zonder oude invoer of terminalgeschiedenis.

---

## 5. Hints — essentieel voor een drukke open dag

Een bezoeker mag nooit langer dan ongeveer 20–30 seconden vastzitten zonder een duidelijke manier om hulp te krijgen.

**MVP:** zichtbare knop `HINT` met contextgevoelige hints; geen automatisch aftellende timer nodig.

| Fase | Hint 1 | Hint 2 | Hint 3 |
|---|---|---|---|
| Terminalstart | "Ontdek welke opdrachten bestaan." | "Probeer `help`." | Klikbaar voorbeeld `help`. |
| Onderzoek | "Welke diensten zijn actief?" | "Gebruik `scan` en `inspect auth`." | Toon klikbaar `inspect auth`. |
| Inbraak | "Moet een fout wachtwoord altijd toegang weigeren?" | "Probeer de bekende gebruiker `admin` met een verzonnen wachtwoord." | Toon klikbaar `login admin 1234`. |
| Reparatie | "Twee controles moeten kloppen." | "Wat betekent OF en wat betekent EN?" | "Verander `||` in `&&`." |

- Hints stapelen binnen de huidige fase op, maar overschrijven de belangrijkste opdracht niet.
- Fouten geven feedback zonder straf of puntenaftrek.
- Er is **geen verplichte timer** en geen game-over.
- Na een succes mag de bezoeker direct verder; overslaan van lange animaties is mogelijk.

---

## 6. Interface en vormgeving

### Visuele richting

Een geloofwaardig mini-security-controlpanel met een moderne, verzorgde game-uitstraling. Geen generieke AI-landingpage.

- **Basis:** donkere achtergrond (`#0B1018` / diep antraciet).
- **Functionele kleuren:** zacht groen voor terminal/succes, gedempt cyaan voor interactieve elementen, amber/rood voor waarschuwingen.
- **Typografie:** duidelijke sans-serif voor uitleg; monospace voor code en terminal. Gebruik systeemfonts voor offline betrouwbaarheid.
- **Effecten:** subtiele cursor, statuspulsen, zachte transitions; vermijd zware glitch-effecten, continu knipperen of onleesbare tekst.
- **Decoratie:** gestileerd kluispictogram, beveiligingsstatus, dunne paneelranden, eventueel eenvoudige CSS/SVG-vormen.
- **Vermijd:** stockfoto's, externe afbeeldingen, overmatige neon, onnodige dashboards/grafieken, te kleine terminaltekst.

### Layout (laptop-first)

**Boven:** `BREACH_01`, huidige fase (bijv. `02 / 04`), globale knop `HERSTART`.  
**Midden links:** terminal óf code-editor (primaire activiteit).  
**Midden rechts:** visuele kluis met status `LOCKED`, `BREACHED` of `SECURED`.  
**Onder:** één duidelijke huidige opdracht, knoppen `HINT` / `VOLGENDE STAP` wanneer relevant.

Bij kleinere schermen mogen de panelen onder elkaar komen. De app moet in ieder geval goed werken op **1366×768** en **1920×1080**. Het belangrijkste moet zichtbaar zijn zonder eindeloos scrollen.

### Interactie

- Typen in terminal en Enter drukken moet werken.
- Geef waar zinvol **klikbare voorbeeldcommando's** als toegankelijk alternatief.
- Zichtbare focus-ringen, voldoende contrast, labels bij invoervelden.
- Een `HERSTART`-knop staat op alle schermen; een simpele bevestiging mag, maar voorkom extra stappen voor de volgende bezoeker.
- Animaties respecteren `prefers-reduced-motion`.
- Geluid is **niet nodig** voor de MVP; als het later wordt toegevoegd: standaard uit of met duidelijke mute-knop.

---

## 7. Functionele logica

### Simulatie van kwetsbaarheid

Het **oorspronkelijke systeem** heeft bewust deze fout:

```javascript
username === "admin" || password === "secret123"
```

Daarom kan `admin` met een verkeerd wachtwoord binnenkomen; iemand met de verkeerde naam maar wel het juiste wachtwoord kan ook binnenkomen.

De **gerepareerde logica** is:

```javascript
username === "admin" && password === "secret123"
```

Dit is een *educatief voorbeeld van een programmeerfout*, geen blauwdruk voor echte authenticatie. Benoem kort dat echte applicaties authenticatie veilig aan de serverkant moeten afhandelen. Maak van die uitleg geen obstakel voor het spel.

### Toegestane commando's

- De terminal verwerkt uitsluitend een eigen, kleine set commando's in JavaScript.
- Er wordt **nooit** een echte shell gestart.
- `login` accepteert twee argumenten (gebruikersnaam en wachtwoord) en evalueert deze tegen de gesimuleerde conditie.
- `help`, `scan`, `inspect auth` en `clear` hebben voorspelbare reacties.
- Onbekende opdrachten: `Onbekend commando. Typ help voor de mogelijkheden.`
- Ongeldige login-syntax: `Gebruik: login <gebruikersnaam> <wachtwoord>`.
- Behandel invoer als tekst; voer geen invoer als code uit.

### Patch-editor

- Toon code met één bewerkbaar operatorveld; dit mag eruitzien als echte code.
- Ondersteun `||` en `&&`; geef foutmelding op andere invoer.
- Geen `eval`, `new Function` of dynamische uitvoering van bezoekerscode.
- Bij `TEST REPARATIE` worden vaste scenario's daadwerkelijk berekend met de geselecteerde operator.
- Toon per test **verwachte uitkomst**, **werkelijke uitkomst** en pass/fail.
- Alleen alle tests geslaagd betekent `MISSION COMPLETE`.

### Status en reset

Gebruik een centrale, eenvoudige appstatus, bijvoorbeeld:

- `intro`
- `terminal`
- `breached`
- `patch`
- `complete`

Bewaar alleen tijdelijke voortgang in browsergeheugen. De `HERSTART`-actie wist alle geschiedenis, hints, ingevulde gegevens, bewerkte operator en testresultaten. Na het herladen begint de ervaring opnieuw.

---

## 8. Technische eisen

**Voorkeursstack:** vanilla HTML + CSS + JavaScript.

**Waarom:** laagste drempel, geen package manager, geen development server nodig, direct vanaf een laptop te openen. Kies geen React/Svelte/Vite voor de MVP.

**Voorgestelde structuur:**

```text
breach-01/
├── index.html
├── styles.css
├── app.js
└── README.md
```

Verdere opsplitsing alleen als de code anders onduidelijk wordt.

### Verplicht

1. Startbaar door simpelweg `index.html` in een moderne browser te openen (**file://**).
2. Geen netwerkverzoeken: geen CDN, externe fonts, API's, analytics of externe afbeeldingen.
3. Geen echte netwerk-, hack- of shellacties.
4. Werkt in recente Chrome en Edge (Firefox is gewenst).
5. Goed leesbaar op een laptop, ook met bezoekers die meekijken.
6. Geen opslag van echte persoonsgegevens, wachtwoorden of accounts.
7. Toegankelijke toetsenbordbediening en begrijpelijke foutmeldingen.
8. Geen runtimefouten in de browserconsole bij normaal gebruik.
9. `README.md` met startinstructie, speluitleg en resetgedrag.
10. Geen zware animaties of optionele library als die ook simpel met CSS kan.

---

## 9. Kleine, testbare bouwfases voor OpenCode

**Werk per fase. Ga niet automatisch door naar de volgende fase.** Na iedere fase moet het resultaat bruikbaar en zichtbaar zijn.

### Fase 1 — Visuele basis + introductie

**Bouw:** `index.html`, `styles.css`, minimale `app.js`, algemene layout, missie-intro en knop `START MISSIE` die naar een lege terminalweergave gaat. Overige knoppen mogen nog ontbreken.

**Klaar wanneer:** app offline opent, het startscherm leesbaar is, de overgang naar terminal werkt en `HERSTART` terug naar de intro gaat.

### Fase 2 — Terminal en commando's

**Bouw:** terminalinput, Enter-to-submit, scrollbare uitvoer, `help`, `scan`, `inspect auth`, `clear`; onbekende commando's en syntaxfeedback; huidige opdracht en eerste hints.

**Klaar wanneer:** bezoeker zonder kennis via `help` → `scan` → `inspect auth` het lek kan onderzoeken.

### Fase 3 — Gesimuleerde inbraak

**Bouw:** `login <username> <password>` met de kwetsbare `||`-logica, verschillende uitkomsten, breachstatus en een korte overgang naar de patchfase.

**Klaar wanneer:** `login admin 1234` onterecht toegang geeft en `login guest wrong` toegang weigert. Er wordt niets buiten de app uitgevoerd.

### Fase 4 — Code-editor + tests

**Bouw:** readonly code met bewerkbare operator, inline uitleg/hints, `TEST REPARATIE` met drie echte logische checks en duidelijke testresultaten.

**Klaar wanneer:** `||` de tests laat falen, `&&` alle tests laat slagen, en een ongeldige operator netjes wordt afgewezen.

### Fase 5 — Eindscherm + volledige reset

**Bouw:** `SYSTEM SECURED`-eindscherm, subtiele succesanimatie, knop `NIEUWE MISSIE`, complete reset van alle spelstatussen.

**Klaar wanneer:** twee bezoekers achter elkaar dezelfde ervaring kunnen doen zonder informatie van elkaar te zien.

### Fase 6 — Kwaliteitsronde

**Bouw:** UI-afwerking, responsive gedrag, toetsenbordtoegankelijkheid, visuele duidelijkheid, tekstcorrecties, optionele kleine visuele kluisanimatie.

**Klaar wanneer:** iemand zonder instructie het spel in 3–5 minuten kan doorlopen en de offline-checklist slaagt.

**Wens voor OpenCode:** maak per fase een klein overzicht van wijzigingen en handmatige teststappen. Voer waar mogelijk zelf statische controles uit, maar claim nooit dat iets handmatig in een browser getest is als dat niet gebeurd is.

---

## 10. Acceptatietests / definitie van gereed

### Happy path

- [ ] Start `index.html` zonder internet of buildproces.
- [ ] Klik `START MISSIE`.
- [ ] Voer `help`, `scan`, `inspect auth` uit.
- [ ] Voer `login admin 1234` uit: **ACCESS GRANTED** ondanks fout wachtwoord.
- [ ] Ga naar code-editor.
- [ ] Test ongewijzigde `||`: onveilige testcases falen.
- [ ] Wijzig `||` naar `&&` en klik `TEST REPARATIE`.
- [ ] Alle drie veiligheidstests slagen.
- [ ] `SYSTEM SECURED` verschijnt.
- [ ] Klik `NIEUWE MISSIE` en controleer dat alles gereset is.

### Negatieve en praktische tests

- [ ] `login guest wrong` geeft `ACCESS DENIED`.
- [ ] `login guest secret123` slaagt **vóór** reparatie (toont de tweede kant van de kwetsbaarheid).
- [ ] Na reparatie faalt `admin` + fout wachtwoord.
- [ ] Na reparatie faalt verkeerde gebruiker + juist wachtwoord.
- [ ] Na reparatie slaagt alleen `admin` + `secret123`.
- [ ] Onbekend terminalcommando geeft bruikbare hulp.
- [ ] Lege input of foute operator crasht niet.
- [ ] `HERSTART` werkt vanuit iedere fase.
- [ ] App werkt zonder internet; browsernetwerkpaneel toont geen externe resources.
- [ ] Terminal is te bedienen met toetsenbord en Enter.
- [ ] Hoofdtekst en knoppen zijn leesbaar op 1366×768.
- [ ] Er zijn geen relevante browserconsolefouten.

---

## 11. Buiten de MVP houden

De volgende ideeën zijn interessant, maar mogen de eerste versie niet vertragen:

- meerdere levels of moeilijkheidsgraden;
- aanvullende beveiligingslekken (bijvoorbeeld rechtencontrole);
- score, leaderboard of badges die worden opgeslagen;
- geluidseffecten;
- echte code-editorbibliotheek zoals Monaco;
- typanimaties met veel wachttijd;
- gebruikersaccounts, QR-codes of certificaatgeneratie;
- deployment, cloudhosting of servercomponenten.

Maak eerst de **volledige basisflow leuk, duidelijk en robuust**. Breid daarna pas uit.

---

## 12. Criteria voor ontwerpbeslissingen

Bij een keuze tussen twee oplossingen heeft de volgende volgorde prioriteit:

1. **Begrijpelijkheid voor 12–16-jarigen** zonder programmeerkennis.
2. **Direct zichtbaar resultaat** en plezier.
3. **Veiligheid en offline betrouwbaarheid**.
4. **Makkelijk resetten en snel opnieuw gebruiken**.
5. **Eenvoudige, onderhoudbare code**.
6. **Visuele flair**, alleen als het de bovenstaande punten niet in de weg zit.

Vermijd de valkuil om een indrukwekkend 'hacker-dashboard' te bouwen dat weinig interactie bevat. De bezoeker moet zelf onderzoeken, testen en repareren.

---

## 13. Handige vervolgprompts voor OpenCode

Gebruik deze **één voor één**, na het beoordelen van de vorige fase.

**Na Fase 1:**

> Lees `BREACH_01_OpenCode_Projectbrief.md` opnieuw en implementeer uitsluitend Fase 2: terminalinput, de commando's help/scan/inspect auth/clear, foutmeldingen en eerste hints. Houd alle functionaliteit volledig lokaal. Voeg korte handmatige teststappen toe en stop na deze fase.

**Na Fase 2:**

> Implementeer uitsluitend Fase 3 volgens de projectbrief: gesimuleerde login met de bewust kwetsbare OR-logica, en de visuele overgang naar de patchfase. Test de gewenste inlogscenario's. Ga nog niet verder met de editor.

**Na Fase 3:**

> Implementeer uitsluitend Fase 4 volgens de projectbrief: de mini-code-editor, het daadwerkelijk wijzigen van de operator en drie automatische logische tests. Gebruik geen eval of uitvoerbare bezoekerscode. Toon de uitkomsten helder en stop na deze fase.

**Na Fase 4:**

> Implementeer uitsluitend Fase 5: het missiesucces en het volledig resetten van alle browserstatus. Controleer dat twee bezoekers achter elkaar opnieuw kunnen spelen.

**Tot slot:**

> Voer Fase 6 uit: controleer de volledige acceptatiechecklist, maak de interface geschikt voor 1366×768 en 1920×1080, verbeter toegankelijkheid en visuele afwerking en werk README bij. Houd alle assets lokaal en rapporteer eventuele ongeteste punten.

---

**Einde projectbrief.**
