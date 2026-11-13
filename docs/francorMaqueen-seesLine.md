# sensor [s] sees line

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

| Parameter | Meaning |
|---|---|
| `s` | Which sensor |

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
