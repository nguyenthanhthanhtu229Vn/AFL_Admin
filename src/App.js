import logo from "./logo.svg";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ManageAccount from "./components/ManageAccountComponent/ManageAccount";
import ManageTeam from "./components/ManageTeamComponent/ManageTeam";
import ManageReport from "./components/ManageReportComponent/ManageReport";
import ManageTournament from "./components/ManageTournamentComponent/ManageTournament";
import AccountDetail from "./components/AccountDetailComponent/AccountDetail";
import TourDetail from "./components/TourDetailComponent/TourDetail";
import TeamDetail from "./components/TeamDetailComponent/TeamDetail";
import Login from "./components/Login/Login";
import Dashboard from "./components/DashboardComponent/Dashboard";
import ManagePromote from "./components/ManagePromoteComponent/ManagePromote";
import Profile from "./components/ProfileComponent/Profile";
import ResetPassword from "./components/ResetPasswordComponent/ResetPassword";
import ChangePassWord from "./components/ChangePasswordComponent/ChangePassword";
import ManagePlayer from "./components/ManagePlayerComponent/ManagePlayer";
import PlayerDetail from "./components/PlayerDetailComponent/PlayerDetail";
import useAuthListener from "./hooks/user_auth";
function App() {
  // const user = localStorage.getItem("userInfo");
  const { user } = useAuthListener()  
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
        <Route exact path="/resetPassword" element={<ResetPassword />} />
        <Route
            exact
            path="/changePassword"
            element={user ? <ChangePassWord /> : <Navigate to={"/login"} />}
          />
        <Route
            exact
            path="/profile"
            element={user ? <Profile /> : <Navigate to={"/login"} />}
          />
          <Route
            exact
            path="/"
            element={user ? <Dashboard /> : <Navigate to={"/login"} />}
          />
          <Route
            exact
            path="/home"
            element={user ? <Dashboard /> : <Navigate to={"/login"} />}
          />
          <Route
            exact
            path="/manageAccount"
            element={user ? <ManageAccount /> : <Navigate to={"/login"} />}
          />
          <Route
            exact
            path="/manageTeam"
            element={user ? <ManageTeam /> : <Navigate to={"/login"} />}
          />
          <Route
            exact
            path="/manageTournament"
            element={user ? <ManageTournament /> : <Navigate to={"/login"} />}
          />
          <Route
            exact
            path="/manageReport"
            element={user ? <ManageReport /> : <Navigate to={"/login"} />}
          />
          <Route
            exact
            path="/managePromote"
            element={user ? <ManagePromote /> : <Navigate to={"/login"} />}
          />
          <Route
            exact
            path="/managePlayer"
            element={user ? <ManagePlayer /> : <Navigate to={"/login"} />}
          />
          <Route
            exact
            path="/accountDetail/:idAccount"
            element={user ? <AccountDetail /> : <Navigate to={"/login"} />}
          />
          <Route
            exact
            path="/tourDetail/:idTour"
            element={user ? <TourDetail /> : <Navigate to={"/login"} />}
          />
          <Route
            exact
            path="/teamDetail/:idTeam"
            element={user ? <TeamDetail /> : <Navigate to={"/login"} />}
          />
          <Route
            exact
            path="/playerDetail/:idPlayer"
            element={user ? <PlayerDetail /> : <Navigate to={"/login"} />}
          />
          <Route
            exact
            path="/login"
            element={user ? <Navigate to={"/home"} /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
