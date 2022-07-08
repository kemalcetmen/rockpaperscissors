import styles from '../../styles/Modal.module.css'
import { playerOut } from "../../firebase"

const EndModal = ({winner, playAgain, setInGame}) => {
  return (
    <div className={styles.modalwrapper}>
        <div className={styles.result}>
            {`you  `}
            {winner}
        </div>
        <div className={styles.modalcontainer}>
          <div className={styles.buttons}>
            <div className={styles.button} onClick={()=>{playerOut(),setInGame(false)}}>
              Home
            </div>
            <div className={styles.button} onClick={playAgain}>
              Again
            </div>
          </div>
        </div>
        
    </div>
  )
}

export default EndModal