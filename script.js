document.addEventListener('DOMContentLoaded', () => {
    let colored = false

    let target = document.getElementById('square-target')
    target.style.border = '3px solid #f2f2f2'
    let targetRect = target.getBoundingClientRect()
    let targetCenter = {
        x: targetRect.left + targetRect.width / 2,
        y: targetRect.top + targetRect.height / 2
        }
    let square1 = document.getElementById('square1-over')
    let square2 = document.getElementById('square2-over')
    let square3 = document.getElementById('square3-over')
    let square4 = document.getElementById('square4-over')

    let squares = [square1, square2, square3, square4]
    let colors = ['skyblue', 'lightslategray',
    'lightgreen', 'peachpuff']

    let squareRects = squares.map(square => square.getBoundingClientRect())
    
    let squareCenters = []

  function updateSquareCenters() {
    squareCenters = squares.map((square) => {
      let squareRect = square.getBoundingClientRect();
      return {
        x: squareRect.left + squareRect.width / 2,
        y: squareRect.top + squareRect.height / 2,
      }
    })
  }

  updateSquareCenters()

  squares.forEach((square, index) => {
    let isDragging = false
    let initialX
    let initialY
    let offsetX = 0
    let offsetY = 0
  
    square.addEventListener('mousedown', (event) => {
      isDragging = true
      initialX = event.clientX
      initialY = event.clientY
      offsetX = square.offsetLeft
      offsetY = square.offsetTop
    })
  
    document.addEventListener('mousemove', (event) => {
      if (isDragging) {
        const deltaX = event.clientX - initialX
        const deltaY = event.clientY - initialY
        square.style.left = `${offsetX + deltaX}px`
        square.style.top = `${offsetY + deltaY}px`
        let line = document.getElementById('line')
        line.style.opacity = '0.5'
        square.dispatchEvent(new Event('mouseout'))
        square.dispatchEvent(new Event('mouseover'))
      }
      updateSquareCenters()
    })
  
    document.addEventListener('mouseup', () => {
      isDragging = false
    })
    square.addEventListener('mouseup', () => {
        line.style.opacity = '0.0'
        square.dispatchEvent(new Event('mouseout'))
        square.dispatchEvent(new Event('mouseover'))
    })
  })

  window.addEventListener('resize', () => {
    targetRect = target.getBoundingClientRect()
    targetCenter = {
      x: targetRect.left + targetRect.width / 2,
      y: targetRect.top + targetRect.height / 2,
    }
    updateSquareCenters()
  })
    
    squares.forEach((square, index) => {

            square.style.border = '3px solid #f2f2f2'

        square.addEventListener('mouseover', event => {
            let color = colors[index]
            if (colored) {
            square.style.border = `3px solid ${color}`} else {
                square.style.border = `5px solid #f2f2f2`
            }
            let squareCenter = squareCenters[index]
            let targetAngle = Math.atan2(
                squareCenter.y - targetCenter.y,
                squareCenter.x - targetCenter.x
            )

            let targetDistance = Math.sqrt(
                Math.pow(squareCenter.x - targetCenter.x, 2) +
                Math.pow(squareCenter.y - targetCenter.y, 2)
            )
            let lineLength
            if (targetRect.width > targetRect.height) {
            lineLength = targetDistance - targetRect.height /2}
            else {
                lineLength = targetDistance - targetRect.width /2
            }

            let lineLeft = squareCenter.x - lineLength
            let lineTop = squareCenter.y
            let leftStop = lineLength * .4
            let rightStop = lineLength * .6
            let line = document.getElementById('line')
            line.style.position = 'absolute'
            line.style.left = `${lineLeft}px`
            line.style.top = `${lineTop}px`
            line.style.width = `${lineLength}px`
            line.style.transformOrigin = 'top right'
            line.style.transform = `rotate(${targetAngle}rad)`
            line.style.opacity = '1.0'
            
            let squareRect = square.getBoundingClientRect()
            let back = document.getElementById('back2')
            back.style.clipPath = `polygon(${squareRect.left}px ${squareRect.top}px, ${squareRect.right}px ${squareRect.top}px, ${squareRect.right}px ${squareRect.bottom}px, ${squareRect.left}px ${squareRect.bottom}px)`
            
            let back2 = document.getElementById('back3')
            back2.style.clipPath = `polygon(${targetRect.left}px ${targetRect.top}px, ${targetRect.right}px ${targetRect.top}px, ${targetRect.right}px ${targetRect.bottom}px, ${targetRect.left}px ${targetRect.bottom}px)`
            




            if (colored){
            line.style.background = `linear-gradient(to left, ${color} ${leftStop}px, dodgerblue ${rightStop}px)`} else {
                line.style.borderTop = '3px dotted #f2f2f2'
            }
            line.style.backgroundSize = '100% 100%'
            if (colored){
            line.style.paddingTop = '3px'} else {
                line.style.paddingTop = '0px'
            }
            line.style.zIndex = '3'
            line.style.opacity = '1'

            if (targetAngle > -Math.PI / 4 && targetAngle < Math.PI / 4) {
                if (colored){
                target.style.borderRight = `3px solid dodgerblue`}
                else {
                    target.style.borderRight = `3px dotted #f2f2f2`
                }
            } else if (targetAngle > Math.PI / 4 && targetAngle < 3 * Math.PI / 4) {
                if (colored){
                target.style.borderBottom = `3px solid dodgerblue`} else {
                    target.style.borderBottom = `3px dotted #f2f2f2`
                }
            } else if (targetAngle < -Math.PI / 4 && targetAngle > -3 * Math.PI / 4) {
                if (colored){
                target.style.borderTop = `3px solid dodgerblue`} else {
                    target.style.borderTop = `3px dotted #f2f2f2`
                }
            } else {
                if (colored){
                target.style.borderLeft = `3px solid dodgerblue`} else {
                    target.style.borderLeft = `3px dotted #f2f2f2`
                }
            }

        })
        square.addEventListener('mouseout', event => {

            square.style.border = '3px solid #f2f2f2'
            
            let line = document.getElementById('line')
            line.style.opacity = '0.5'
            if (colored){
            line.style.background = 'linear-gradient(to left, #f2f2f2, #f2f2f2)'
            target.style.border = '3px solid #f2f2f2'

            } else {
                target.style.border = '3px solid #f2f2f2'
            }
            


        })
        })
    })
