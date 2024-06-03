import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import HomeNurse from "./pages/home/HomeNurse";
import HomePha from "./pages/home/HomePha";

import About from "./pages/about/About";
import Guidelines from "./pages/guildlines/Guidelines";
import DoctorSignin from "./pages/doctorSignin/DoctorSignin";
import DoctorSignup from "./pages/doctorSignup/DoctorSignup";
import NurseSignin from "./pages/nurseSignin/NurseSignin";
import NurseSignup from "./pages/nurseSignup/NurseSignup";
import PharmacistSignin from "./pages/pharmacistSignin/PharmacistSignin";
import PharmacistSignup from "./pages/pharmacistSignup/PharmacistSignup";

import PatientRegister from "./pages/patientRegister/PatientRegister";
import PatientRegisterN from "./pages/patientRegisterN/PatientRegisterN";
import ClientRegister from "./pages/clientRegister/ClientRegister";

import ClientInfo from "./pages/clientInfo/ClientInfo";
import PatientInfo from "./pages/patientInfo/PatientInfo";
import PatientInfon from "./pages/patientInfon/PatientInfon";
import CreateFC from "./pages/createFC/CreateFC";
import CreateReport from "./pages/createReport/CreateReport";
import Reports from "./pages/reports/Reports";
import CreateVS from "./pages/createVS/CreateVS";
import VS from "./pages/VS/VS";
import FC from "./pages/FC/FC";

import { useContext } from "react";
import { NurseContext } from "./context/NurseContext";
import { Context } from "./context/Context";
import { PharmacistContext } from "./context/PharmacistContext";

//import { NurseContext } from "./context/NurseContext";

import Setting from "./pages/setting/Setting";
import SettingN from "./pages/setting/SettingN";
import SettingPha from "./pages/setting/SettingPha";

function App() {
  const { doctor } = useContext(Context);
  const { nurse } = useContext(NurseContext);
  const { pharmacist } = useContext(PharmacistContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/HomeNurse" element={<HomeNurse />} />
        <Route exact path="/HomePha" element={<HomePha />} />

        <Route exact path="/about" element={<About />} />
        <Route exact path="/guidelines" element={<Guidelines />} />
        {/* Patient Routes */}

        <Route
          exact
          path="/patient/register"
          element={doctor ? <PatientRegister /> : <DoctorSignup />}
        />
        <Route
          exact
          path="/patient/registerN"
          element={nurse ? <PatientRegisterN /> : <NurseSignup />}
        />

        <Route
          exact
          path="/client/register"
          element={pharmacist ? <ClientRegister /> : <PharmacistSignup />}
        />

        <Route
          exact
          path="/patients/patientInfo/:id"
          element={doctor ? <PatientInfo /> : <DoctorSignin />}
        />
        <Route
          exact
          path="/client/clientInfo/:id"
          element={pharmacist ? <ClientInfo /> : <PharmacistSignin />}
        />
        <Route
          exact
          path="/patients/patientInfon/:id"
          element={nurse ? <PatientInfon /> : <NurseSignin />}
        />

        {/* Doctor Routes */}
        <Route
          exact
          path="/doctor/register"
          element={doctor ? <Home /> : <DoctorSignup />}
        />
        <Route
          exact
          path="/doctor/login"
          element={doctor ? <Home /> : <DoctorSignin />}
        />
        {/* Nurse Routes */}
        <Route
          exact
          path="/nurse/register"
          element={nurse ? <HomeNurse /> : <NurseSignup />}
        />
        <Route
          exact
          path="/nurse/login"
          element={nurse ? <HomeNurse /> : <NurseSignin />}
        />
        {/* Pharmacist Routes */}
        <Route
          exact
          path="/pharmacist/register"
          element={pharmacist ? <HomePha /> : <PharmacistSignup />}
        />
        <Route
          exact
          path="/pharmacist/login"
          element={pharmacist ? <HomePha /> : <PharmacistSignin />}
        />

        {/* Report Routes */}
        <Route
          exact
          path="/patient/:id/create_report"
          element={doctor ? <CreateReport /> : <DoctorSignin />}
        />
        <Route
          exact
          path="/allReports"
          element={doctor ? <Reports /> : <DoctorSignin />}
        />
        <Route
          exact
          path="/reports/:status"
          element={doctor ? <Reports /> : <DoctorSignin />}
        />
        <Route
          exact
          path="/reports/:phone/:nameOfPatient"
          element={doctor ? <Reports /> : <DoctorSignin />}
        />
        {/* VS Routes */}
        <Route
          exact
          path="/patient/:id/create_VS"
          element={nurse ? <CreateVS /> : <nurseSignin />}
        />

        <Route exact path="/allVS" element={nurse ? <VS /> : <NurseSignin />} />
        <Route
          exact
          path="/allFC"
          element={pharmacist ? <FC /> : <PharmacistSignin />}
        />

        <Route
          exact
          path="/VS/:Diabetic_status"
          element={nurse ? <VS /> : <NurseSignin />}
        />
        <Route
          exact
          path="/VS/:phone/:nameOfPatient"
          element={nurse ? <VS /> : <NurseSignin />}
        />
        {/* FC Routes */}

        <Route
          exact
          path="/client/:id/create_FC"
          element={pharmacist ? <CreateFC /> : <PharmacistSignin />}
        />

        <Route
          exact
          path="/FC/:status"
          element={pharmacist ? <FC /> : <PharmacistSignin />}
        />

        <Route
          exact
          path="/FC/:phone/:nameOfClient"
          element={pharmacist ? <FC /> : <PharmacistSignin />}
        />
        <Route exact 
        path="/allFC" 
        element={pharmacist ? <FC /> : <PharmacistSignin />} />

        <Route
          exact
          path="/settings/:id"
          element={doctor ? <Setting /> : <Navigate to="/doctor/login" />}
        />

        <Route
          exact
          path="/settingsPha/:id"
          element={
            pharmacist ? <SettingPha /> : <Navigate to="/pharmacist/login" />
          }
        />

        <Route
          exact
          path="/settingsN/:id"
          element={nurse ? <SettingN /> : <Navigate to="/nurse/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
