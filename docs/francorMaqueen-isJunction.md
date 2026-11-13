# [j]

A junction type, to compare with "junction seen".

## Example

```blocks
francorMaqueen.start()
basic.forever(function () {
    if (francorMaqueen.junction() == francorMaqueen.isJunction(francorMaqueen.Junction.Crossroad)) {
        basic.showIcon(IconNames.Yes)
    }
})
```

## Parameters

| Parameter | Meaning |
|---|---|
| `j` | The junction type |

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
