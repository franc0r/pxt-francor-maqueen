namespace francorMaqueen {
    // I2C address of the Maqueen Plus main board.
    export const ADDR = 0x10

    export enum Model {
        V3,
        V2
    }

    export enum LineSensor {
        //% block="L2"
        L2,
        //% block="L1"
        L1,
        //% block="M"
        M,
        //% block="R1"
        R1,
        //% block="R2"
        R2
    }

    export enum OnOff {
        //% block="on"
        On,
        //% block="off"
        Off
    }

    // Default: V3. Set by start() / startV2(). Blocks work without a start block.
    export let model: Model = Model.V3

    export function writeReg(reg: number, bytes: number[]): void {
        const buf = pins.createBuffer(bytes.length + 1)
        buf[0] = reg
        for (let i = 0; i < bytes.length; i++) buf[i + 1] = bytes[i]
        pins.i2cWriteBuffer(ADDR, buf)
    }

    // Write register address, then read n bytes (no repeated start).
    export function readReg(reg: number, n: number): Buffer {
        pins.i2cWriteNumber(ADDR, reg, NumberFormat.UInt8BE)
        return pins.i2cReadBuffer(ADDR, n)
    }
}
