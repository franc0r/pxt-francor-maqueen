namespace francorLidar {
    export enum LidarSide {
        //% block="front"
        Front,
        //% block="left"
        Left,
        //% block="right"
        Right
    }

    export enum AvoidDir {
        //% block="left"
        Left = 1,
        //% block="right"
        Right = 2,
        //% block="free"
        Free = 3
    }

    const ADDR = 0x33
    const CMD_SET_MODE = 1
    const CMD_AVOID_DATA = 6
    const CMD_AVOID_DIST = 7
    // Time the sensor gets to answer. Only the background fiber waits for it,
    // never a pupil's block, so generous limits cost nothing.
    const MODE_TIMEOUT_MS = 2000
    const AVOID_TIMEOUT_MS = 1000
    const POLL_TIMEOUT_MS = 500
    const BOOT_MS = 3000
    const MAX_FAILS = 5
    // After the mode is set the sensor needs 2 to 3 s before it delivers data
    // (device test 06: polls time out meanwhile). Failures in this time do not
    // trigger a new setup, which would only restart the warm-up.
    const WARMUP_MS = 5000

    let started = false
    let lastDirection = AvoidDir.Free
    let lastLeft = NO_VALUE
    let lastFront = NO_VALUE
    let lastRight = NO_VALUE
    let failCount = 0
    let pendingAvoidMm = 0 // 0 = nothing to send
    let avoidDirty = false
    let modeSetAt = 0
    // Diagnostics for the device test (geraetetest/06), not blocks.
    let diagInits = 0
    let diagLastMs = 0

    // Reads one response within timeoutMs. expectCmd < 0 accepts any echo
    // (set-mode, as in the Rust driver). Returns the payload, or null on
    // failure/timeout. Never blocks longer than the limit.
    function readResponse(expectCmd: number, timeoutMs: number): number[] {
        const t0 = control.millis()
        while (control.millis() - t0 < timeoutMs) {
            const status = pins.i2cReadNumber(ADDR, NumberFormat.UInt8BE, false)
            if (status == 0x53) {
                const cmd = pins.i2cReadNumber(ADDR, NumberFormat.UInt8BE, false)
                if (expectCmd >= 0 && cmd != expectCmd) return null
                const lenBuf = pins.i2cReadBuffer(ADDR, 2, false)
                if (lenBuf.length != 2) return null
                const len = lenBuf.getUint8(0) | (lenBuf.getUint8(1) << 8)
                if (len > 32) return null
                const out: number[] = []
                if (len > 0) {
                    const data = pins.i2cReadBuffer(ADDR, len, false)
                    if (data.length != len) return null
                    for (let i = 0; i < len; i++) out.push(data.getUint8(i))
                }
                return out
            }
            if (status == 0x63) return null
            // 0xFF (not ready) and anything else: keep polling
            basic.pause(1)
        }
        return null
    }

    function request(cmd: number, payload: number[], expectCmd: number, timeoutMs: number): number[] {
        const t0 = control.millis()
        const frame = francorMaqueen.lidarRequest(cmd, payload)
        pins.i2cWriteBuffer(ADDR, Buffer.fromArray(frame), false)
        basic.pause(10)
        const res = readResponse(expectCmd, timeoutMs)
        diagLastMs = control.millis() - t0
        return res
    }

    function sendAvoidDistance(): void {
        // Clear the flag first: a setAvoidDistance during the request sets it again.
        const mm = pendingAvoidMm
        avoidDirty = false
        if (request(CMD_AVOID_DIST, [(mm >> 8) & 0xFF, mm & 0xFF], CMD_AVOID_DIST, AVOID_TIMEOUT_MS) == null) {
            avoidDirty = true
        }
    }

    function poll(): void {
        const p = request(CMD_AVOID_DATA, [], CMD_AVOID_DATA, POLL_TIMEOUT_MS)
        const o = (p != null && p.length >= 8) ? francorMaqueen.lidarObstacle(p) : null
        // A bus error reads as zero bytes (i2cReadBuffer zero-fills), which would be
        // "0 mm" = obstacle. Direction 0 marks such a frame; treat it as a failed poll.
        // VORLÄUFIG (Gerätetest): the sensor only ever sends direction 1..3.
        if (o != null && o[0] >= 1 && o[0] <= 3) {
            lastDirection = o[0]
            lastLeft = o[1]
            lastFront = o[2]
            lastRight = o[3]
            failCount = 0
        } else {
            failCount++
            if (failCount >= MAX_FAILS) {
                lastDirection = AvoidDir.Free
                lastLeft = NO_VALUE
                lastFront = NO_VALUE
                lastRight = NO_VALUE
                failCount = MAX_FAILS
            }
        }
    }

    // Sends the mode until the sensor accepts it. Also used after MAX_FAILS
    // failed polls: the sensor may have lost power (robot switched off while
    // the micro:bit stays on USB) and forgotten its mode.
    function setup(): void {
        while (control.millis() < BOOT_MS) basic.pause(50)
        // VORLÄUFIG (Gerätetest): mode payload [1,0,0,4] = avoidance mode, 4x4
        while (request(CMD_SET_MODE, [1, 0, 0, 4], -1, MODE_TIMEOUT_MS) == null) {
            basic.pause(1000)
        }
        diagInits++
        modeSetAt = control.millis()
        failCount = 0
        if (pendingAvoidMm > 0) avoidDirty = true
    }

    /**
     * Switches the LiDAR on. It keeps measuring in the background, your program goes on at once.
     * In the first seconds and without a sensor, the distance is 9999.
     */
    //% blockId=francor_lidar_start block="start LiDAR"
    //% help=github:francor-maqueen/docs/francorLidar-start
    //% weight=100
    export function start(): void {
        if (started) return
        started = true
        control.inBackground(() => {
            setup()
            while (true) {
                if (avoidDirty) sendAvoidDistance()
                poll()
                if (failCount >= MAX_FAILS && control.millis() - modeSetAt > WARMUP_MS) setup()
                basic.pause(20)
            }
        })
    }

    // Device test only (geraetetest/06): how often the mode was set, polls
    // failed in a row, and how long the last request took in ms.
    export function diagnostics(): number[] {
        return [diagInits, failCount, diagLastMs]
    }

    /**
     * Distance to the nearest obstacle in mm.
     * In the first seconds after "start LiDAR" and without a sensor the value is 9999.
     * @param side which side
     */
    //% blockId=francor_lidar_distance block="distance %side (mm)"
    //% help=github:francor-maqueen/docs/francorLidar-distance
    //% weight=90
    export function distance(side: LidarSide): number {
        if (side == LidarSide.Left) return lastLeft
        if (side == LidarSide.Right) return lastRight
        return lastFront
    }

    /**
     * The direction the sensor suggests to pass an obstacle. "free" without a measurement.
     */
    //% blockId=francor_lidar_direction block="avoid direction"
    //% help=github:francor-maqueen/docs/francorLidar-direction
    //% weight=80
    export function direction(): number {
        return lastDirection
    }

    /**
     * A direction, to compare with "avoid direction".
     * @param d the direction
     */
    //% blockId=francor_lidar_is_direction block="%d"
    //% help=github:francor-maqueen/docs/francorLidar-isDirection
    //% weight=79
    export function isDirection(d: AvoidDir): number {
        return d
    }

    /**
     * Distance at which the sensor starts to suggest a direction (100 to 500 mm).
     * On the Maqueen use 200 at most, otherwise the sensor sees the floor.
     * @param mm distance in mm
     */
    //% blockId=francor_lidar_avoid_distance block="avoid distance %mm mm"
    //% help=github:francor-maqueen/docs/francorLidar-setAvoidDistance
    //% mm.min=100 mm.max=500 mm.defl=200
    //% weight=70
    export function setAvoidDistance(mm: number): void {
        if (!(mm >= 0)) return
        mm = Math.max(100, Math.min(500, Math.round(mm)))
        pendingAvoidMm = mm
        avoidDirty = true
    }
}
