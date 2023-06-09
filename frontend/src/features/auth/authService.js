import axios from 'axios'

const API_URL_Register = '/Users/register/'
//Register
const register = async (userData) => {
    const response = await axios.post(API_URL_Register, userData)

    if(response.data){
      localStorage.removeItem("Admin")
      localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Login user
const API_URL_login = '/Users/login/'

const login = async (userData) => {
    const response = await axios.post(API_URL_login, userData)
  
    if (response.data) {
      localStorage.removeItem("Admin")
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    console.log(response.data)

    return response.data
  }

const Admin_URI_Login = 'http://localhost:3002/Admin/login/'

const LoginAdmin = async(Admin) => {
  const response = await axios.post(Admin_URI_Login, Admin)

  if(response.data){
    localStorage.removeItem('user')
    localStorage.setItem('Admin', JSON.stringify(response.data))

  }
  console.log(response.data)

  return response.data
}
  
  // Logout user
  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('Admin')
  }


const authService = {
    register,
    login,
    logout,
    LoginAdmin
}

export default authService