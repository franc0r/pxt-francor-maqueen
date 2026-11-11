// Gerätetest 2: Linie. Roboter auf den Teststreifen stellen.
// A = Linienlage auf dem Display zeigen (100 = keine Linie), B = lenken (10 s).
// A+B = Rohwerte M, L1, R1 nacheinander zeigen.
francorMaqueen.start()
input.onButtonPressed(Button.A, function () {
    // Lage einmal lesen und merken: jeder Aufruf liest die Sensoren neu.
    let lage = francorMaqueen.linePosition()
    basic.showNumber(Math.round(lage * 10) / 10)
})
input.onButtonPressed(Button.B, function () {
    // Vorzeichen-Test: Er soll zur Linie hin lenken. Quer zur Linie halten.
    for (let i = 0; i < 100; i++) {
        let lage = francorMaqueen.linePosition()
        francorMaqueen.drive(40 - 20 * lage, 40 + 20 * lage)
        basic.pause(100)
    }
    francorMaqueen.stop()
})
input.onButtonPressed(Button.AB, function () {
    basic.showNumber(francorMaqueen.sensorRaw(francorMaqueen.LineSensor.M))
    basic.showNumber(francorMaqueen.sensorRaw(francorMaqueen.LineSensor.L1))
    basic.showNumber(francorMaqueen.sensorRaw(francorMaqueen.LineSensor.R1))
})
// Sieht Sensor M die Linie? Punkt in der Mitte der Anzeige.
basic.forever(function () {
    if (francorMaqueen.seesLine(francorMaqueen.LineSensor.M)) {
        led.plot(2, 2)
    } else {
        led.unplot(2, 2)
    }
})
