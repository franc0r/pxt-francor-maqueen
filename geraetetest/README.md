# Gerätetest

Für Martin, am Roboter. Jedes Programm prüft einen Bereich. So geht's:

1. In MakeCode ein neues Projekt anlegen, Erweiterung `https://github.com/franc0r/pxt-francor-maqueen` hinzufügen.
2. Oben auf **JavaScript** umschalten, alles ersetzen durch den Inhalt der Datei, zurück auf **Blöcke**, flashen.
3. Zeilen abhaken. Was nicht stimmt, in die Spalte „Gefunden“ schreiben.

Die Dateien sind keine Paketdateien (nicht in `pxt.json`). Knopfbelegung steht jeweils oben in der Datei.
Die Funde fließen danach als v0.1.x ein; die `// VORLÄUFIG`-Marken im Code werden dabei aufgelöst.

## 01 Start und Motoren (`01-start-motoren.ts`, Roboter aufbocken)

- [ ] Ohne Platine (micro:bit allein): `starte Maqueen` zeigt ein blinkendes X, endlos. → X blinkt.
- [ ] Mit Platine: kurz X oder gleich Haken, dann geht das Programm weiter. → Haken, keine Reset-Schleife.
- [ ] Im Simulator: X blinkt endlos. → Ja.
- [ ] A drückt der Reihe nach 10, 20, 50, 100, −50 %. Ab wie viel Prozent dreht sich ein Rad? → Wert notieren (tote Zone). Gefunden: ____ %
- [ ] 100 % ist deutlich schneller als 50 %; −50 % dreht rückwärts. → Ja.
- [ ] A+B (links 50, rechts −50): Roboter dreht auf der Stelle. → Ja.
- [ ] B stoppt beide Räder sofort. → Ja.

## 02 Linie (`02-linie.ts`, Teststreifen)

- [ ] Linienlage (A) bei M allein: → 0.
- [ ] Bei M + L1: → 0,5 (Linie leicht links, positiv).
- [ ] Bei L2 allein: → 2. Bei R2 allein: → −2.
- [ ] Keine Linie (Roboter neben den Streifen): → 100.
- [ ] Mittelpunkt im Display (Sensor M) leuchtet nur auf der Linie. → Ja.
- [ ] B (`fahre 40 − 20 × Linienlage …`), Roboter schräg zur Linie: lenkt er zur Linie hin? → Ja. Sonst Vorzeichen falsch! Gefunden: ____
- [ ] Linie verloren (100): Roboter fährt nicht irre davon, Räder bleiben im erlaubten Bereich. → Er fährt geradeaus-ähnlich oder dreht, aber kein Absturz.
- [ ] A+B: Rohwerte M, L1, R1 nacheinander. Weiß ≈ 3800, Schwarz ≈ 2700? → Werte: ____

## 03 Platine: Linienverfolgung und Kreuzungen (`03-platine-kreuzungen.ts`, Grand-Prix-Matte)

