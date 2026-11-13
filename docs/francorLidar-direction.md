# avoid direction

The direction the sensor suggests to pass an obstacle. "free" without a measurement.

## Example

```blocks
francorMaqueen.start()
francorLidar.start()
basic.forever(function () {
    if (francorLidar.direction() == francorLidar.isDirection(francorLidar.AvoidDir.Left)) {
        basic.showArrow(ArrowNames.West)
    }
})
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
