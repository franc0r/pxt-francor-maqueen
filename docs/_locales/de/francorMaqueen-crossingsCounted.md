# Kreuzungen gezählt

Wie viele Kreuzungen der Roboter bisher erkannt hat.

## Beispiel

```blocks
francorMaqueen.start()
francorMaqueen.patrol(francorMaqueen.OnOff.On)
input.onButtonPressed(Button.B, function () {
    basic.showNumber(francorMaqueen.crossingsCounted())
})
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
