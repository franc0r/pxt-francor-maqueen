# Abstand [side] (mm)

Abstand zum nächsten Hindernis in mm. In den ersten Sekunden nach "LiDAR einschalten" und ohne Sensor ist der Wert 9999.

## Beispiel

```blocks
francorMaqueen.start()
francorLidar.start()
basic.forever(function () {
    if (francorLidar.distance(francorLidar.LidarSide.Front) < 200) {
        francorMaqueen.stop()
    }
})
```

## Parameter

| Parameter | Bedeutung |
|---|---|
| `side` | Welche Seite |

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
