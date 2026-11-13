# Linienlage

Wo die Linie liegt: von -2 (ganz rechts) bis 2 (ganz links), 0 = in der Mitte.

Positiv = Linie links. 100 = keine Linie gesehen.

## Beispiel

```blocks
francorMaqueen.start()
basic.forever(function () {
    if (francorMaqueen.linePosition() == 100) {
        francorMaqueen.stop()
    } else {
        francorMaqueen.drive(40 - 20 * francorMaqueen.linePosition(), 40 + 20 * francorMaqueen.linePosition())
    }
})
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
