import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/LandingPage";
import LoginforAdmin from "./pages/LoginforAdmin";
import DashboardForAdmin from "./pages/DashboardforAdmin";
import LoginforUser from "./pages/LoginforUser";
import SignupforUser from "./pages/SignupforUser";
import ForgotPasswordForm from "./pages/forgotpassword";
import ResetPasswordForm from "./pages/Resetpassword";
import ProfilePageUser from "./pages/ProfilePageUser";
import AllUsersAdmin from "./pages/AllUsersAdmin";
import ForgotPasswordAdmin from "./pages/forgotpasswordadmin";
import ResetPasswordAdmin from "./pages/Resetpasswordadmin";
import Feedpage from "./pages/Feedpage";
import MarketPlace from "./pages/MarketPlace";
import AllListingsforAdmin from "./pages/AllListingsforAdmin";
import AllPostsforAdmin from "./pages/AllPostsforAdmin";
import Feedback from "./pages/Feedback";
import ManagePostsforUser from "./pages/ManagePostsforUser";
import ManageMarketPlace from "./pages/ManageMarketPlace";
import EditYourProfile from "./pages/Edityourprofile";
import CheckoutFeedbacks from "./pages/CheckoutFeedbacks";
import Peopleyouwanttoknow from "./components/Peopleyouwanttoknow";
import ManageFollowers from "./pages/ManageFollowers";
import ManageFollowing from "./pages/ManageFollowing";
import IndividualProfilePageUser from "./pages/IndividualProfilePageUser";
import ViewIndividualUserFollowersandFollowing from "./pages/ViewIndividualUserFollowersandFollowing";
import ContentRestriction from "./components/ContentRestriction";
import WorkInProgress from "./pages/WorkInProgress";
import SavedPostsforUser from "./pages/SavedPostsforUser";
import FriendRequestApproval from "./pages/FriendRequestApproval";
import CloseFriends from "./pages/CloseFriends";
import NewPost from "./components/NewPost";
import ManageCommunity from "./pages/ManageCommunity";
import CreateCommunity from "./pages/CreateCommunity";
import ExistingCommunity from "./pages/ExisitingCommunity";
import CreateCommunityContent from "./pages/CreateCommunityContent";

function App() {
  return (
    <>
      <Router />
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/loginuser" element={<LoginforUser />} />
            <Route path="/signupuser" element={<SignupforUser />} />
            <Route path="/loginadmin" element={<LoginforAdmin />} />
            <Route path="/edityourprofile" element={<EditYourProfile />} />
            <Route path="/getallUserforAdmin" element={<AllUsersAdmin />} />
            <Route path="/dashboard" element={<ProfilePageUser />} />
            <Route path="/dashboardAdmin" element={<DashboardForAdmin />} />
            <Route path="/forgotpassword" element={<ForgotPasswordForm />} />
            <Route
              path="/reset-password/:id/:token"
              element={<ResetPasswordForm />}
            />
            <Route
              path="/forgotpasswordAdmin"
              element={<ForgotPasswordAdmin />}
            />
            <Route
              path="/reset-password-admin/:id/:token"
              element={<ResetPasswordAdmin />}
            />
            <Route path="/feedpage" element={<Feedpage />} />
            <Route path="/marketplace" element={<MarketPlace />} />
            <Route
              path="/getallistingsforadmin"
              element={<AllListingsforAdmin />}
            />
            <Route path="/getallpostsforadmin" element={<AllPostsforAdmin />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/manageuserpost" element={<ManagePostsforUser />} />
            <Route path="/manageuserproduct" element={<ManageMarketPlace />} />
            <Route path="/cehckoutfeedbacks" element={<CheckoutFeedbacks />} />
            <Route path="/followers" element={<Peopleyouwanttoknow />} />
            <Route path="/checkuserfollowers" element={<ManageFollowers />} />
            <Route path="/checkuserfollowing" element={<ManageFollowing />} />
            <Route
              path="/profile/:id"
              element={<IndividualProfilePageUser />}
            />
            <Route
              path="/profile/:id/viewfollowers"
              element={<ViewIndividualUserFollowersandFollowing />}
            />
            <Route
              path="/contentrestriction"
              element={<ContentRestriction />}
            />
            <Route path="/workinprogress" element={<WorkInProgress />} />
            <Route path="/savedposts" element={<SavedPostsforUser />} />
            <Route path="/friendrequests" element={<FriendRequestApproval />} />
            <Route path="/editclosefriends" element={<CloseFriends />} />
            <Route path="/newpost" element={<NewPost />} />
            <Route path="/managecommunity" element={<ManageCommunity />} />
            <Route
              path="/managecommunity/createcommunity"
              element={<CreateCommunity />}
            />
            <Route
              path="/managecommunity/existingcommunity"
              element={<ExistingCommunity />}
            />
            <Route
              path="/createCommunityContent/:id"
              element={<CreateCommunityContent />}
            />
          </Routes>
        </div>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
