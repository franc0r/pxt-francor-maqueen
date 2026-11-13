# line position

Where the line is: from -2 (far right) to 2 (far left), 0 = centered.

Positive = line on the left. 100 = no line seen.

## Example

```blocks
francorMaqueen.start()
basic.forever(function () {
    if (francorMaqueen.linePosition() == 100) {
        francorMaqueen.stop()
    } else {
        francorMaqueen.drive(40 - 20 * francorMaqueen.linePosition(), 40 + 20 * francorMaqueen.linePosition())
    }
})
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
