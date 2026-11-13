# drive … cm … …

Drives an exact distance with the board's PID controller.

## Example

```blocks
francorMaqueen.start()
francorMaqueen.driveDistance(20, francorMaqueen.Dir.Forward, francorMaqueen.Wait.UntilDone)
basic.showIcon(IconNames.Yes)
```

## Parameters

In the order of the gaps (…) in the block:

1. Distance in centimetres, e.g. 20
2. Forward or backward
3. Wait until the move is done, or continue at once

```package
francor-maqueen=github:franc0r/pxt-francor-maqueen#v0.1.4
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
