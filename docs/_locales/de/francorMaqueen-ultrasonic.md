# Ultraschall-Abstand (cm)

Misst den Abstand mit dem Ultraschall-Sensor in cm (V2). Gibt 0, wenn nichts zu sehen ist.

## Beispiel

```blocks
francorMaqueen.startV2()
basic.forever(function () {
    basic.showNumber(francorMaqueen.ultrasonic())
})
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
