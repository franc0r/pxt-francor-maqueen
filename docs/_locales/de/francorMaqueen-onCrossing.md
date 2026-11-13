# wenn Kreuzung Nummer … erreicht

Läuft einmal, sobald der Roboter die Kreuzung mit dieser Nummer erreicht.

Gezählt wird ab dem Start (oder ab „setze Kreuzungszähler zurück“).

## Beispiel

```blocks
francorMaqueen.start()
francorMaqueen.patrol(francorMaqueen.OnOff.On)
francorMaqueen.onCrossing(1, function () {
    francorMaqueen.atRightOrStraight(francorMaqueen.RightRule.Straight)
})
```

## Parameter

In der Reihenfolge der Lücken (…) im Block:

1. Nummer der Kreuzung, z. B. 1
2. Was dann passiert

```package
francor-maqueen=github:franc0r/pxt-francor-maqueen#v0.1.4
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
