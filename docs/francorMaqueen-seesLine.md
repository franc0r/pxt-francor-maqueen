# sensor … sees line

True if the line sensor sees the black line.

## Example

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

## Parameters

* Which sensor

```package
francor-maqueen=github:franc0r/pxt-francor-maqueen#v0.1.4
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
