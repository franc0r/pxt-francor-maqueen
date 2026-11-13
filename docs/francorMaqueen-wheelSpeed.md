# wheel speed [side] (cm/s)

Speed of a wheel in centimetres per second.

With "both", gives the average.

## Example

```blocks
francorMaqueen.start()
basic.forever(function () {
    basic.showNumber(francorMaqueen.wheelSpeed(francorMaqueen.Side.Both))
})
```

## Parameters

| Parameter | Meaning |
|---|---|
| `side` | Which wheel |

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
