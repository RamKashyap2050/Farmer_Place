import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { LoginAdmin, reset } from '../features/auth/authSlice'
import "../styles/LoginforAdmin.css"
function LoginforAdmin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { Admin, user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (Admin) {
      navigate('/dashboardAdmin')
    }

    if(!Admin) {
      navigate('/loginadmin')
    }

    dispatch(reset())
  }, [Admin, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const AdminData = {
      email,
      password,
    }

    dispatch(LoginAdmin(AdminData))
  }

 

  return (
    <>
      <section className='heading'>
        <h1>
          Admin Login
        </h1>
      </section><br /><br />
<span className='line'></span><br /><br />
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
            </button>
          </div>
        </form>
        <Link to='/forgotpasswordAdmin'>Forgot Password?</Link><br /><br />
      <Link to='/'>  Go Back to Landing Page</Link>
      </section>
    </>
  )
}

export default LoginforAdmin