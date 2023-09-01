import React, { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import validateEmail from '../utils/validateEmail'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Enter email and password');
      return;
    }

    if(!validateEmail(email)){
      toast.error('Enter valid Email')
      return;
  }

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return <>
    <section className='heading'>
      <h1>
        <FaSignInAlt /> Login
      </h1>
      <p>Login and start creating Tickets</p>
    </section>
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input type="email" className="form-control" id='email'
            value={email} name='email' placeholder='Enter your email'
            maxLength={50}
            onChange={onChange}

          />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" id='password'
            value={password} name='password' placeholder='Enter password'
            maxLength={50}
            onChange={onChange}
          />
        </div>
        <div className="form-goup">
          <button className="btn btn-block">Login</button>
        </div>

      </form>
    </section>
  </>
}

export default Login
