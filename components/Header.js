import styles from '../styles/Header.module.css'
import { useListVals } from 'react-firebase-hooks/database';
import { useAuth } from '../contexts/AuthContext';
import { ref} from "firebase/database";
import { db, logout, playerOut} from "../firebase"

const Header = () => {
    const { user } = useAuth();
    const [values, loading, error] = useListVals(ref(db, 'players/' + user.uid));

    return (
    <div className={styles.wrapper}>
        <div className={styles.buttons}>
            <div className={`${styles.button} ${styles.signout}`} onClick={logout}>
                Sign Out
            </div>
            {values[1] && 
            <div className={`${styles.button} ${styles.exit}`} onClick={playerOut}>
                Exit Game
            </div>}
            
        </div>
        <div className={styles.points}>
            <div className={styles.point}>
                <div>Points</div>
                <div>{values && values[3]}</div>
            </div>
            <div className={styles.point}>
                <div>Streak</div>
                <div>{values && values[5]}</div>
            </div>
        </div>
        
    </div>
  )
}

export default Header