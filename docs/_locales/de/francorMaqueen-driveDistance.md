# fahre … cm … …

Fährt eine genaue Strecke. Die Platine regelt die Fahrt selbst.

## Beispiel

```blocks
francorMaqueen.start()
francorMaqueen.driveDistance(20, francorMaqueen.Dir.Forward, francorMaqueen.Wait.UntilDone)
basic.showIcon(IconNames.Yes)
```

## Parameter

In der Reihenfolge der Lücken (…) im Block:

1. Strecke in Zentimetern
2. Vorwärts oder rückwärts
3. Warten, bis die Fahrt fertig ist, oder sofort weitermachen

```package
francor-maqueen=github:franc0r/pxt-francor-maqueen#v0.1.4
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
