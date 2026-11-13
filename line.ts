namespace francorMaqueen {
    // Bit in register 0x1D per sensor: R2=0, R1=1, M=2, L1=3, L2=4.
    function sensorMask(s: LineSensor): number {
        switch (s) {
            case LineSensor.R2: return 1
            case LineSensor.R1: return 2
            case LineSensor.M: return 4
            case LineSensor.L1: return 8
            default: return 16
        }
    }

    // 16-bit raw value registers: R2 0x1E, R1 0x20, M 0x22, L1 0x24, L2 0x26.
    function sensorReg(s: LineSensor): number {
        switch (s) {
            case LineSensor.R2: return 0x1E
            case LineSensor.R1: return 0x20
            case LineSensor.M: return 0x22
            case LineSensor.L1: return 0x24
            default: return 0x26
        }
    }

    /**
     * True if the line sensor sees the black line.
     * @param s which sensor
     */
    //% blockId=francor_sees_line block="sensor %s sees line"
    //% help=github:franc0r/pxt-francor-maqueen/docs/francorMaqueen-seesLine
    //% group="Line" weight=80
    export function seesLine(s: LineSensor): boolean {
        return (readReg(0x1D, 1)[0] & sensorMask(s)) != 0
    }

    /**
     * Raw brightness value of a line sensor.
     * @param s which sensor
     */
    //% blockId=francor_sensor_raw block="raw value sensor %s"
    //% help=github:franc0r/pxt-francor-maqueen/docs/francorMaqueen-sensorRaw
    //% group="Line" weight=79
    export function sensorRaw(s: LineSensor): number {
        const b = readReg(sensorReg(s), 2)
        return b[0] | (b[1] << 8)
    }

    /**
     * Where the line is: from -2 (far right) to 2 (far left), 0 = centered.
     * Positive = line on the left. 100 = no line seen.
     */
    //% blockId=francor_line_position block="line position"
    //% help=github:franc0r/pxt-francor-maqueen/docs/francorMaqueen-linePosition
    //% group="Line" weight=78
    export function linePosition(): number {
        return linePositionFromState(readReg(0x1D, 1)[0])
    }
}
