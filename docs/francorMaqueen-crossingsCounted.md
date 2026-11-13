# crossings counted

How many crossings the robot has seen so far.

## Example

```blocks
francorMaqueen.start()
francorMaqueen.patrol(francorMaqueen.OnOff.On)
input.onButtonPressed(Button.B, function () {
    basic.showNumber(francorMaqueen.crossingsCounted())
})
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
