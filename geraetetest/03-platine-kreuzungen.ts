// Gerätetest 3: Linienverfolgung und Kreuzungen auf der Platine.
// A = Verfolgung an (Tempo 1), B = aus. Während der Fahrt Logo berühren: Tempo 5, loslassen: Kreuzungsart zeigen.
// Regeln stehen unten; ändere sie je Durchgang (geradeaus / links / rechts / halt).
francorMaqueen.start()
francorMaqueen.resetCrossings()
input.onButtonPressed(Button.A, function () {
    francorMaqueen.resetCrossings()
    francorMaqueen.atCrossroad(francorMaqueen.CrossroadRule.Straight)
    francorMaqueen.atTJunction(francorMaqueen.TRule.Stop)
    francorMaqueen.atLeftOrStraight(francorMaqueen.LeftRule.Straight)
    francorMaqueen.atRightOrStraight(francorMaqueen.RightRule.Right)
    francorMaqueen.patrolSpeed(1)
    francorMaqueen.patrol(francorMaqueen.OnOff.On)
})
input.onButtonPressed(Button.B, function () {
    francorMaqueen.patrol(francorMaqueen.OnOff.Off)
    basic.showNumber(francorMaqueen.crossingsCounted())
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    francorMaqueen.patrolSpeed(5)
})
// An Kreuzung 1 den Abzweig rechts auf geradeaus umstellen.
francorMaqueen.onCrossing(1, function () {
    francorMaqueen.atRightOrStraight(francorMaqueen.RightRule.Straight)
    basic.showNumber(1)
})
// Welche Kreuzungsart sieht er? Logo-Taste zeigt die Zahl:
// 0 = keine, 1 = Kreuzung, 2 = T, 3 = Abzweig links, 4 = Abzweig rechts.
// Roboter mit Verfolgung aus (B) über eine Kreuzung schieben und Logo drücken.
input.onLogoEvent(TouchButtonEvent.Released, function () {
    basic.showNumber(francorMaqueen.junction())
})
// Punkt oben links: sieht er gerade ein T?
basic.forever(function () {
    if (francorMaqueen.junction() == francorMaqueen.isJunction(francorMaqueen.Junction.TJunction)) {
        led.plot(0, 0)
    } else {
        led.unplot(0, 0)
    }
})
// Test "Kreuzungszähler bei parallelem Lesen": Diese Schleife liest ständig die Linienlage
// (zweiter I2C-Leser neben der Kreuzungsschleife). Zählung muss trotzdem stimmen.
// Nur die unterste Reihe neu zeichnen, damit angezeigte Zahlen lesbar bleiben.
basic.forever(function () {
    const x = Math.constrain(Math.round(2 - francorMaqueen.linePosition()), 0, 4)
    for (let i = 0; i < 5; i++) {
        if (i != x) led.unplot(i, 4)
    }
    led.plot(x, 4)
    basic.pause(5)
})
// Variante für "Regeln gelten neu (Standard)": In Knopf A die vier Regelzeilen
// (atCrossroad ... atRightOrStraight) und patrolSpeed(1) weglassen, nur
// resetCrossings() und patrol(On) behalten. Dann gelten nach jedem "an" die Standardregeln.
