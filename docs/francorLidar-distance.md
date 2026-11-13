# distance … (mm)

Distance to the nearest obstacle in mm.

In the first seconds after "start LiDAR" and without a sensor the value is 9999.

## Example

```blocks
francorMaqueen.start()
francorLidar.start()
basic.forever(function () {
    if (francorLidar.distance(francorLidar.LidarSide.Front) < 200) {
        francorMaqueen.stop()
    }
})
```

## Parameters

* Which side

```package
francor-maqueen=github:franc0r/pxt-francor-maqueen#v0.1.4
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
