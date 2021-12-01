var calculateCombos = function(gridSize) {
    // vertical & horizontal winning combinations
    let verticalCombos = []
    let horizontalCombos = []
    for (let i = 0; i < gridSize; i++) {
        let vArr = []
        let hArr = []
        for (let y = 0; y < gridSize; y++) {
            let vCoord = i + gridSize * y
            let hCoord = i * gridSize + y
            vArr.push(vCoord)
            hArr.push(hCoord)
        }
        verticalCombos.push(vArr)
        horizontalCombos.push(hArr)
    }

    // diagonal winning combinations
    let diagonalCombos = []
    let dLeftArr = []
    let dRightArr = []
    for (let y = 0; y < gridSize; y++) {
        let dCoord = y + gridSize * y
        dLeftArr.push(dCoord)
    }
    for (let y = 0; y < gridSize; y++) {
        const c = gridSize - 1
        let dCoord = c * (1 + y)
        dRightArr.push(dCoord)
    }
    diagonalCombos = [ dLeftArr, dRightArr ]
    
    // all winning combinations
    let allWinningCombos = [ ...verticalCombos, ...horizontalCombos, ...diagonalCombos ]
    
    return allWinningCombos
}

var checkWinningCombos = function(allWinningCombos, gridStatus, symbol) {
    // check winning combination
    let checkDone = false;
    let winningCombo = []
    let hasWinner = false;
    while (!checkDone) {
        for (let i = 0; i < allWinningCombos.length; i++) {
            let combo = allWinningCombos[i]
            hasWinner = combo.every(cell => { return gridStatus[cell] === symbol})
            if (hasWinner) {
                console.log('Match won by: ', symbol)
                winningCombo = combo
                checkDone = true
                break
            }
        }
        console.log('No winning combos')
        checkDone = true
    }

    return { hasWinner: hasWinner, winningCombo: winningCombo, symbol: symbol }
}

var botAction = function(gridStatus) {
    // Getting bot move
    const availableCells = gridStatus.filter(cell => { return typeof(cell) === 'number' })
    const randomValue = Math.floor(Math.random()*availableCells.length);
    const randomMove = availableCells[randomValue];
    return randomMove
}

module.exports = {
    calculateCombos: calculateCombos,
    checkWinningCombos: checkWinningCombos,
    botAction: botAction,
}