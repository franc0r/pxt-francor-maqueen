// Gerätetest 5: Fahren und Drehen mit dem PID-Regler. Roboter auf den Boden, Platz frei.
// A = 20 cm vorwärts (warte bis fertig), danach zeigt das Display die Wartezeit in ms.
// B = 20 cm rückwärts, sofort weiter (zeigt gleich ein Herz).
// A+B = Drehung 90 (Richtung? links oder rechts?), danach -90.
// Logo = 0 cm und Drehung 0 (warte bis fertig): kehrt nach ca. 500 ms zurück?
francorMaqueen.start()
input.onButtonPressed(Button.A, function () {
    let t0 = control.millis()
    francorMaqueen.driveDistance(20, francorMaqueen.Dir.Forward, francorMaqueen.Wait.UntilDone)
    // Hier ist die Fahrt vorbei: Er muss schon stehen.
    basic.showNumber(control.millis() - t0)
})
input.onButtonPressed(Button.B, function () {
    francorMaqueen.driveDistance(20, francorMaqueen.Dir.Backward, francorMaqueen.Wait.Continue)
    basic.showIcon(IconNames.Heart)
    basic.pause(300)
    francorMaqueen.pidStop()
})
input.onButtonPressed(Button.AB, function () {
    francorMaqueen.turn(90, francorMaqueen.Wait.UntilDone)
    basic.pause(500)
    francorMaqueen.turn(-90, francorMaqueen.Wait.UntilDone)
    basic.showIcon(IconNames.Yes)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    let t0 = control.millis()
    francorMaqueen.driveDistance(0, francorMaqueen.Dir.Forward, francorMaqueen.Wait.UntilDone)
    francorMaqueen.turn(0, francorMaqueen.Wait.UntilDone)
    basic.showNumber(control.millis() - t0)
})
