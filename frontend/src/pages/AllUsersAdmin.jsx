import React,{ useEffect, useState} from 'react'
import Axios from 'axios'
import { useNavigate, Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import '../styles/AllUsersAdmin.css'
import HeaderforAdmin from '../components/HeaderforAdmin'
import Footer from '../components/Footer'
const AllUsersAdmin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [results, setResults] = useState([])
  const { Admin } = useSelector((state) => state.auth) 
  
  useEffect(() => {
    console.log('useEffect triggered with user:', Admin)
    if (!Admin){
      navigate('/loginadmin')
    }
  },[Admin,navigate])

  useEffect(() => {
      Axios.get("http://localhost:3002/Admin/getallUsers").then((response) => {
    setResults(response.data)
    console.log(response.data)
    })
    },[])

  const deleteuser = (key) => {
  Axios.delete(`http://localhost:3002/Admin/delete/${key}`)

  }
  return (<>
  <HeaderforAdmin />
    <div className='results'>

      <h1 className='brand'>List of Users</h1>
        Total Users {results.length} :-
        <div>
            <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {results.map((val,key) => (
                    <tr key={key}>
                          <td>{val.user_name}</td>
                          <td>{val.email}</td>
                          <td>{val.phone}</td>
                          <td><button className='btn-danger' onClick={() => {deleteuser(val._id)}}>Delete</button></td> 
                      </tr>
                ))}

              </tbody>
              
          </table><br /><br />
          <Link to='/dashboardAdmin'>Go back to Dashboard</Link>

        </div>
    </div>
    <Footer />
    </>
  )
}

export default AllUsersAdmin