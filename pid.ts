namespace francorMaqueen {
    export enum Dir {
        //% block="forward"
        Forward = 1,
        //% block="backward"
        Backward = 2
    }

    export enum Wait {
        //% block="wait until done"
        UntilDone,
        //% block="continue"
        Continue
    }

    // Busy flag of the PID controller (register 87). The register index must be
    // written again before EVERY read, otherwise the flag stays stale.
    function pidBusy(): boolean {
        return readReg(87, 1)[0] == 1
    }

    // Never hangs: wait-for-1 ends after 500 ms, wait-for-0 after 30 000 ms.
    function waitPidDone(): void {
        // VORLÄUFIG (Gerätetest): 500 ms until the flag becomes 1 (very short moves or other firmware never set it).
        let t = 0
        while (t < 500 && !pidBusy()) {
            basic.pause(10)
            t += 10
        }
        t = 0
        while (t < 30000 && pidBusy()) {
            basic.pause(10)
            t += 10
        }
    }

    /**
     * Drives an exact distance with the board's PID controller.
     * @param cm distance in centimetres, eg: 20
     * @param dir forward or backward
     * @param wait wait until the move is done, or continue at once
     */
    //% blockId=francor_drive_distance block="drive %cm cm %dir %wait"
    //% help=github:franc0r/pxt-francor-maqueen/docs/francorMaqueen-driveDistance
    //% cm.min=1 cm.max=1000 cm.defl=20
    //% group="V3" weight=55
    export function driveDistance(cm: number, dir: Dir, wait: Wait): void {
        const d = Math.max(0, Math.min(1000, Math.round(cm)))
        writeReg(64, [dir])
        writeReg(85, [2])
        writeReg(65, [(d >> 8) & 0xFF])
        writeReg(66, [d & 0xFF])
        writeReg(60, [0x06])
        if (wait == Wait.UntilDone) waitPidDone()
    }

    /**
     * Turns on the spot by an exact angle with the board's PID controller.
     * Positive angles turn clockwise, negative angles counter-clockwise.
     * @param degrees angle in degrees, eg: 90
     * @param wait wait until the move is done, or continue at once
     */
    //% blockId=francor_turn block="turn %degrees ° %wait"
    //% help=github:franc0r/pxt-francor-maqueen/docs/francorMaqueen-turn
    //% degrees.min=-180 degrees.max=180 degrees.defl=90
    //% group="V3" weight=54
    export function turn(degrees: number, wait: Wait): void {
        const a = Math.max(-180, Math.min(180, Math.round(degrees)))
        // VORLÄUFIG (Gerätetest): direction of positive angles (assumed clockwise, check on the robot).
        writeReg(67, [a >= 0 ? 1 : 2])
        writeReg(86, [2])
        writeReg(68, [Math.abs(a)])
        writeReg(60, [0x06])
        if (wait == Wait.UntilDone) waitPidDone()
    }

    /**
     * Stops a running drive or turn move.
     */
    //% blockId=francor_pid_stop block="stop drive move"
    //% help=github:franc0r/pxt-francor-maqueen/docs/francorMaqueen-pidStop
    //% group="V3" weight=53
    export function pidStop(): void {
        writeReg(60, [0x10])
    }
}
