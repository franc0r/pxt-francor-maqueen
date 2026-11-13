# drehe [degrees] ° [wait]

Dreht den Roboter auf der Stelle um einen genauen Winkel. Positive Winkel drehen im Uhrzeigersinn, negative dagegen.

## Beispiel

```blocks
francorMaqueen.start()
francorMaqueen.turn(90, francorMaqueen.Wait.UntilDone)
basic.showIcon(IconNames.Yes)
```

## Parameter

| Parameter | Bedeutung |
|---|---|
| `degrees` | Winkel in Grad |
| `wait` | Warten, bis die Drehung fertig ist, oder sofort weitermachen |

---

FRANCOR e. V. · [pxt-francor-maqueen](https://github.com/franc0r/pxt-francor-maqueen)
