const canvas = document.querySelector('canvas')
const canvasContext = canvas.getContext('2d')
const cursor = {
  x: undefined,
  y: undefined,
}
let circles = null

/* Circle class */
function Circle(x, y, radius, xVelocity, yVelocity) {
  this.x = x
  this.y = y
  this.orgRadius = radius
  this.radius = radius
  this.xVelocity = xVelocity
  this.yVelocity = yVelocity
  this.color = this.colors[getRandomInt(0, 4)]

  /* Draw circle */
  this.draw = () => {
    this.canvas.beginPath()
    this.canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.canvas.fillStyle = this.color
    this.canvas.fill()
  }

  /* Update animation */
  this.update = () => {
    if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
      this.xVelocity *= -1
    }
    if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
      this.yVelocity *= -1
    }
    this.x += this.xVelocity
    this.y += this.yVelocity

    // mouse movement
    if (Math.abs(this.cursor.x - this.x) < 50 && Math.abs(this.cursor.y - this.y) < 50) {
      if (this.radius < this.maxRaduis) {
        this.radius++
      }
    } else if (this.radius > this.orgRadius) {
      this.radius--
    }
    this.draw()
  }
}
Circle.prototype.canvas = canvasContext
Circle.prototype.cursor = cursor
Circle.prototype.maxRaduis = 40
Circle.prototype.colors = [
  '#E37B40',
  '#46B29D',
  '#DE5B49',
  '#324D5C',
  '#F0CA4D',
]

/* Add Event Listener */
window.addEventListener('mousemove', e => {
  cursor.x = e.x
  cursor.y = e.y
})

window.addEventListener('resize', e => {
  init()
})

/* Utilities */
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Init circles */
function init() {
  let width = window.innerWidth
  let height = window.innerHeight
  let count = width * height / 1000

  // init canvas&circles
  canvas.width = width
  canvas.height = height
  circles = []

  // make circles
  for (let i = 0; i < count; i++) {
    let radius = getRandomInt(1, 5)
    let x = getRandomInt(radius, width - radius)
    let y = getRandomInt(radius, height - radius)
    let velocity = 1
    let xv = getRandom(-velocity, velocity)
    let yv = getRandom(-velocity, velocity)
    circles.push(new Circle(x, y, radius, xv, yv))
  }
}
init()

/* Animate circles */
function animate() {
  canvasContext.clearRect(0, 0, innerWidth, innerHeight) // clear canvas
  circles.forEach(c => c.update()) // update all circles
  requestAnimationFrame(animate)
}
animate()