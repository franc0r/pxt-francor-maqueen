// Gerätetest 6: LiDAR. Ohne start() soll alles 9999 sein.
// A = Abstand vorne zeigen, B = LiDAR einschalten (start), A+B = Abstand links/rechts/Richtung.
// Logo = Hindernis-Test: zeigt ein Herz, wenn Abstand vorne < 200.
// Zum Prüfen von "nicht verhungert": im Hintergrund läuft ein Zähler im dauerhaft.
// Seriell (MakeCode: "Konsole anzeigen Gerät"), einmal pro Sekunde:
// "lidar inits=… fails=… ms=… vorne=…": wie oft der Modus gesetzt wurde,
// Fehlversuche in Folge, Dauer der letzten Anfrage in ms, Abstand vorne.
let zaehler = 0
basic.forever(function () {
    zaehler++
    // Soll flüssig laufen, auch mit gestartetem LiDAR ohne Sensor:
    // Punkt wandert über die oberste Reihe.
    led.unplot((zaehler - 1) % 5, 0)
    led.plot(zaehler % 5, 0)
    basic.pause(100)
})
loops.everyInterval(1000, function () {
    const d = francorLidar.diagnostics()
    serial.writeLine("lidar inits=" + d[0] + " fails=" + d[1] + " ms=" + d[2]
        + " vorne=" + francorLidar.distance(francorLidar.LidarSide.Front))
})
input.onButtonPressed(Button.A, function () {
    basic.showNumber(francorLidar.distance(francorLidar.LidarSide.Front))
})
input.onButtonPressed(Button.B, function () {
    francorLidar.setAvoidDistance(200)
    francorLidar.start()
})
input.onButtonPressed(Button.AB, function () {
    basic.showNumber(francorLidar.distance(francorLidar.LidarSide.Left))
    basic.showNumber(francorLidar.distance(francorLidar.LidarSide.Right))
    basic.showNumber(francorLidar.direction())
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (francorLidar.distance(francorLidar.LidarSide.Front) < 200) {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.showIcon(IconNames.No)
    }
})
