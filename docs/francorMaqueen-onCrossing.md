# when crossing number $nr reached

Runs once when the robot reaches the crossing with this number.

Counting starts at the start (or at "reset crossing counter").

## Example

```blocks
francorMaqueen.start()
francorMaqueen.patrol(francorMaqueen.OnOff.On)
francorMaqueen.onCrossing(1, function () {
    francorMaqueen.atRightOrStraight(francorMaqueen.RightRule.Straight)
})
```

## Parameters

| Parameter | Meaning |
|---|---|
| `handler` | What to do |
| `nr` | Number of the crossing, e.g. 1 |

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
