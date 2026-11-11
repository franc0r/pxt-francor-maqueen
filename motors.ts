namespace francorMaqueen {
    function setMotors(left: number, right: number): void {
        writeReg(0x00, [motorDir(left), motorSpeed(left), motorDir(right), motorSpeed(right)])
    }

    /**
     * Drives the left and right wheel. Negative values drive backwards.
     * @param left speed of the left wheel in percent, eg: 50
     * @param right speed of the right wheel in percent, eg: 50
     */
    //% blockId=francor_drive block="drive left %left |\\% right %right |\\%"
    //% left.min=-100 left.max=100 left.defl=50
    //% right.min=-100 right.max=100 right.defl=50
    //% group="V3" weight=90
    export function drive(left: number, right: number): void {
        setMotors(left, right)
    }

    /**
     * Drives both wheels at the same speed. Negative values drive backwards.
     * @param speed speed in percent, eg: 50
     */
    //% blockId=francor_drive_both block="drive %speed |\\%"
    //% speed.min=-100 speed.max=100 speed.defl=50
    //% group="V3" weight=89
    export function driveBoth(speed: number): void {
        setMotors(speed, speed)
    }

    /**
     * Stops both motors.
     */
    //% blockId=francor_stop block="stop motors"
    //% group="V3" weight=88
    export function stop(): void {
        setMotors(0, 0)
    }

    /**
     * Drives the left and right wheel (V2). Negative values drive backwards.
     * @param left speed of the left wheel in percent, eg: 50
     * @param right speed of the right wheel in percent, eg: 50
     */
    //% blockId=francor_drive_v2 block="drive left %left |\\% right %right |\\% (V2)"
    //% left.min=-100 left.max=100 left.defl=50
    //% right.min=-100 right.max=100 right.defl=50
    //% group="V2" weight=90
    export function driveV2(left: number, right: number): void {
        setMotors(left, right)
    }

    /**
     * Stops both motors (V2).
     */
    //% blockId=francor_stop_v2 block="stop motors (V2)"
    //% group="V2" weight=89
    export function stopV2(): void {
        setMotors(0, 0)
    }
}
