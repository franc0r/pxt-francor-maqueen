# pxt-francor-maqueen

[English](#english) | [Deutsch](#deutsch)

## English

MakeCode extension for the DFRobot Maqueen Plus V3/V2 robot and the Matrix LiDAR distance sensor, by FRANCOR e. V.
Blocks are written in English; a complete German translation is in `_locales/de/`.

### Use it

In MakeCode (micro:bit) open **Extensions**, paste `https://github.com/franc0r/pxt-francor-maqueen` and press Enter.
Two categories appear: **Maqueen** and **LiDAR**. Everything is plain TypeScript, so it compiles in the browser and works offline once loaded.

### Blocks

**Maqueen**

- V3: `start Maqueen`, `drive left/right`, `drive`, `stop motors`, `line following on/off`, `line following speed`, crossing rules (`at crossroad`, `at T-junction`, `at left-or-straight`, `at right-or-straight`), `junction seen`, `when crossing number … reached`, `crossings counted`, `reset crossing counter`, `headlight`, `drive … cm`, `turn … °`, `stop drive move`. Advanced: `wheel speed`, `ambient light`, `firmware version`.
- Line: `sensor … sees line`, `raw value sensor`, `line position`.
- Lights: `set light … to …`, colours, `red … green … blue …`, `light brightness`, `all lights off`.
- V2: `start Maqueen V2`, `drive … (V2)`, `stop motors (V2)`, `red LED`, `ultrasonic distance (cm)`.

**LiDAR**: `start LiDAR`, `distance … (mm)`, `avoid direction`, `avoid distance`.

### Error values

- `line position` gives **100** when no sensor sees the line. In calculations such as `40 - 20 * line position` this is a huge value; the motor blocks limit it to -100…100.
- The LiDAR must be set to I2C address **0x33** (DIP switches, as delivered on the Maqueen V3); otherwise it reads 9999 forever, like "no sensor".
- `distance … (mm)` gives **9999** when the LiDAR is not started, still booting or not connected. It never counts as an obstacle (`< 200` stays false).

### Notes for developers

- `line position` reads the sensors on every call. If you use it twice in one calculation, store it in a variable first.
- Setup and checks:

```
PUPPETEER_SKIP_DOWNLOAD=1 npm ci
npx pxt target microbit && npx pxt install
npm run build
npm test
npm run check:locales
```

- Device tests (checklist and programs to paste into a project) are in `geraetetest/`. They are not part of the package.
- Values still to be checked on the robot are marked `// VORLÄUFIG (Gerätetest):` in the code.
- Hardware protocol: see the Rust driver of FRANCOR e. V., the reference for the registers used here: <https://github.com/franc0r/francor-maqueen-plus> and <https://github.com/franc0r/francor-maqueen-plus-microbit>.

### License

MIT, FRANCOR e. V.

## Deutsch

MakeCode-Erweiterung für den DFRobot Maqueen Plus V3/V2 und den Matrix-LiDAR-Abstandssensor von FRANCOR e. V.
Die Blöcke sind im Code englisch, die deutsche Übersetzung steht vollständig in `_locales/de/`.

### Benutzen

In MakeCode (micro:bit) auf **Erweiterungen** gehen, `https://github.com/franc0r/pxt-francor-maqueen` einfügen und Enter drücken.
Es erscheinen zwei Kategorien: **Maqueen** und **LiDAR**. Alles ist reines TypeScript, wird also im Browser kompiliert und geht offline, sobald es geladen ist.

### Blöcke

**Maqueen**

- V3: `starte Maqueen`, `fahre links/rechts`, `fahre`, `stoppe Motoren`, `Linienverfolgung an/aus`, `Linien-Tempo`, Kreuzungsregeln (`an Kreuzung`, `an T-Kreuzung`, `an Abzweig links`, `an Abzweig rechts`), `erkannte Kreuzung`, `wenn Kreuzung Nummer … erreicht`, `Kreuzungen gezählt`, `setze Kreuzungszähler zurück`, `Scheinwerfer`, `fahre … cm`, `drehe … °`, `stoppe Fahrbefehl`. Erweitert: `Radgeschwindigkeit`, `Umgebungslicht`, `Firmware-Version`.
- Linie: `Sensor … sieht Linie`, `Rohwert Sensor`, `Linienlage`.
- Lichter: `setze Licht … auf …`, Farben, `rot … grün … blau …`, `Licht-Helligkeit`, `alle Lichter aus`.
- V2: `starte Maqueen V2`, `fahre … (V2)`, `stoppe Motoren (V2)`, `rote LED`, `Ultraschall-Abstand (cm)`.

**LiDAR**: `LiDAR einschalten`, `Abstand … (mm)`, `Ausweichrichtung`, `Ausweich-Abstand`.

### Fehlerwerte

- `Linienlage` liefert **100**, wenn kein Sensor die Linie sieht. In einer Rechnung wie `40 - 20 × Linienlage` ist das ein riesiger Wert; die Motorblöcke begrenzen auf −100…100.
- Der LiDAR muss auf die I2C-Adresse **0x33** eingestellt sein (DIP-Schalter, wie beim Maqueen V3 geliefert); sonst liest er für immer 9999, wie „kein Sensor“.
- `Abstand … (mm)` liefert **9999**, wenn der LiDAR nicht gestartet, noch im Hochlauf oder nicht angeschlossen ist. Das zählt nie als Hindernis (`< 200` bleibt falsch).

### Hinweise für Entwickler

- `Linienlage` liest die Sensoren bei jedem Aufruf neu. Wer sie in einer Rechnung zweimal braucht, speichert sie erst in einer Variablen.
- Einrichten und prüfen:

```
PUPPETEER_SKIP_DOWNLOAD=1 npm ci
npx pxt target microbit && npx pxt install
npm run build
npm test
npm run check:locales
```

- Gerätetests (Checkliste und Programme zum Einfügen in ein Projekt) stehen in `geraetetest/`. Sie gehören nicht zum Paket.
- Werte, die noch am Roboter zu prüfen sind, tragen im Code die Marke `// VORLÄUFIG (Gerätetest):`.
- Hardware-Protokoll: der Rust-Treiber von FRANCOR e. V. ist die Referenz für die verwendeten Register: <https://github.com/franc0r/francor-maqueen-plus> und <https://github.com/franc0r/francor-maqueen-plus-microbit>.

### Lizenz

MIT, FRANCOR e. V.
