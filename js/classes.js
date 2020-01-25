class complexNumber {
    constructor(a, b) {
        this.a = a
        this.b = b
    }
    quad() {
        return new complexNumber(Math.pow(this.a, 2) - Math.pow(this.b, 2), 2 * this.a * this.b)
    }
    add(complexNumber) {
        this.a += complexNumber.a
        this.b += complexNumber.b
    }
    clone() {
        return new complexNumber(this.a, this.b)
    }

}
class Color {
    constructor(r, g, b) {
        this.r = r
        this.g = g
        this.b = b
    }
    hex() {
        return rgbToHex(this.r, this.g, this.b)
    }
    getRed() {
        return this.r
    }
    getGreen() {
        return this.g
    }
    getBlue() {
        return this.b
    }
    static get RED() {
        return new Color(255, 0, 0)
    }
    static get GREEN() {
        return new Color(0, 255, 0)
    }
    static get BLUE() {
        return new Color(0, 0, 255)
    }
    static get RANDOM() {
        return new Color(getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 256))
    }
}