import React, {useState, useEffect} from 'react'
import Stars from '../Stars'
import Image from 'next/image'
import CircleLoader from "react-spinners/CircleLoader"
import styles from '../../styles/Game.module.css'
import rock from '../../public/rock.svg'
import paper from '../../public/paper.svg'
import scissors from '../../public/scissors.svg'
import { getResult } from "../../utils"
import Modal from 'react-modal'
import EndModal from './EndModal'
import { gameEnd } from "../../firebase"

Modal.setAppElement('#__next')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#b8cbf2',
    padding: 0,
    borderRadius: '30px',
  },
  overlay: {
    backgroundColor: 'rgba(10, 11, 13, 0.55)',
  },
}

const OnlineGame = ({user,setInGame}) => {
  const [situationBar, setSituationBar] = useState("")
  const [myChoice, setMyChoice] = useState("")
  const [computerChoice, setComputerChoice] = useState()
  const [myScore,setMyScore] = useState(0)
  const [computerScore,setComputerScore] = useState(0)
  const [modalIsOpen,setIsOpen] = useState(false)
  const [note,setNote] = useState()
  const [isGameEnd,setGameEnd] = useState(false)

  const choices = ['rock', 'paper', 'scissors']

  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)]
    setComputerChoice(randomChoice)
    return randomChoice
  }
  const iWin = () => {
    if(myScore==2){
      setNote("win")
      setIsOpen(true)
      setGameEnd(true)
      gameEnd(true)
    }
    setMyScore(myScore + 1)
    setSituationBar('You Win')
  }
  const compWin = () => {
    if(computerScore==2){
      setNote("lose")
      setIsOpen(true)
      setGameEnd(true)
      gameEnd(false)
    }
    setComputerScore(computerScore + 1)
    setSituationBar('You Lose')
  }
  const noWin = () => {
    setSituationBar('tie')
  }
  const playAgain = () => {
    setGameEnd(false)
    setMyScore(0)
    setComputerScore(0)
    setNote()
    closeModal()
  }
  const tiktak = () => setTimeout(
    ()=>{
      setComputerChoice("")
      setSituationBar("")
      setComputerChoice("")
      setMyChoice("")
    }
    ,2000)

    const picFinder= (pic) =>{
      if(pic=='scissors'){
        return scissors
      }else if(pic=='paper'){
        return paper
      }else if(pic=='rock'){
        return rock
      }
    }

  const picking = (pick) => {
    if(isGameEnd) return
    if(myChoice) return
    setMyChoice(pick)
    const compCho = generateComputerChoice()
    const winner = getResult(pick,compCho)
    switch (winner) {
      case 'Player 1':
        iWin()
      break
      case 'Player 2':
        compWin()
      break
      case 'tie':
        noWin()
      break
    }
    tiktak()
  }
  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <div className={styles.gamewrapper}>
      <div className={styles.sitBar}>
        {situationBar}
      </div>
      <div className={styles.containers}>
        <div className={styles.onecontainer}>
          <div className={styles.stars}>
            <Stars starNumber={myScore}/>
          </div>
          <div className={styles.images}>
            {!isGameEnd && choices.map((one,i)=>
              <div key={one} className={`${styles.oneImage} ${myChoice && myChoice !== one && styles.unselected} ${!myChoice && styles.selectable }`}>
                <Image key={i} src={picFinder(one)} alt="" fill onClick={() =>{picking(one)}}/>
              </div>)}
          </div>
        </div>
        <div className={styles.modalbuttoncontainer}>
          {isGameEnd && <button title="open modal" onClick={openModal} className={styles.modalbutton}></button>}
        </div>
        <div className={styles.onecontainer}>
          <div className={styles.stars}>
            <Stars starNumber={computerScore}/>
          </div>
          <div className={styles.images}>
            {!isGameEnd && (computerChoice ?
            <div className={styles.oneImage}>
              <Image src={picFinder(computerChoice)} alt="" fill/>
            </div>
            : <CircleLoader size="100px"/>)}
          </div>
        </div>
      </div>
      <Modal isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}>
        <EndModal playAgain={playAgain} user={user} winner={note} setInGame={setInGame}/>
      </Modal>
    </div>
  )
}

export default OnlineGame