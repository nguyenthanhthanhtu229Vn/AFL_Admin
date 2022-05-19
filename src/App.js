import logo from "./logo.svg";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ManageAccount from "./components/ManageAccountComponent/ManageAccount";
import ManageTeam from "./components/ManageTeamComponent/ManageTeam";
import ManageTournament from "./components/ManageTournamentComponent/ManageTournament";
import AccountDetail from "./components/AccountDetailComponent/AccountDetail";
import TourDetail from "./components/TourDetailComponent/TourDetail";
import TeamDetail from "./components/TeamDetailComponent/TeamDetail";
function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route exact path="/manageAccount" element={<ManageAccount />} />
          <Route exact path="/manageTeam" element={<ManageTeam />} />
          <Route exact path="/manageTournament" element={<ManageTournament />} />
          <Route exact path="/accountDetail/:idAccount" element={<AccountDetail />} />
          <Route exact path="/tourDetail/:idTour" element={<TourDetail />} />
          <Route exact path="/teamDetail/:idTeam" element={<TeamDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
