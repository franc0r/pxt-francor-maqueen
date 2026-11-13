# stop drive move

Stops a running drive or turn move.

## Example

```blocks
francorMaqueen.start()
francorMaqueen.driveDistance(100, francorMaqueen.Dir.Forward, francorMaqueen.Wait.Continue)
input.onButtonPressed(Button.A, function () {
    francorMaqueen.pidStop()
})
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
