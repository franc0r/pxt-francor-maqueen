# Ausweich-Abstand [mm] mm

Ab diesem Abstand rät der Sensor eine Richtung (100 bis 500 mm). Am Maqueen höchstens 200, sonst sieht der Sensor den Boden.

## Beispiel

```blocks
francorMaqueen.start()
francorLidar.setAvoidDistance(200)
francorLidar.start()
```

## Parameter

| Parameter | Bedeutung |
|---|---|
| `mm` | Abstand in mm |

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
