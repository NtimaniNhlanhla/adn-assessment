import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import validateEmail from '../utils/validateEmail'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            toast.success(user.message)
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

        if(!name || !email || !password || !password2){
            toast.error('All fields are required')
            return;
        }

        if(!validateEmail(email)){
            toast.error('Enter valid Email')
            return;
        }

        if (password !== password2) {
            toast.error('password do not match')
            return;
        }

        const userData = {
            name,
            email,
            password
        }

        dispatch(register(userData))

    }

    if (isLoading) {
        return <Spinner />
    }

    return (<>
        <section className='heading'>
            <h1>
                <FaUser /> Register
            </h1>
            <p>Please create an account</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" id='name'
                        value={name} name='name' placeholder='Enter your name'
                        maxLength={50}
                        onChange={onChange}
                    />
                </div>
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
                <div className="form-group">
                    <input type="password" className="form-control" id='password2'
                        value={password2} name='password2' placeholder='Re-Enter password'
                        maxLength={50}
                        onChange={onChange}
                    />
                </div>
                <div className="form-goup">
                    <button className="btn btn-block">Submit</button>
                </div>

            </form>
        </section>
    </>
    )
}

export default Register
