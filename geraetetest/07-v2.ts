// Gerätetest 7: Maqueen Plus V2 (nur mit V2-Roboter). Roboter aufbocken.
// Start ohne Reset: Haken muss kommen. A = Motoren vor/zurück, B = Linie zeigen,
// A+B = rote LEDs, Logo = Lichter unten (P15) und Ultraschall.
francorMaqueen.startV2()
input.onButtonPressed(Button.A, function () {
    francorMaqueen.driveV2(50, 50)
    basic.pause(1000)
    francorMaqueen.driveV2(-50, -50)
    basic.pause(1000)
    francorMaqueen.stopV2()
})
input.onButtonPressed(Button.B, function () {
    let lage = francorMaqueen.linePosition()
    basic.showNumber(Math.round(lage * 10) / 10)
})
input.onButtonPressed(Button.AB, function () {
    // Brennt "an" wirklich? Links an, rechts aus, dann umgekehrt.
    francorMaqueen.redLed(francorMaqueen.Side.Left, francorMaqueen.OnOff.On)
    francorMaqueen.redLed(francorMaqueen.Side.Right, francorMaqueen.OnOff.Off)
    basic.pause(1000)
    francorMaqueen.redLed(francorMaqueen.Side.Left, francorMaqueen.OnOff.Off)
    francorMaqueen.redLed(francorMaqueen.Side.Right, francorMaqueen.OnOff.On)
    basic.pause(1000)
    francorMaqueen.redLed(francorMaqueen.Side.Both, francorMaqueen.OnOff.Off)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    francorMaqueen.setLight(francorMaqueen.Led.All, francorMaqueen.colors(francorMaqueen.Colors.Green))
    basic.pause(1000)
    francorMaqueen.lightsOff()
    basic.showNumber(francorMaqueen.ultrasonic())
})
