# Linienlage

Wo die Linie liegt: von -2 (ganz rechts) bis 2 (ganz links), 0 = in der Mitte.

Positiv = Linie links. 100 = keine Linie gesehen.

## Beispiel

```blocks
francorMaqueen.start()
basic.forever(function () {
    let lage = francorMaqueen.linePosition()
    if (lage == 100) {
        francorMaqueen.stop()
    } else {
        francorMaqueen.drive(40 - 20 * lage, 40 + 20 * lage)
    }
})
```

```package
francor-maqueen=github:franc0r/pxt-francor-maqueen#v0.1.4
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
