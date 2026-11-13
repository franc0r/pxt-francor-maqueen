# Umgebungslicht [side]

Helligkeit der Umgebungslicht-Sensoren. Bei „beide“ kommt der Mittelwert.

## Beispiel

```blocks
francorMaqueen.start()
basic.forever(function () {
    basic.showNumber(francorMaqueen.ambientLight(francorMaqueen.Side.Left))
})
```

## Parameter

| Parameter | Bedeutung |
|---|---|
| `side` | Welcher Sensor |

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
