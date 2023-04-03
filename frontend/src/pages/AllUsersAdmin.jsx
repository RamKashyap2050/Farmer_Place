import React,{ useEffect, useState} from 'react'
import Axios from 'axios'
import { useNavigate, Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import '../styles/AllUsersAdmin.css'
import HeaderforAdmin from '../components/HeaderforAdmin'
import Footer from '../components/Footer'
import { Buffer } from 'buffer'


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

//   const deleteuser = (key) => {
//   Axios.delete(`http://localhost:3002/Admin/delete/${key}`)
// }
    const blockUser = (key) => {
      Axios.put(`http://localhost:3002/Admin/updatetofalse/${key}`)
    }
    const unblockUser = (key) => {
      Axios.put(`http://localhost:3002/Admin/updatetotrue/${key}`)
    }

  const imageUrls = results.map(user => {
    const imageBuffer = user?.image?.data;
    if (!imageBuffer) {
      return null;
    }
    const base64String = Buffer.from(imageBuffer).toString('base64');
    const imageUrl = `data:image/jpeg;base64,${base64String}`;
    return imageUrl;
  });

  return (<>
  <HeaderforAdmin />
    <div className='results'>

      <h1 className='brand'>List of Users</h1>
        Total Users {results.length} :-
        <div>
            <table>
                  <thead>
                    <tr>
                      <th>Profile Photo</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Unblock</th>
                      <th>Block</th>
                    </tr>
                </thead>
                <tbody>
                {results.map((val,key) => (
  <tr key={key}>
    {imageUrls.map((imageUrl, index) => (
      index === key ? (
        <td key={index}>
          {imageUrl && <img className='Dashboardprofilephoto' src={imageUrl} alt='User profile' />}
        </td>
      ) : null
    ))}
    <td>{val.user_name}</td>
    <td>{val.email}</td>
    <td>{val.phone}</td>
    <td>
    <button className='btn-primary' onClick={() => {unblockUser(val._id)}}>
        Unblock
      </button>
    </td> 
    <td>
    <button className='btn-danger' onClick={() => {blockUser(val._id)}}>
        Block
      </button>
    </td>
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
