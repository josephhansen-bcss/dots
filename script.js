document.addEventListener('DOMContentLoaded', () => {
    const colored = false

    const target = document.getElementById('square-target')
    target.style.border = '3px solid #f2f2f2'
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

            square.style.border = '3px solid #f2f2f2'

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

            const targetDistance = Math.sqrt(
                Math.pow(squareCenter.x - targetCenter.x, 2) +
                Math.pow(squareCenter.y - targetCenter.y, 2)
            )
            const lineLength = targetDistance - targetRect.width /2

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
            
            const line = document.getElementById('line')
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