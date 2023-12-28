document.addEventListener('DOMContentLoaded', () => {
    const colored = true

    const target = document.getElementById('square-target')
    if (!colored){
    target.style.border = '3px solid #f2f2f2'
    }
    const targetRect = target.getBoundingClientRect()
    const targetCenter = {
        x: targetRect.left + targetRect.width / 2,
        y: targetRect.top + targetRect.height / 2
        }
    const square1 = document.getElementById('square1-over')
    const square2 = document.getElementById('square2-over')
    const square3 = document.getElementById('square3-over')
    const square4 = document.getElementById('square4-over')

    const squares = [square1, square2, square3, square4]
    const colors = ['skyblue', 'lightslategray',
    'lightgreen', 'peachpuff']

    const squareRects = squares.map(square => square.getBoundingClientRect())
    const squareCenters = squareRects.map(squareRect => ({
        x: squareRect.left + squareRect.width / 2,
        y: squareRect.top + squareRect.height / 2
        }))
    
    squares.forEach((square, index) => {
        if (!colored) {
            square.style.border = '3px solid #f2f2f2'
        }
        square.addEventListener('mouseover', event => {
            let color = colors[index]
            if (colored) {
            square.style.border = `3px solid ${color}`} else {
                square.style.border = `5px solid #f2f2f2`
            }
            const squareCenter = squareCenters[index]
            const targetAngle = Math.atan2(
                squareCenter.y - targetCenter.y,
                squareCenter.x - targetCenter.x
            )

            console.log(targetAngle)
            const targetDistance = Math.sqrt(
                Math.pow(squareCenter.x - targetCenter.x, 2) +
                Math.pow(squareCenter.y - targetCenter.y, 2)
            )
            const lineLength = targetDistance - targetRect.width /4

            const lineLeft = squareCenter.x - lineLength
            const lineTop = squareCenter.y
            let leftStop = lineLength * .4
            let rightStop = lineLength * .6
            const line = document.getElementById('line')
            line.style.position = 'absolute'
            line.style.left = `${lineLeft}px`
            line.style.top = `${lineTop}px`
            line.style.width = `${lineLength}px`
            line.style.transformOrigin = 'top right'
            line.style.transform = `rotate(${targetAngle}rad)`
            if (colored){
            line.style.background = `linear-gradient(to left, ${color} ${leftStop}px, dodgerblue ${rightStop}px)`} else {
                line.style.borderTop = '3px dashed #f2f2f2'
            }
            line.style.backgroundSize = '100% 100%'
            if (colored){
            line.style.paddingTop = '3px'} else {
                line.style.paddingTop = '0px'
            }
            line.style.zIndex = '2'
            line.style.opacity = '1'

            if (targetAngle > -Math.PI / 4 && targetAngle < Math.PI / 4) {
                if (colored){
                target.style.borderRight = `3px solid dodgerblue`}
            } else if (targetAngle > Math.PI / 4 && targetAngle < 3 * Math.PI / 4) {
                if (colored){
                target.style.borderBottom = `3px solid dodgerblue`}
            } else if (targetAngle < -Math.PI / 4 && targetAngle > -3 * Math.PI / 4) {
                if (colored){
                target.style.borderTop = `3px solid dodgerblue`}
            } else {
                if (colored){
                target.style.borderLeft = `3px solid dodgerblue`}
            }

        })
        square.addEventListener('mouseout', event => {
            if (colored){
            square.style.border = '3px dashed #f2f2f2'} else {
                square.style.border = '3px solid #f2f2f2'
            }
            const line = document.getElementById('line')
            if (colored){
            line.style.background = 'linear-gradient(to left, #f2f2f2, #f2f2f2)'
            target.style.border = '3px dashed #f2f2f2'}


        })
        })
    })