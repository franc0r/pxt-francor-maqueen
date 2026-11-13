# ambient light …

Brightness measured by the ambient light sensors.

With "both", gives the average.

## Example

```blocks
francorMaqueen.start()
basic.forever(function () {
    basic.showNumber(francorMaqueen.ambientLight(francorMaqueen.Side.Left))
})
```

## Parameters

* Which sensor

```package
francor-maqueen=github:franc0r/pxt-francor-maqueen#v0.1.4
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
