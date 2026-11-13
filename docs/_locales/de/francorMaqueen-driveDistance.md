# fahre [cm] cm [dir] [wait]

Fährt eine genaue Strecke mit der Regelung der Platine.

## Beispiel

```blocks
francorMaqueen.start()
francorMaqueen.driveDistance(20, francorMaqueen.Dir.Forward, francorMaqueen.Wait.UntilDone)
basic.showIcon(IconNames.Yes)
```

## Parameter

| Parameter | Bedeutung |
|---|---|
| `cm` | Strecke in Zentimetern |
| `dir` | Vorwärts oder rückwärts |
| `wait` | Warten, bis die Fahrt fertig ist, oder sofort weitermachen |

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
