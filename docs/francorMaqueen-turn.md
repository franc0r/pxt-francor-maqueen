# turn [degrees] ° [wait]

Turns on the spot by an exact angle with the board's PID controller.

Positive angles turn clockwise, negative angles counter-clockwise.

## Example

```blocks
francorMaqueen.start()
francorMaqueen.turn(90, francorMaqueen.Wait.UntilDone)
basic.showIcon(IconNames.Yes)
```

## Parameters

| Parameter | Meaning |
|---|---|
| `degrees` | Angle in degrees, e.g. 90 |
| `wait` | Wait until the move is done, or continue at once |

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
