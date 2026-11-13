# Sensor [s] sieht Linie

Wahr, wenn der Liniensensor die schwarze Linie sieht.

## Beispiel

```blocks
francorMaqueen.start()
basic.forever(function () {
    if (francorMaqueen.seesLine(francorMaqueen.LineSensor.M)) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showIcon(IconNames.No)
    }
})
```

## Parameter

| Parameter | Bedeutung |
|---|---|
| `s` | Welcher Sensor |

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
