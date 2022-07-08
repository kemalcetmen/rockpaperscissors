import styles from '../../styles/EnterScreen.module.css'
import { playWithComputer } from "../../firebase"

const EnterScreen = ({playWith, user}) => {

  return (
    <div className={styles.wrapper}>
    <div className={styles.playText}>
      play with a ...
    </div>
    <div className={styles.buttons}>
      <div className={styles.playButtons}>Friend</div>
      <div className={styles.playButtons}>Stranger</div>
      <div className={styles.playButtons} onClick={()=>{playWith("computer"),playWithComputer()}}>Computer</div>
    </div>
  </div>
  )
}

export default EnterScreen