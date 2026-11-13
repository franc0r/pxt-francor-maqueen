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

```package
francor-maqueen=github:franc0r/pxt-francor-maqueen#v0.1.4
```

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
