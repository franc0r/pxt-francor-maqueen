# Radgeschwindigkeit [side] (cm/s)

Geschwindigkeit eines Rads in Zentimetern pro Sekunde. Bei „beide“ kommt der Mittelwert.

## Beispiel

```blocks
francorMaqueen.start()
basic.forever(function () {
    basic.showNumber(francorMaqueen.wheelSpeed(francorMaqueen.Side.Both))
})
```

## Parameter

| Parameter | Bedeutung |
|---|---|
| `side` | Welches Rad |

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
