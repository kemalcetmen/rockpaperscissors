import React , {useState,useEffect,useRef} from 'react'
import Empty_Star from '../public/starempty.svg'
import Full_Star from '../public/starfull.svg'
import Image from 'next/image'

const styles = {
    wrapper: ` flex items-center justify-center`,
  }

const Stars = ({starNumber}) => {
    const [rows,setRows] = useState([])
    useEffect(() => {
      let rows0=[]
      for (var i = 0; i < starNumber; i++) {
          rows0.push(<Image key={i} src={Full_Star} alt="" width={120} height={120}/>);
      }
      for (var i = 0; i < (3-starNumber); i++) {
          rows0.push(<Image key={i+8} src={Empty_Star} alt="" width={120} height={120}/>);
      }
      setRows(rows0)
    },[starNumber])
    
  return (
    <div className={styles.wrapper}>
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
      {rows}
    </div>
  )
}

export default Stars