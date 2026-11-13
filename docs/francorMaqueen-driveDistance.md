# drive [cm] cm [dir] [wait]

Drives an exact distance with the board's PID controller.

## Example

```blocks
francorMaqueen.start()
francorMaqueen.driveDistance(20, francorMaqueen.Dir.Forward, francorMaqueen.Wait.UntilDone)
basic.showIcon(IconNames.Yes)
```

## Parameters

| Parameter | Meaning |
|---|---|
| `cm` | Distance in centimetres, e.g. 20 |
| `dir` | Forward or backward |
| `wait` | Wait until the move is done, or continue at once |

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
