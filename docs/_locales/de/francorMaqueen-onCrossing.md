# wenn Kreuzung Nummer $nr erreicht

Läuft einmal, sobald der Roboter die Kreuzung mit dieser Nummer erreicht.

Gezählt wird ab dem Start (oder ab "setze Kreuzungszähler zurück").

## Beispiel

```blocks
francorMaqueen.start()
francorMaqueen.patrol(francorMaqueen.OnOff.On)
francorMaqueen.onCrossing(1, function () {
    francorMaqueen.atRightOrStraight(francorMaqueen.RightRule.Straight)
})
```

## Parameter

| Parameter | Bedeutung |
|---|---|
| `handler` | Was dann passiert |
| `nr` | Nummer der Kreuzung, z. B. 1 |

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
