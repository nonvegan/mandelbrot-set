const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const divRanges = document.getElementById('div')
const divResetButton = document.getElementById('resetDiv')
const xRange = document.createElement('input')
const yRange = document.createElement('input')
const zRange = document.createElement('input')
const infinityRange = document.createElement('input')
const sizeRange = document.createElement('input')
const xRangeLabel = document.createElement('label')
const yRangeLabel = document.createElement('label')
const zRangeLabel = document.createElement('label')
const infinityRangeLabel = document.createElement('label')
const switchSliderLabel = document.createElement('label')
const sizeRangeLabel = document.createElement('label')
const switchSlider = document.createElement('label')
const button = document.createElement('button')

divRanges.appendChild(xRangeLabel)
divRanges.appendChild(xRange)
divRanges.appendChild(yRangeLabel)
divRanges.appendChild(yRange)
divRanges.appendChild(zRangeLabel)
divRanges.appendChild(zRange)
divRanges.appendChild(infinityRangeLabel)
divRanges.appendChild(infinityRange)
divRanges.appendChild(sizeRangeLabel)
divRanges.appendChild(sizeRange)
divResetButton.appendChild(switchSliderLabel)
divResetButton.appendChild(switchSlider)
divResetButton.appendChild(button)

xRange.setAttribute("type", "range")
yRange.setAttribute("type", "range")
zRange.setAttribute("type", "range")
infinityRange.setAttribute("type", "range")
sizeRange.setAttribute("type", "range")
xRange.setAttribute("min", "1")
yRange.setAttribute("min", "1")
zRange.setAttribute("min", "1")
sizeRange.setAttribute("min", "1")

xRangeLabel.innerText = "Re[c]"
yRangeLabel.innerText = "Img[c]"
zRangeLabel.innerText = "Z"
infinityRangeLabel.innerText = "Infinity Limit"
sizeRangeLabel.innerText = "Size"
switchSliderLabel.innerText = "Grid"
button.innerHTML = "<span>Reset</span> Button"
switchSlider.className = "switch"
switchSlider.innerHTML = "<input type=\"checkbox\"><span class =\"slider round\"></span>"

button.addEventListener('click', () => {
    switchSlider.firstChild.checked = false
    xRange.value = 50
    yRange.value = 50
    zRange.value = 50
    infinityRange.value = 50
    sizeRange.value = 50
    clearImageData()
    draw()
})

xRange.addEventListener('change', () => {
    clearImageData()
    draw()
})

yRange.addEventListener('change', () => {
    clearImageData()
    draw()
})

infinityRange.addEventListener('change', () => {
    clearImageData()
    draw()
})

zRange.addEventListener('change', () => {
    clearImageData()
    draw()
})

sizeRange.addEventListener('change', () => {
    clearImageData()
    draw()
})

switchSlider.addEventListener('change', () => {
    checkGridStatus()
})

const width = 600
const height = 600
canvas.width = width
canvas.height = height
let newImageData = new ImageData(width, height)

draw()

function draw() {
    drawImage()
    checkGridStatus()
}

function drawImage() {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let i = (x + y * width) * 4
            let c = Mandelbrot(x, y)
            if (c) {
                newImageData.data[i] = mapValue(c, 0, 1, 249, 255)
                newImageData.data[i + 1] = mapValue(c, 0, 1, 38, 255)
                newImageData.data[i + 2] = mapValue(c, 0, 1, 114, 255)
                newImageData.data[i + 3] = 255
            } else {

                newImageData.data[i + 3] = 0
            }


        }
    }
    ctx.putImageData(newImageData, 0, 0)
}

function clearImageData() {
    newImageData = new ImageData(width, height)
}

function drawGrid() {
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(width / 2, 0)
    ctx.lineTo(width / 2, height)
    ctx.moveTo(0, height / 2)
    ctx.lineTo(width, height / 2)
    ctx.stroke()
}

function checkGridStatus() {
    if (switchSlider.firstChild.checked) {
        drawGrid()
    } else
        clearGrid()
}

function clearGrid() {
    ctx.clearRect(0, 0, width, height)
    ctx.putImageData(newImageData, 0, 0)
}

function Mandelbrot(x, y) {
    let rangex = xRange.value / sizeRange.value * 2.5
    let rangey = yRange.value / sizeRange.value * 2.5
    let c = new complexNumber(mapValue(x, 0, width, -rangex, rangex), mapValue(y, 0, height, -rangey, rangey))
    let nextC = c.clone()
    let n = 0
    let z = zRange.value
    let infinity = mapValue(infinityRange.value, 0, 100, 0, 5)
    while (n < z) {
        nextC = nextC.quad()
        nextC.add(c)
        if (Math.abs(nextC.a + nextC.b) > infinity)
            break
        n++
    }
    return n / z
}