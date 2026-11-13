# line position

Where the line is: from -2 (far right) to 2 (far left), 0 = centered.

Positive = line on the left. 100 = no line seen.

## Example

```blocks
francorMaqueen.start()
basic.forever(function () {
    let lage = francorMaqueen.linePosition()
    if (lage == 100) {
        francorMaqueen.stop()
    } else {
        francorMaqueen.drive(40 - 20 * lage, 40 + 20 * lage)
    }
})
```

```package
francor-maqueen=github:franc0r/pxt-francor-maqueen#v0.1.4
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
