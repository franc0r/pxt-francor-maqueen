# [d]

Eine Richtung zum Vergleichen mit "Ausweichrichtung".

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

| Parameter | Bedeutung |
|---|---|
| `d` | Die Richtung |

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
