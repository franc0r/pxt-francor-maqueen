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
