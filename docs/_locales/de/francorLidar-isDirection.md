# Richtung (links / rechts / frei)

Eine Richtung zum Vergleichen mit „Ausweichrichtung“.

## Beispiel

```blocks
francorMaqueen.start()
francorLidar.start()
basic.forever(function () {
    if (francorLidar.direction() == francorLidar.isDirection(francorLidar.AvoidDir.Free)) {
        basic.showIcon(IconNames.Yes)
    }
})
```

## Parameter

* Die Richtung

```package
francor-maqueen=github:franc0r/pxt-francor-maqueen#v0.1.4
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