- [ ] Verfolgung an (A, Tempo 1): Roboter folgt der Linie. → Ja.
- [ ] Verfolgung aus (B): Roboter bleibt stehen, Display zeigt die Zahl der Kreuzungen. → Ja.
- [ ] Tempo 5: A drücken, dann während der Fahrt Logo berühren: deutlich schneller. Hält er die Linie? → Ja / bis Stufe ____
- [ ] Regel `an Kreuzung`: geradeaus / links / rechts / halt, jeweils ausprobiert. → Er tut, was dasteht.
- [ ] Regel `an T-Kreuzung`: links / rechts / halt. → Ja.
- [ ] Regel `an Abzweig links`: geradeaus / links / halt. → Ja.
- [ ] Regel `an Abzweig rechts`: geradeaus / rechts / halt. → Ja.
- [ ] `erkannte Kreuzung`: Roboter mit Verfolgung aus über eine Kreuzung schieben, Logo-Taste drücken und loslassen: Die Zahl muss passen. 1 = Kreuzung, 2 = T, 3 = Abzweig links, 4 = Abzweig rechts, 0 = keine. Am T geht außerdem der Punkt oben links an. → Ja.
- [ ] `wenn Kreuzung Nummer 1 erreicht` läuft genau einmal je Kreuzung (keine Doppelzählung). → Ja.
- [ ] Zähler: B zeigt die Anzahl gezählter Kreuzungen. → Stimmt mit der Fahrt überein.
- [ ] Nach Verfolgung aus (B) und wieder an: Regeln gelten neu (Standard). Das geht nur mit einer Variante von A ohne die vier Regelzeilen (`an Kreuzung` … `an Abzweig rechts`) und ohne `patrolSpeed`: Dazu in `03-platine-kreuzungen.ts` die Zeilen unter „Variante“ nutzen (A+B). → Standardregeln gelten. `setze Kreuzungszähler zurück` zählt von 0. → Ja.
- [ ] Kreuzungszähler bleibt richtig, während ein Programm in `dauerhaft` die Linienlage liest (parallele I2C-Zugriffe): Roboter mit Verfolgung an (A) über mehrere Kreuzungen fahren lassen; im Programm läuft dazu die `dauerhaft`-Schleife unten (zeigt die Linienlage als Punkt in der Anzeige). B zeigt die Zahl: Sie stimmt mit der Fahrt überein, keine verpassten oder doppelten Kreuzungen. → Ja.

## 04 Lichter (`04-lichter.ts`)

- [ ] A: LED 1 bis 4 einzeln rot. Welche Nummer ist welche LED? → vorn links ____ , vorn rechts ____ , hinten links ____ , hinten rechts ____
- [ ] B: alle Farben nacheinander (rot, orange, gelb, grün, blau, indigo, violett, lila, weiß). → Farben stimmen. Wenn nicht: Reihenfolge (GRB) notieren.
- [ ] Helligkeit 20 ist merklich dunkler als 255. → Ja.
- [ ] A+B: Scheinwerfer links/rechts in allen Farben (rot, grün, gelb, blau, lila, cyan, weiß), dann aus. → Farben stimmen, links und rechts nicht vertauscht.
- [ ] Logo: alles aus. → Ja.
- [ ] Lichter ohne `starte Maqueen`: Zuerst die Zeile `francorMaqueen.start()` in `04-lichter.ts` löschen, dann flashen. Die Lichter gehen an (V3-Pin P1). → Ja.

## 05 PID-Fahrt (`05-pid.ts`, Platz frei)

- [ ] A: `fahre 20 cm vorwärts, warte bis fertig`: Roboter steht, wenn die Zahl erscheint. → Ja. Zeit in ms: ____
- [ ] B: `rückwärts, sofort weiter`: Das Herz erscheint sofort, während er noch fährt. → Ja.
- [ ] A+B: `drehe 90 °`: dreht er nach links oder rechts? → Gefunden: ____ (angenommen: rechts, Uhrzeigersinn). `drehe −90 °` dreht zurück.
- [ ] Der Folgeblock startet erst nach der Fahrt (Drehung beginnt erst, wenn die Fahrt zu Ende ist). → Ja.
- [ ] Logo: `fahre 0 cm … warte bis fertig` und `drehe 0 ° … warte bis fertig` kehren zurück, ohne zu hängen. → Zeit ca. 500 ms (wartet auf das Busy-Flag, das nie 1 wird). Zeit: ____ ms
- [ ] PID-Block „warte bis fertig“ ohne Roboter-Blöcke davor (nur `starte Maqueen`, Räder aufgebockt): kehrt nach ca. 500 ms zurück. → Ja.
- [ ] `stoppe Fahrbefehl` bricht eine laufende Fahrt ab. → Ja.

## 06 LiDAR (`06-lidar.ts`)

