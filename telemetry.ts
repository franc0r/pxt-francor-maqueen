namespace francorMaqueen {
    /**
     * Speed of a wheel in centimetres per second.
     * With "both", gives the average.
     * @param side which wheel
     */
    //% blockId=francor_wheel_speed block="wheel speed %side (cm/s)"
    //% group="V3" advanced=true weight=40
    export function wheelSpeed(side: Side): number {
        const b = readReg(76, 2)
        const l = b[0] / 5
        const r = b[1] / 5
        if (side == Side.Left) return l
        if (side == Side.Right) return r
        return (l + r) / 2
    }

    /**
     * Brightness measured by the ambient light sensors.
     * With both sides, gives the average.
     * @param side which sensor
     */
    //% blockId=francor_ambient_light block="ambient light %side"
    //% group="V3" advanced=true weight=39
    export function ambientLight(side: Side): number {
        const b = readReg(78, 4)
        const l = (b[0] << 8) | b[1]
        const r = (b[2] << 8) | b[3]
        if (side == Side.Left) return l
        if (side == Side.Right) return r
        return (l + r) / 2
    }

    /**
     * Firmware version of the board as text.
     */
    //% blockId=francor_version block="firmware version"
    //% group="V3" advanced=true weight=38
    export function version(): string {
        const len = readReg(0x32, 1)[0]
        if (len == 0) return ""
        const data = readReg(0x33, len)
        let s = ""
        for (let i = 0; i < len; i++) s += String.fromCharCode(data[i])
        return s
    }
}
