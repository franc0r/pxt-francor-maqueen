# raw value sensor [s]

Raw brightness value of a line sensor.

## Example

```blocks
francorMaqueen.start()
basic.forever(function () {
    basic.showNumber(francorMaqueen.sensorRaw(francorMaqueen.LineSensor.M))
})
```

## Parameters

| Parameter | Meaning |
|---|---|
| `s` | Which sensor |

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
