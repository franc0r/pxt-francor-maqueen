# junction seen

The junction the line sensors see right now (0 = none). Compare it with a junction block.

## Example

```blocks
francorMaqueen.start()
basic.forever(function () {
    if (francorMaqueen.junction() == francorMaqueen.isJunction(francorMaqueen.Junction.TJunction)) {
        basic.showIcon(IconNames.Yes)
    }
})
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
