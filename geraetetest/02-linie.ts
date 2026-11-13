// Gerätetest 2: Linie. Roboter auf den Teststreifen stellen.
// A = Linienlage auf dem Display zeigen (100 = keine Linie), B = lenken (10 s).
// A+B = Rohwerte M, L1, R1 nacheinander zeigen.
francorMaqueen.start()
// Solange eine Zahl angezeigt wird, zeichnet die Schleife unten nicht dazwischen.
let zeigtZahl = false
function zeige(n: number) {
    zeigtZahl = true
    basic.clearScreen()
    basic.showNumber(n)
    zeigtZahl = false
}
input.onButtonPressed(Button.A, function () {
    // Lage einmal lesen und merken: jeder Aufruf liest die Sensoren neu.
    let lage = francorMaqueen.linePosition()
    zeige(Math.round(lage * 10) / 10)
})
input.onButtonPressed(Button.B, function () {
    // Vorzeichen-Test: Er soll zur Linie hin lenken. Quer zur Linie halten.
    for (let i = 0; i < 100; i++) {
        let lage = francorMaqueen.linePosition()
        if (lage == 100) {
            // Keine Linie: anhalten statt mit voller Kraft drehen.
            francorMaqueen.stop()
        } else {
            francorMaqueen.drive(40 - 20 * lage, 40 + 20 * lage)
        }
        basic.pause(100)
    }
    francorMaqueen.stop()
})
input.onButtonPressed(Button.AB, function () {
    zeige(francorMaqueen.sensorRaw(francorMaqueen.LineSensor.M))
    zeige(francorMaqueen.sensorRaw(francorMaqueen.LineSensor.L1))
    zeige(francorMaqueen.sensorRaw(francorMaqueen.LineSensor.R1))
})
// Sieht Sensor M die Linie? Punkt in der Mitte der Anzeige.
basic.forever(function () {
    if (zeigtZahl) {
        basic.pause(20)
        return
    }
    if (francorMaqueen.seesLine(francorMaqueen.LineSensor.M)) {
        led.plot(2, 2)
    } else {
        led.unplot(2, 2)
    }
})
