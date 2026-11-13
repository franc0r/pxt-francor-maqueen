# Ultraschall-Abstand (cm)

Misst den Abstand mit dem Ultraschall-Sensor in cm (V2). Ergibt 0, wenn nichts zu sehen ist.

## Beispiel

```blocks
francorMaqueen.startV2()
basic.forever(function () {
    basic.showNumber(francorMaqueen.ultrasonic())
})
```

```package
francor-maqueen=github:franc0r/pxt-francor-maqueen#v0.1.4
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
