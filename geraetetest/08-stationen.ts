// Gerätetest 8: Die Stationen 3, 4 und 5 mit den neuen Blöcken nachgebaut.
// Immer nur EINE der drei Fassungen (normal, mit Laser, Grand Prix) in ein Projekt einfügen:
// Dazu die anderen Fassungen auskommentieren. Hier steht aktiv: Grand Prix normal.
// Die Profi-Fassung steht darunter, auskommentiert.

// ---- Station 3: Fahrschule (Linie auf Knopf A, Not-Aus auf Knopf B) ----
/*
francorMaqueen.start()
input.onButtonPressed(Button.A, function () {
    francorMaqueen.setLight(francorMaqueen.Led.All, francorMaqueen.colors(francorMaqueen.Colors.Red))
    basic.pause(1000)
    francorMaqueen.setLight(francorMaqueen.Led.All, francorMaqueen.colors(francorMaqueen.Colors.Yellow))
    basic.pause(1000)
    francorMaqueen.setLight(francorMaqueen.Led.All, francorMaqueen.colors(francorMaqueen.Colors.Green))
    francorMaqueen.patrolSpeed(1)
    francorMaqueen.patrol(francorMaqueen.OnOff.On)
})
input.onButtonPressed(Button.B, function () {
    francorMaqueen.patrol(francorMaqueen.OnOff.Off)
})
*/

// ---- Station 4: Reflexe (Station 3 plus Laser-Stopp) ----
/*
francorMaqueen.start()
francorLidar.start()
input.onButtonPressed(Button.A, function () {
    francorMaqueen.setLight(francorMaqueen.Led.All, francorMaqueen.colors(francorMaqueen.Colors.Red))
    basic.pause(1000)
    francorMaqueen.setLight(francorMaqueen.Led.All, francorMaqueen.colors(francorMaqueen.Colors.Yellow))
    basic.pause(1000)
    francorMaqueen.setLight(francorMaqueen.Led.All, francorMaqueen.colors(francorMaqueen.Colors.Green))
    francorMaqueen.patrolSpeed(1)
    francorMaqueen.patrol(francorMaqueen.OnOff.On)
})
input.onButtonPressed(Button.B, function () {
    francorMaqueen.patrol(francorMaqueen.OnOff.Off)
})
basic.forever(function () {
    if (francorLidar.distance(francorLidar.LidarSide.Front) < 200) {
        francorMaqueen.patrol(francorMaqueen.OnOff.Off)
        francorMaqueen.setLight(francorMaqueen.Led.All, francorMaqueen.colors(francorMaqueen.Colors.Red))
    }
})
*/

