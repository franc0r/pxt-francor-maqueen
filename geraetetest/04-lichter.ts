// Gerätetest 4: Lichter. A = LEDs 1 bis 4 einzeln rot (Nummer zeigen), B = alle Farben,
// A+B = Scheinwerfer alle Farben, Logo = alles an, nach 1 s "alle Lichter aus".
// Notiere, welche Nummer welche LED ist (vorn links ...).
francorMaqueen.start()
input.onButtonPressed(Button.A, function () {
    for (let n = 0; n < 4; n++) {
        francorMaqueen.lightsOff()
        basic.showNumber(n + 1)
        francorMaqueen.setLight(n, francorMaqueen.colors(francorMaqueen.Colors.Red))
        basic.pause(1500)
    }
    francorMaqueen.lightsOff()
})
input.onButtonPressed(Button.B, function () {
    const farben = [
        francorMaqueen.Colors.Red, francorMaqueen.Colors.Orange, francorMaqueen.Colors.Yellow,
        francorMaqueen.Colors.Green, francorMaqueen.Colors.Blue, francorMaqueen.Colors.Indigo,
        francorMaqueen.Colors.Violet, francorMaqueen.Colors.Purple, francorMaqueen.Colors.White
    ]
    for (let i = 0; i < farben.length; i++) {
        francorMaqueen.setLight(francorMaqueen.Led.All, francorMaqueen.colors(farben[i]))
        basic.pause(700)
    }
    francorMaqueen.setLight(francorMaqueen.Led.All, francorMaqueen.rgb(0, 128, 255))
    basic.pause(700)
    francorMaqueen.brightness(20)
    basic.pause(700)
    francorMaqueen.brightness(255)
    francorMaqueen.lightsOff()
})
input.onButtonPressed(Button.AB, function () {
    const farben = [
        francorMaqueen.HeadColor.Red, francorMaqueen.HeadColor.Green, francorMaqueen.HeadColor.Yellow,
        francorMaqueen.HeadColor.Blue, francorMaqueen.HeadColor.Purple, francorMaqueen.HeadColor.Cyan,
        francorMaqueen.HeadColor.White
    ]
    for (let i = 0; i < farben.length; i++) {
        francorMaqueen.headlight(francorMaqueen.Side.Left, farben[i])
        francorMaqueen.headlight(francorMaqueen.Side.Right, farben[(i + 1) % farben.length])
        basic.pause(700)
    }
    francorMaqueen.headlight(francorMaqueen.Side.Both, francorMaqueen.HeadColor.Off)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    francorMaqueen.headlight(francorMaqueen.Side.Both, francorMaqueen.HeadColor.Red)
    francorMaqueen.setLight(francorMaqueen.Led.All, francorMaqueen.colors(francorMaqueen.Colors.Green))
    basic.pause(1000)
    francorMaqueen.lightsOff()
})
