import React, { useState } from "react"
import { login } from "../../firebase"
import { useRouter } from 'next/router'
import Link from 'next/link';
import styles from '../../styles/Registers.module.css'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await login(email, password)
      router.push("/")
    } catch (e){
        alert(e.message)
    }
    setLoading(false)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputcontainer}>
        <h2 className={styles.title}>Log In</h2>
        <form className={styles.inputcontainer} onSubmit={handleSubmit}>
            <input className={styles.inputs} placeholder="Email" 
            onChange={(e)=> setEmail(e.target.value)} 
            type="email"/>
            <input className={styles.inputs} placeholder="Password" 
            onChange={(e)=> setPassword(e.target.value)} 
            type="password"/>
          <button disabled={loading} className={styles.submit} type="submit">
            Log In
          </button>          
        </form>
      </div>
      <div className={styles.routers}>
        <div className={styles.router}>
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>
        <div >
          Need an account?{' '}<Link href="/signup">
          <a className={styles.router}>Sign Up</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login;