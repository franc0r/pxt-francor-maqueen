namespace francorMaqueen {
    export enum CrossroadRule {
        //% block="straight"
        Straight = 3,
        //% block="left"
        Left = 1,
        //% block="right"
        Right = 2,
        //% block="stop"
        Stop = 4
    }

    export enum TRule {
        //% block="left"
        Left = 1,
        //% block="right"
        Right = 2,
        //% block="stop"
        Stop = 4
    }

    export enum LeftRule {
        //% block="straight"
        Straight = 3,
        //% block="left"
        Left = 1,
        //% block="stop"
        Stop = 4
    }

    export enum RightRule {
        //% block="straight"
        Straight = 3,
        //% block="right"
        Right = 2,
        //% block="stop"
        Stop = 4
    }

    export enum Junction {
        //% block="none"
        None = 0,
        //% block="crossroad"
        Crossroad = 1,
        //% block="T-junction"
        TJunction = 2,
        //% block="left-or-straight"
        LeftOrStraight = 3,
        //% block="right-or-straight"
        RightOrStraight = 4
    }

    /**
     * Switches the board's built-in line following on or off.
     * "off" also deletes the board's crossing rules: after "on" the default rules apply again.
     * @param on on or off
     */
    //% blockId=francor_patrol block="line following %on"
    //% help=github:franc0r/pxt-francor-maqueen/docs/francorMaqueen-patrol
    //% group="V3" weight=80
    export function patrol(on: OnOff): void {
        writeReg(60, [on == OnOff.On ? 0x05 : 0x08])
    }

    /**
     * Sets the speed of the built-in line following.
     * @param level speed level from 1 (slow) to 5 (fast), eg: 1
     */
    //% blockId=francor_patrol_speed block="line following speed %level"
    //% help=github:franc0r/pxt-francor-maqueen/docs/francorMaqueen-patrolSpeed
    //% level.min=1 level.max=5 level.defl=1
    //% group="V3" weight=79
    export function patrolSpeed(level: number): void {
        writeReg(63, [Math.constrain(Math.round(level), 1, 5)])
    }

    /**
     * What the robot does at a crossroad (left, right and straight).
     * @param m what to do
     */
    //% blockId=francor_at_crossroad block="at crossroad %m"
    //% help=github:franc0r/pxt-francor-maqueen/docs/francorMaqueen-atCrossroad
    //% group="V3" weight=78
    export function atCrossroad(m: CrossroadRule): void {
        writeReg(69, [m])
    }

    /**
     * What the robot does at a T-junction (left and right).
     * @param m what to do
     */
    //% blockId=francor_at_t_junction block="at T-junction %m"
    //% help=github:franc0r/pxt-francor-maqueen/docs/francorMaqueen-atTJunction
    //% group="V3" weight=77
    export function atTJunction(m: TRule): void {
        writeReg(70, [m])
    }

    /**
     * What the robot does where it can turn left or go straight.
     * @param m what to do
     */
    //% blockId=francor_at_left_or_straight block="at left-or-straight %m"
    //% help=github:franc0r/pxt-francor-maqueen/docs/francorMaqueen-atLeftOrStraight
    //% group="V3" weight=76
    export function atLeftOrStraight(m: LeftRule): void {
        writeReg(71, [m])
    }

    /**
     * What the robot does where it can turn right or go straight.
     * @param m what to do
     */
    //% blockId=francor_at_right_or_straight block="at right-or-straight %m"
    //% help=github:franc0r/pxt-francor-maqueen/docs/francorMaqueen-atRightOrStraight
    //% group="V3" weight=75
    export function atRightOrStraight(m: RightRule): void {
        writeReg(72, [m])
    }

    /**
     * The junction the line sensors see right now (0 = none). Compare it with a junction block.
     */
    //% blockId=francor_junction block="junction seen"
    //% help=github:franc0r/pxt-francor-maqueen/docs/francorMaqueen-junction
    //% group="V3" weight=74
    export function junction(): number {
        return readReg(61, 1)[0]
    }

    /**
     * A junction type, to compare with "junction seen".
     * @param j the junction type
     */
    //% blockId=francor_is_junction block="%j"
    //% help=github:franc0r/pxt-francor-maqueen/docs/francorMaqueen-isJunction
    //% group="V3" weight=73
    export function isJunction(j: Junction): number {
        return j
    }
}
