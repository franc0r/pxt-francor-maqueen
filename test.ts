// Compile test: runs only when this package is opened as a project.

// Block compile test (never run on hardware): works without start().
francorMaqueen.drive(40 - 20 * francorMaqueen.linePosition(), 40 + 20 * francorMaqueen.linePosition())
if (francorMaqueen.seesLine(francorMaqueen.LineSensor.M)) {
    francorMaqueen.sensorRaw(francorMaqueen.LineSensor.L2)
}
francorMaqueen.stop()
francorMaqueen.start()
francorMaqueen.driveBoth(50)
francorMaqueen.startV2()
francorMaqueen.driveV2(-30, 30)
francorMaqueen.stopV2()
francorMaqueen.patrol(francorMaqueen.OnOff.On)
francorMaqueen.patrolSpeed(2)
francorMaqueen.patrol(francorMaqueen.OnOff.Off)
francorMaqueen.atCrossroad(francorMaqueen.CrossroadRule.Straight)
francorMaqueen.atTJunction(francorMaqueen.TRule.Left)
francorMaqueen.atLeftOrStraight(francorMaqueen.LeftRule.Stop)
francorMaqueen.atRightOrStraight(francorMaqueen.RightRule.Right)
francorMaqueen.onCrossing(1, () => { francorMaqueen.atRightOrStraight(francorMaqueen.RightRule.Straight) })
if (francorMaqueen.junction() == francorMaqueen.isJunction(francorMaqueen.Junction.TJunction)) {
}
francorMaqueen.resetCrossings()
francorMaqueen.crossingsCounted()
francorMaqueen.setLight(francorMaqueen.Led.Two, francorMaqueen.colors(francorMaqueen.Colors.Red))
francorMaqueen.setLight(francorMaqueen.Led.All, francorMaqueen.rgb(0, 0, 255))
francorMaqueen.brightness(80)
francorMaqueen.lightsOff()
francorMaqueen.headlight(francorMaqueen.Side.Both, francorMaqueen.HeadColor.Green)
francorMaqueen.redLed(francorMaqueen.Side.Left, francorMaqueen.OnOff.On)
let ultrasonicDistance = francorMaqueen.ultrasonic()
francorMaqueen.driveDistance(20, francorMaqueen.Dir.Forward, francorMaqueen.Wait.UntilDone)
francorMaqueen.turn(-90, francorMaqueen.Wait.Continue)
francorMaqueen.pidStop()
let wheelCmPerS = francorMaqueen.wheelSpeed(francorMaqueen.Side.Left)
let lightRight = francorMaqueen.ambientLight(francorMaqueen.Side.Right)
let fwVersion = francorMaqueen.version()
