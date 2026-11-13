namespace francorMaqueen {
    // Minimum gap between two counted crossings, so one crossing is not counted twice.
    const LOCKOUT_MS = 300

    let count = 0
    let counterRunning = false
    let numbers: number[] = []
    let actions: (() => void)[] = []

    function startCounter(): void {
        if (counterRunning) return
        counterRunning = true
        control.inBackground(() => {
            let before = 0
            let last = -LOCKOUT_MS
            while (true) {
                const now = junction()
                // counts only the change "no junction" -> "junction"
                if (now != 0 && before == 0 && control.millis() - last >= LOCKOUT_MS) {
                    last = control.millis()
                    count++
                    for (let i = 0; i < numbers.length; i++) {
                        if (numbers[i] == count) control.runInParallel(actions[i])
                    }
                }
                before = now
                basic.pause(20)
            }
        })
    }

    /**
     * Runs once when the robot reaches the crossing with this number.
     * Counting starts at the start (or at "reset crossing counter").
     * @param nr number of the crossing, eg: 1
     * @param handler what to do
     */
    //% blockId=francor_on_crossing
    //% help=github:franc0r/pxt-francor-maqueen/docs/francorMaqueen-onCrossing
    //% afterOnStart=true
    //% block="when crossing number $nr reached"
    //% nr.min=1 nr.defl=1
    //% group="V3" weight=72
    export function onCrossing(nr: number, handler: () => void): void {
        numbers.push(nr)
        actions.push(handler)
        startCounter()
    }

    /**
     * How many crossings the robot has seen so far.
     */
    //% blockId=francor_crossings_counted block="crossings counted"
    //% help=github:franc0r/pxt-francor-maqueen/docs/francorMaqueen-crossingsCounted
    //% group="V3" weight=71
    export function crossingsCounted(): number {
        startCounter()
        return count
    }

    /**
     * Starts counting from 0 again.
     */
    //% blockId=francor_reset_crossings block="reset crossing counter"
    //% help=github:franc0r/pxt-francor-maqueen/docs/francorMaqueen-resetCrossings
    //% group="V3" weight=70
    export function resetCrossings(): void {
        count = 0
        startCounter()
    }
}
