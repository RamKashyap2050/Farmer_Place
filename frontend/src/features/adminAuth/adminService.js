import axios from "axios"

const Admin_URI_Login = 'http://localhost:3002/Admin/login/'

const LoginAdmin = async(Admin) => {
  const response = await axios.post(Admin_URI_Login, Admin)

  if(response.data){
    localStorage.setItem('Admin', JSON.stringify(response.data))

  }
  console.log(response.data)

  return response.data
}
  
  // Logout user
  const logout = () => {
    localStorage.removeItem('Admin')
  }


  
const adminService = {
    logout,
    LoginAdmin
}

export default adminService