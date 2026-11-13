# turn … ° …

Turns on the spot by an exact angle with the board's PID controller.

Positive angles turn clockwise, negative angles counter-clockwise.

## Example

```blocks
francorMaqueen.start()
francorMaqueen.turn(90, francorMaqueen.Wait.UntilDone)
basic.showIcon(IconNames.Yes)
```

## Parameters

In the order of the gaps (…) in the block:

1. Angle in degrees, e.g. 90
2. Wait until the move is done, or continue at once

```package
francor-maqueen=github:franc0r/pxt-francor-maqueen#v0.1.4
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
