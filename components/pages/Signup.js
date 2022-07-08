import React, { useState } from "react"
import { useRouter } from 'next/router'
import Link from 'next/link';
import { signup } from "../../firebase"
import styles from '../../styles/Registers.module.css'

const Signup = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await signup(email, password);
      router.push("/")
    } catch (e) {
        alert(e.message);
    }
    setLoading(false)
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputcontainer}>
        <h2 className={styles.title}>Sign Up</h2>
        <form className={styles.inputcontainer} onSubmit={handleSubmit}>
            <input className={styles.inputs} placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              type='email'
            />
            <input className={styles.inputs} placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              type='password'
            />
            <button disabled={loading} className={styles.submit} type="submit">
            Sign Up
          </button>
        </form>
      </div>
      <div className={styles.routers}>
        <div className={styles.router}>
          <Link href="/forgot-password">Forgot Password?</Link>
        </div>
        <div>
          Already have an account{' '} <Link href='/login'>
          <a className={styles.router}>Sign In</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;