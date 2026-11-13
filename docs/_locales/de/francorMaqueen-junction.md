# erkannte Kreuzung

Welche Kreuzung die Sensoren gerade sehen (0 = keine). Vergleiche sie mit einem Kreuzungs-Block.

## Beispiel

```blocks
francorMaqueen.start()
basic.forever(function () {
    if (francorMaqueen.junction() == francorMaqueen.isJunction(francorMaqueen.Junction.TJunction)) {
        basic.showIcon(IconNames.Yes)
    }
})
```

```package
francor-maqueen=github:franc0r/pxt-francor-maqueen#v0.1.4
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