- [ ] Der Sensor ist auf I2C-Adresse 0x33 gestellt (DIP-Schalter, wie beim Maqueen V3 geliefert); sonst liest er für immer 9999, wie „kein Sensor“. → Ja.
- [ ] Ohne `LiDAR einschalten`: A zeigt 9999. → Ja.
- [ ] B (einschalten): A direkt danach zeigt noch 9999; nach ca. 3 s echte Werte. → Ja.
- [ ] Hand vor den Sensor (ca. 10 cm): vorne < 200, Logo-Taste zeigt das Herz. → Ja.
- [ ] Hand weg: Wert steigt wieder, Logo zeigt das Kreuz. → Ja.
- [ ] A+B: links, rechts und Richtung (1 links, 2 rechts, 3 frei) sinnvoll. → Ja.
- [ ] Sensor abgesteckt, LiDAR eingeschaltet: kein Hängen, Abstand 9999, Richtung frei (3), nie < 200. → Ja.
- [ ] Kein Verhungern: Der Punkt im `dauerhaft` läuft flüssig über die oberste Reihe, auch mit eingeschaltetem LiDAR ohne Sensor. → Ja.
- [ ] Roboter ohne LiDAR, nur Linienprogramm (Station 3, ohne `LiDAR einschalten`): läuft flüssig. → Ja.

## 07 V2 (`07-v2.ts`, nur mit V2-Roboter)

- [ ] `starte Maqueen V2` ohne Reset: Haken kommt, Roboter wird nicht verstellt. → Ja. Wenn nicht: V2 braucht einen Reset (0x49)? ____
- [ ] A: Motoren vor und zurück, Stopp. → Ja.
- [ ] B: Linienlage wie bei V3. → Ja.
- [ ] Lichter unten (Logo, P15): grün. → Ja.
- [ ] A+B: rote LED „an“ leuchtet wirklich (links, dann rechts). → an = leuchtet. Wenn umgekehrt: 0/1 tauschen.
- [ ] Ultraschall (Logo, danach Zahl): Hand 10 cm davor → ca. 10. Nichts davor → 0 oder groß, kein Hängen. → Ja.

## 08 Stationen (`08-stationen.ts`)

In der Datei sind Station 3, 4, 5 (normal) und 5 (Profi) hintereinander; immer nur eine Fassung aktiv lassen (die anderen stehen auskommentiert).

- [ ] Station 3: A: Ampel (Scheinwerfer) rot, gelb, grün, dann folgt er der Linie; B stoppt. → Ja.
- [ ] Station 4: wie 3, dazu Hand vor den Laser: er stoppt, Scheinwerfer rot. A startet neu. → Ja.
- [ ] Station 5 normal: Regeln, Kreuzung 1 umstellen, Tempo-Zone ab 3 (Zahl 1), Melodie bei 4, Halt am T. Zählnummern 1 bis 4 stimmen? → Ja.
- [ ] Station 5 Profi: Am Ziel springt er per `fahre 20 cm … warte bis fertig` (ohne die 2000-ms-Pause) über die Lücke und nimmt danach die Linie wieder auf, nicht mitten im Sprung. → Ja.
- [ ] Profi: Melodie erst am Pro-Ziel (Laser-Stopp mit `gesprungen`). → Ja.

## Sprache und Offline

- [ ] MakeCode auf Deutsch: alle Blöcke der Erweiterung durchsehen. → Kein englischer Rest.
- [ ] MakeCode auf Englisch: alle Blöcke durchsehen. → Kein deutscher Rest.
- [ ] Offline: Projekt mit der Erweiterung einmal mit Netz laden, Netz aus, Seite neu laden, kompilieren, flashen. → Geht.

## Zusammenfassung der vorläufigen Werte

| Wert | Datei | Test |
|---|---|---|
| Totzone (Prozent → 0 bis 255 linear) | `logic.ts` | 01 |
| LED-Nummer → Pufferindex | `lights.ts` | 04 |
| Warten auf Busy-Flag 500 ms | `pid.ts` | 05 |
| Drehrichtung positiver Winkel | `pid.ts` | 05 |
| LiDAR-Modus `[1,0,0,4]` | `lidar.ts` | 06 |
| V2 ohne Reset | `start.ts` | 07 |
| Rote LED an = 1 | `v2.ts` | 07 |
