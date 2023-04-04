import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import '../styles/LoginforUser.css'
import ContactUs from '../components/ContactUs'
function LoginforUser() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }


    if (isSuccess || user) {

      navigate('/dashboard')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }
    const result = dispatch(login(userData))    
  }

 

  return (
    <>
      <section className='heading'>
        <h1>
      Login User
        </h1>
      </section> <br /><br />
      <span class="line"></span><br /><br />

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button><br />
            <a href="/signupuser">Don't have an Account</a><br/><br />
            <a href="/forgotpassword">Forgot your Password?</a><br /><br />
            <Link to='/' className='guidetobackpage'>Go back to Landing Page</Link>

          </div>
        </form>
      </section>
    <ToastContainer />
    <ContactUs />

    </>
  )
}

export default LoginforUser