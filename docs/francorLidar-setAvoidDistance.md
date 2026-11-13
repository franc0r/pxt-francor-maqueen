# avoid distance [mm] mm

Distance at which the sensor starts to suggest a direction (100 to 500 mm).

On the Maqueen use 200 at most, otherwise the sensor sees the floor.

## Example

```blocks
francorMaqueen.start()
francorLidar.setAvoidDistance(200)
francorLidar.start()
```

## Parameters

| Parameter | Meaning |
|---|---|
| `mm` | Distance in mm |

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
