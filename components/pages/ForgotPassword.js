import React, { useState } from "react"
import { forgotpass } from "../../firebase"
import { useRouter } from 'next/router'
import Link from 'next/link';
import styles from '../../styles/Registers.module.css'

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('');
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await forgotpass(email)
      router.push("/login")
    } catch (e){
        alert(e)
    }
    setLoading(false)
  }


  return (
    <div className={styles.wrapper}>
      <div className={styles.inputcontainer}>
        <h2 className={styles.title}>Reset Password</h2>
        <form className={styles.inputcontainer} onSubmit={handleSubmit}>
          <input className={styles.inputs} placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            type='email'
          />
          <button disabled={loading} className={styles.submit} type="submit">
            Reset Password
          </button>
        </form>
      </div>
      <div className={styles.routers}>
        <div>
          Already have an account{' '} <Link href='/login'>
          <a className={styles.router}>Sign In</a>
          </Link>
        </div>
        <div >
          Need an account?{' '}<Link href="/signup">
          <a className={styles.router}>Sign Up</a>
          </Link>
        </div>
      </div>
    </div>  )
}

export default ForgotPassword