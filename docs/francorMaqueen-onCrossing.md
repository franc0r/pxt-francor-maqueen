# when crossing number … reached

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

In the order of the gaps (…) in the block:

1. Number of the crossing, e.g. 1
2. What to do

```package
francor-maqueen=github:franc0r/pxt-francor-maqueen#v0.1.4
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