// ---- Station 5: Grand Prix, normal ----
francorMaqueen.start()
francorLidar.start()
input.onButtonPressed(Button.A, function () {
    francorMaqueen.resetCrossings()
    francorMaqueen.atCrossroad(francorMaqueen.CrossroadRule.Straight)
    francorMaqueen.atLeftOrStraight(francorMaqueen.LeftRule.Straight)
    francorMaqueen.atRightOrStraight(francorMaqueen.RightRule.Right)
    francorMaqueen.atTJunction(francorMaqueen.TRule.Stop)
    francorMaqueen.patrolSpeed(2)
    basic.clearScreen()
    francorMaqueen.setLight(francorMaqueen.Led.All, francorMaqueen.colors(francorMaqueen.Colors.Red))
    basic.pause(1000)
    francorMaqueen.setLight(francorMaqueen.Led.All, francorMaqueen.colors(francorMaqueen.Colors.Yellow))
    basic.pause(1000)
    francorMaqueen.setLight(francorMaqueen.Led.All, francorMaqueen.colors(francorMaqueen.Colors.Green))
    francorMaqueen.patrol(francorMaqueen.OnOff.On)
})
input.onButtonPressed(Button.B, function () {
    francorMaqueen.patrol(francorMaqueen.OnOff.Off)
})
francorMaqueen.onCrossing(4, function () {
    music.play(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
})
francorMaqueen.onCrossing(3, function () {
    francorMaqueen.patrolSpeed(1)
    basic.showNumber(1)
})
francorMaqueen.onCrossing(1, function () {
    francorMaqueen.atRightOrStraight(francorMaqueen.RightRule.Straight)
})
basic.forever(function () {
    if (francorLidar.distance(francorLidar.LidarSide.Front) < 200) {
        francorMaqueen.patrol(francorMaqueen.OnOff.Off)
        francorMaqueen.setLight(francorMaqueen.Led.All, francorMaqueen.colors(francorMaqueen.Colors.Red))
    }
})

// ---- Station 5: Grand Prix, Profi (ohne die 2000-ms-Pause nach dem PID-Sprung) ----
/*
let gesprungen = false
function regelnSetzen() {
    francorMaqueen.atCrossroad(francorMaqueen.CrossroadRule.Straight)
    francorMaqueen.atLeftOrStraight(francorMaqueen.LeftRule.Straight)
    francorMaqueen.atTJunction(francorMaqueen.TRule.Stop)
    if (francorMaqueen.crossingsCounted() == 0) {
        francorMaqueen.atRightOrStraight(francorMaqueen.RightRule.Right)
    } else {
        francorMaqueen.atRightOrStraight(francorMaqueen.RightRule.Straight)
    }
}
francorMaqueen.start()
francorLidar.start()
input.onButtonPressed(Button.A, function () {
    francorMaqueen.resetCrossings()
    gesprungen = false
    regelnSetzen()
    francorMaqueen.patrolSpeed(2)
    basic.clearScreen()
    francorMaqueen.setLight(francorMaqueen.Led.All, francorMaqueen.colors(francorMaqueen.Colors.Red))
    basic.pause(1000)
    francorMaqueen.setLight(francorMaqueen.Led.All, francorMaqueen.colors(francorMaqueen.Colors.Yellow))
    basic.pause(1000)
    francorMaqueen.setLight(francorMaqueen.Led.All, francorMaqueen.colors(francorMaqueen.Colors.Green))
    francorMaqueen.patrol(francorMaqueen.OnOff.On)
    basic.pause(500)
    francorMaqueen.headlight(francorMaqueen.Side.Right, francorMaqueen.HeadColor.Yellow)
})
input.onButtonPressed(Button.B, function () {
    francorMaqueen.patrol(francorMaqueen.OnOff.Off)
})
francorMaqueen.onCrossing(4, function () {
    basic.pause(500)
    if (francorLidar.distance(francorLidar.LidarSide.Front) >= 200) {
        francorMaqueen.patrol(francorMaqueen.OnOff.Off)
        // "warte bis fertig" ersetzt die frühere 2000-ms-Pause.
        francorMaqueen.driveDistance(20, francorMaqueen.Dir.Forward, francorMaqueen.Wait.UntilDone)
        regelnSetzen()
        gesprungen = true
        francorMaqueen.patrol(francorMaqueen.OnOff.On)
    } else {
        music.play(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
    }
})
francorMaqueen.onCrossing(3, function () {
    francorMaqueen.patrolSpeed(1)
    basic.showNumber(1)
})
francorMaqueen.onCrossing(1, function () {
    francorMaqueen.atRightOrStraight(francorMaqueen.RightRule.Straight)
    francorMaqueen.headlight(francorMaqueen.Side.Both, francorMaqueen.HeadColor.Green)
})
basic.forever(function () {
    if (francorLidar.distance(francorLidar.LidarSide.Front) < 200) {
        francorMaqueen.patrol(francorMaqueen.OnOff.Off)
        francorMaqueen.setLight(francorMaqueen.Led.All, francorMaqueen.colors(francorMaqueen.Colors.Red))
        if (gesprungen) {
            gesprungen = false
            music.play(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.InBackground)
        }
    }
})
*/
