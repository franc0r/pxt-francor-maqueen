namespace francorMaqueen {
    export enum Led {
        //% block="1"
        One = 0,
        //% block="2"
        Two = 1,
        //% block="3"
        Three = 2,
        //% block="4"
        Four = 3,
        //% block="all"
        All = 4
    }

    export enum Colors {
        //% block="red"
        Red = 0xFF0000,
        //% block="orange"
        Orange = 0xFFA500,
        //% block="yellow"
        Yellow = 0xFFFF00,
        //% block="green"
        Green = 0x00FF00,
        //% block="blue"
        Blue = 0x0000FF,
        //% block="indigo"
        Indigo = 0x4B0082,
        //% block="violet"
        Violet = 0x8A2BE2,
        //% block="purple"
        Purple = 0xFF00FF,
        //% block="white"
        White = 0xFFFFFF,
        //% block="black"
        Black = 0x000000
    }

    // Four WS2812 LEDs underneath, colours kept as 0xRRGGBB.
    const lightColors: number[] = [0, 0, 0, 0]
    let lightBrightness = 255

    function showLights(): void {
        const buf = pins.createBuffer(12)
        for (let i = 0; i < 4; i++) {
            const c = lightColors[i]
            // GRB order, brightness applied here.
            buf[i * 3] = ((c >> 8) & 0xFF) * lightBrightness / 255
            buf[i * 3 + 1] = ((c >> 16) & 0xFF) * lightBrightness / 255
            buf[i * 3 + 2] = (c & 0xFF) * lightBrightness / 255
        }
        // Pin: P15 on the V2, P1 on the V3 (without start block: V3).
        const pin = model == Model.V2 ? DigitalPin.P15 : DigitalPin.P1
        light.sendWS2812Buffer(buf, pin)
    }

    /**
     * Sets one of the four lights underneath, or all of them.
     * @param led which light
     * @param color the colour
     */
    //% blockId=francor_set_light block="set light %led to %color=francor_colors"
    //% help=github:francor-maqueen/docs/francorMaqueen-setLight
    //% group="Lights" weight=90
    export function setLight(led: Led, color: number): void {
        // VORLÄUFIG (Gerätetest): LED-Nummer -> Pufferindex (1 -> 0 ... 4 -> 3).
        if (led == Led.All) {
            for (let i = 0; i < 4; i++) lightColors[i] = color
        } else {
            lightColors[led] = color
        }
        showLights()
    }

    /**
     * Gives you a colour.
     * @param c the colour
     */
    //% blockId=francor_colors block="%c"
    //% help=github:francor-maqueen/docs/francorMaqueen-colors
    //% group="Lights" weight=89 blockGap=8
    export function colors(c: Colors): number {
        return c
    }

    /**
     * Mixes a colour from red, green and blue.
     * @param r red, eg: 255
     * @param g green, eg: 128
     * @param b blue, eg: 0
     */
    //% blockId=francor_rgb block="red %r green %g blue %b"
    //% help=github:francor-maqueen/docs/francorMaqueen-rgb
    //% r.min=0 r.max=255 g.min=0 g.max=255 b.min=0 b.max=255
    //% group="Lights" weight=88 blockGap=8
    export function rgb(r: number, g: number, b: number): number {
        r = Math.constrain(r, 0, 255)
        g = Math.constrain(g, 0, 255)
        b = Math.constrain(b, 0, 255)
        return (r << 16) | (g << 8) | b
    }

    /**
     * Sets how bright the lights underneath are.
     * @param v brightness from 0 to 255, eg: 128
     */
    //% blockId=francor_brightness block="light brightness %v"
    //% help=github:francor-maqueen/docs/francorMaqueen-brightness
    //% v.min=0 v.max=255 v.defl=128
    //% group="Lights" weight=87
    export function brightness(v: number): void {
        lightBrightness = Math.constrain(v, 0, 255)
        showLights()
    }

    /**
     * Turns all lights off: the four underneath and both headlights.
     */
    //% blockId=francor_lights_off block="all lights off"
    //% help=github:francor-maqueen/docs/francorMaqueen-lightsOff
    //% group="Lights" weight=86
    export function lightsOff(): void {
        for (let i = 0; i < 4; i++) lightColors[i] = 0
        showLights()
        writeSide(Side.Both, 0)
    }
}
