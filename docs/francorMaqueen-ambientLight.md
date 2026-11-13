# ambient light [side]

Brightness measured by the ambient light sensors.

With both sides, gives the average.

## Example

```blocks
francorMaqueen.start()
basic.forever(function () {
    basic.showNumber(francorMaqueen.ambientLight(francorMaqueen.Side.Left))
})
```

## Parameters

| Parameter | Meaning |
|---|---|
| `side` | Which sensor |

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
