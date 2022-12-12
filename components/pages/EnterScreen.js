import styles from '../../styles/EnterScreen.module.css'
import { playWithComputer } from "../../firebase"

const EnterScreen = ({ playWith, user }) => {

  return (
    <div className={ styles.wrapper }>
      <div className={ styles.playText }>
        play with
      </div>
      <div className={ styles.buttons }>
        <div className={ styles.playButtons }>
          <div className={ styles.text }>Friend</div>
        </div>
        <div className={ styles.playButtons }>
          <div className={ styles.text }>Stranger</div>
        </div>
        <div className={ styles.playButtons }>
          <div className={ styles.text } onClick={ () => { playWith("computer"), playWithComputer() } }>Computer</div>
        </div>
      </div>
    </div>
  )
}

export default EnterScreen