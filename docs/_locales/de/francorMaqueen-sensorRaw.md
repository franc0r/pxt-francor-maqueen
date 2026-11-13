# Rohwert Sensor …

Roher Helligkeitswert eines Liniensensors.

## Beispiel

```blocks
francorMaqueen.start()
basic.forever(function () {
    basic.showNumber(francorMaqueen.sensorRaw(francorMaqueen.LineSensor.M))
})
```

## Parameter

* Welcher Sensor

```package
francor-maqueen=github:franc0r/pxt-francor-maqueen#v0.1.4
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
