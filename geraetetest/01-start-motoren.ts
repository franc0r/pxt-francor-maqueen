// Gerätetest 1: Start und Motoren. Roboter aufbocken (Räder in der Luft)!
// A = nächste Stufe fahren (10, 20, 50, 100, -50 %), B = Motoren stoppen.
// Das Display zeigt die Stufe. Notiere, ab welcher Stufe sich ein Rad dreht.
// Test ohne Platine: nur starten und prüfen, dass das X blinkt.
let stufe = 0
const stufen = [10, 20, 50, 100, -50]
francorMaqueen.start()
input.onButtonPressed(Button.A, function () {
    francorMaqueen.driveBoth(stufen[stufe])
    basic.showNumber(stufen[stufe])
    stufe = (stufe + 1) % stufen.length
})
input.onButtonPressed(Button.B, function () {
    francorMaqueen.stop()
    basic.clearScreen()
})
// A+B: links und rechts getrennt (links 50, rechts -50: Drehung auf der Stelle)
input.onButtonPressed(Button.AB, function () {
    francorMaqueen.drive(50, -50)
})
