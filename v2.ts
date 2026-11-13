namespace francorMaqueen {
    /**
     * Turns a red LED on the front on or off (V2).
     * @param side which LED
     * @param on on or off
     */
    //% blockId=francor_red_led block="red LED %side %on"
    //% help=github:francor-maqueen/docs/francorMaqueen-redLed
    //% group="V2" weight=70
    export function redLed(side: Side, on: OnOff): void {
        // VORLÄUFIG (Gerätetest): an = 1, aus = 0.
        writeSide(side, on == OnOff.On ? 1 : 0)
    }

    /**
     * Measures the distance with the ultrasonic sensor in cm (V2). Gives 0 if nothing is seen.
     */
    //% blockId=francor_ultrasonic block="ultrasonic distance (cm)"
    //% help=github:francor-maqueen/docs/francorMaqueen-ultrasonic
    //% group="V2" weight=69
    export function ultrasonic(): number {
        let data = pingUltrasonic()
        if (data == 0) data = pingUltrasonic()
        data = data / 59.259
        if (data <= 0) return 0
        if (data > 300) return 300
        return Math.round(data)
    }

    // TRIG P13, ECHO P14, timeout 58 ms (as DFRobot readUltrasonic).
    function pingUltrasonic(): number {
        pins.digitalWritePin(DigitalPin.P13, 1)
        control.waitMicros(10)
        pins.digitalWritePin(DigitalPin.P13, 0)
        return pins.pulseIn(DigitalPin.P14, PulseValue.High, 58000)
    }
}
