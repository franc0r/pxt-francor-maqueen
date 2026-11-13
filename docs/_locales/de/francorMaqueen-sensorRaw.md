# Rohwert Sensor [s]

Roher Helligkeitswert eines Liniensensors.

## Beispiel

```blocks
francorMaqueen.start()
basic.forever(function () {
    basic.showNumber(francorMaqueen.sensorRaw(francorMaqueen.LineSensor.M))
})
```

## Parameter

| Parameter | Bedeutung |
|---|---|
| `s` | Welcher Sensor |

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
