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

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
