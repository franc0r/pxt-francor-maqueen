// Pure, hardware-free helpers. No pins/basic/control/Math.idiv here (tested in Node).
namespace francorMaqueen {
    export const LINE_LOST = 100

    // Line sensor bits -> position: L2=2, L1=1, M=0, R1=-1, R2=-2; mean of set bits.
    export function linePositionFromState(state: number): number {
        const weights = [-2, -1, 0, 1, 2] // bit 0 (R2) .. bit 4 (L2)
        let sum = 0
        let n = 0
        for (let i = 0; i < 5; i++) {
            if ((state >> i) & 1) {
                sum += weights[i]
                n++
            }
        }
        return n == 0 ? LINE_LOST : sum / n
    }

    // 0 = forward, 1 = backward (register 0x00/0x02 direction byte)
    export function motorDir(percent: number): number {
        return percent < 0 ? 1 : 0
    }

    // VORLÄUFIG (Gerätetest): linear 0..100 % -> 0..255, dead zone not compensated yet.
    export function motorSpeed(percent: number): number {
        let p = Math.abs(percent)
        if (p > 100) p = 100
        return Math.round(p * 255 / 100)
    }

    export function lidarRequest(cmd: number, payload: number[]): number[] {
        const len = payload.length + 1
        return [0x55, (len >> 8) & 0xFF, len & 0xFF, cmd].concat(payload)
    }

    // payload -> [direction, left, front, right] (distances LE16 in mm)
    export function lidarObstacle(payload: number[]): number[] {
        return [
            payload[0],
            payload[2] | (payload[3] << 8),
            payload[4] | (payload[5] << 8),
            payload[6] | (payload[7] << 8)
        ]
    }
}

namespace francorLidar {
    // Returned when the sensor is missing/off; never counts as an obstacle.
    export const NO_VALUE = 9999
}
