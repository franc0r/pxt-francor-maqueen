# ultrasonic distance (cm)

Measures the distance with the ultrasonic sensor in cm (V2). Gives 0 if nothing is seen.

## Example

```blocks
francorMaqueen.startV2()
basic.forever(function () {
    basic.showNumber(francorMaqueen.ultrasonic())
})
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
