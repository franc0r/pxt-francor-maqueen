# [j]

Eine Kreuzungsart zum Vergleichen mit "erkannte Kreuzung".

## Beispiel

```blocks
francorMaqueen.start()
basic.forever(function () {
    if (francorMaqueen.junction() == francorMaqueen.isJunction(francorMaqueen.Junction.Crossroad)) {
        basic.showIcon(IconNames.Yes)
    }
})
```

## Parameter

| Parameter | Bedeutung |
|---|---|
| `j` | Die Kreuzungsart |

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
