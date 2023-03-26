import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/HeaderforUser'
import 'react-toastify/dist/ReactToastify.css'
import LandingPage from './pages/LandingPage';
import LoginforAdmin from './pages/LoginforAdmin';
import DashboardForAdmin from './pages/DashboardforAdmin'
import LoginforUser from './pages/LoginforUser';
import SignupforUser from './pages/SignupforUser';
import ForgotPasswordForm from './pages/forgotpassword';
import ResetPasswordForm from './pages/Resetpassword'
import ProfilePageUser from './pages/ProfilePageUser';
import AllUsersAdmin from './pages/AllUsersAdmin';
import ForgotPasswordAdmin from './pages/forgotpasswordadmin';
import ResetPasswordAdmin from './pages/Resetpasswordadmin';
function App() {
  return (
    <>

{/* <Header /> */}
<Router />




      <Router>
      <div>
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/loginuser' element={<LoginforUser />}/>
          <Route path='/signupuser' element={<SignupforUser />}/>
          <Route path='/loginadmin' element={<LoginforAdmin />} />
          <Route path='/getallUserforAdmin' element={<AllUsersAdmin />} />
          <Route path='/dashboard' element={<ProfilePageUser />}/>
          <Route path='/dashboardAdmin' element={<DashboardForAdmin />}/>
          <Route path='/forgotpassword' element={<ForgotPasswordForm />} />
          <Route path='/reset-password/:id/:token' element={<ResetPasswordForm />} />
          <Route path='/forgotpasswordAdmin' element={<ForgotPasswordAdmin />} />
          <Route path='/reset-password-admin/:id/:token' element={<ResetPasswordAdmin />} />
        </Routes>
    </div>
      </Router>
      {/* <ToastContainer /> */}

    </>
  );
}

export default App;
