namespace francorMaqueen {
    // Waits until the board answers (version register 0x32 != 0), blinking X.
    // Waiting forever is intended, also in the simulator.
    function waitForBoard(): void {
        while (readReg(0x32, 1)[0] == 0) {
            basic.showLeds(`
                # . . . #
                . # . # .
                . . # . .
                . # . # .
                # . . . #
                `, 10)
            basic.pause(500)
            basic.clearScreen()
        }
        basic.showLeds(`
            . . . . .
            . . . . #
            . . . # .
            # . # . .
            . # . . .
            `, 10)
        basic.pause(500)
        basic.clearScreen()
    }

    /**
     * Resets the Maqueen Plus V3 board and waits until it answers.
     * Shows a check mark when ready.
     */
    //% blockId=francor_start block="start Maqueen"
    //% help=github:franc0r/pxt-francor-maqueen/docs/francorMaqueen-start
    //% group="V3" weight=100
    export function start(): void {
        model = Model.V3
        writeReg(0x49, [1]) // system reset
        basic.pause(100)
        waitForBoard()
    }

    /**
     * Starts the Maqueen Plus V2 and waits until it answers.
     * Shows a check mark when ready.
     */
    //% blockId=francor_start_v2 block="start Maqueen V2"
    //% help=github:franc0r/pxt-francor-maqueen/docs/francorMaqueen-startV2
    //% group="V2" weight=100
    export function startV2(): void {
        model = Model.V2
        // VORLÄUFIG (Gerätetest): V2 may not know the reset register 0x49, so no reset here.
        waitForBoard()
    }
}
