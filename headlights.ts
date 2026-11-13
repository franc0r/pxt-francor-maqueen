namespace francorMaqueen {
    export enum Side {
        //% block="left"
        Left,
        //% block="right"
        Right,
        //% block="both"
        Both
    }

    export enum HeadColor {
        //% block="off"
        Off = 0,
        //% block="red"
        Red = 1,
        //% block="green"
        Green = 2,
        //% block="yellow"
        Yellow = 3,
        //% block="blue"
        Blue = 4,
        //% block="purple"
        Purple = 5,
        //% block="cyan"
        Cyan = 6,
        //% block="white"
        White = 7
    }

    // Writes value to the left (0x0B) and/or right (0x0C) LED register.
    export function writeSide(side: Side, value: number): void {
        if (side == Side.Left) writeReg(0x0B, [value])
        else if (side == Side.Right) writeReg(0x0C, [value])
        else writeReg(0x0B, [value, value])
    }

    /**
     * Sets the colour of a headlight.
     * @param side which headlight
     * @param color the colour
     */
    //% blockId=francor_headlight block="headlight %side color %color"
    //% help=github:franc0r/pxt-francor-maqueen/docs/francorMaqueen-headlight
    //% side.defl=Side.Both color.defl=HeadColor.Red
    //% group="V3" weight=60
    export function headlight(side: Side, color: HeadColor): void {
        writeSide(side, color)
    }
}
