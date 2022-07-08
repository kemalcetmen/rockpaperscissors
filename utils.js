const getResult = (p1, p2) => {
    let winner
    switch (p1 + p2) {
      case 'scissorspaper':
      case 'rockscissors':
      case 'paperrock':
        winner ='Player 1'
      break
      case 'paperscissors':
      case 'scissorsrock':
      case 'rockpaper':
        winner ='Player 2'
        break
      case 'paperpaper':
      case 'scissorsscissors':
      case 'rockrock':
        winner ='tie'
      break
    }
    return winner
}

export {getResult}