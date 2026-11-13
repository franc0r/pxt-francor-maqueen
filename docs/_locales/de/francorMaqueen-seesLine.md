# Sensor … sieht Linie

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

* Welcher Sensor

```package
francor-maqueen=github:franc0r/pxt-francor-maqueen#v0.1.4
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
