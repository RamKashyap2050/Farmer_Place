import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Header from '../components/HeaderforUser'
import ContactUs from '../components/ContactUs'
function SignupforUser() {
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    password: '',
    password2: '',
    phone:'',
    image:''
  })

  const { user_name, email, password, password2, phone, image } = formData
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
    if (e.target.type === 'file') {
      const file = e.target.files[0];
      setFormData((prevState) => ({
        ...prevState,
        image: file,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = new FormData();
      userData.append('user_name', user_name);
      userData.append('email', email);
      userData.append('password', password);
      userData.append('phone', phone);
      userData.append('image', image);

      dispatch(register(userData))
    }
  }


  return (<>
    <div className='register'>
      <section className='heading'>
        <h1>
         Signup
        </h1>
      </section><br /><br />
      <span class="line"></span><br /><br />

      <section className='form'>
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='user_name'
              value={user_name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
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
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='phone'
              name='phone'
              value={phone}
              placeholder='Phone Number'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='file'
              className='form-control'
              id='image'
              name='image'
              placeholder='Choose a Picture for Profile Photo'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button><br />
            <a href="/loginuser">Do you already have an Account</a>
          </div>
        </form>
      </section>
    </div>
    <ContactUs />
    </>
  )
}

export default SignupforUser