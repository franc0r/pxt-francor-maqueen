# Kreuzungsart

Eine Kreuzungsart zum Vergleichen mit „erkannte Kreuzung“.

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

* Die Kreuzungsart

```package
francor-maqueen=github:franc0r/pxt-francor-maqueen#v0.1.4
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
