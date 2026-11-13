# [d]

A direction, to compare with "avoid direction".

## Example

```blocks
francorMaqueen.start()
francorLidar.start()
basic.forever(function () {
    if (francorLidar.direction() == francorLidar.isDirection(francorLidar.AvoidDir.Free)) {
        basic.showIcon(IconNames.Yes)
    }
})
```

## Parameters

| Parameter | Meaning |
|---|---|
| `d` | The direction |

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
