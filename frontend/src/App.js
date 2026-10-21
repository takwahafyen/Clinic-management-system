import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import HomeNurse from "./pages/home/HomeNurse";
import HomePha from "./pages/home/HomePha";

import About from "./pages/about/About";
import Guidelines from "./pages/guidelines/Guidelines";
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
        <Route path="/" element={<Home />} />
        <Route path="/HomeNurse" element={<HomeNurse />} />
        <Route path="/HomePha" element={<HomePha />} />

        <Route path="/about" element={<About />} />
        <Route path="/guidelines" element={<Guidelines />} />

        {/* Patient Routes */}
        <Route
          path="/patient/register"
          element={doctor ? <PatientRegister /> : <Navigate to="/doctor/login" />}
        />
        <Route
          path="/patient/registerN"
          element={nurse ? <PatientRegisterN /> : <Navigate to="/nurse/login" />}
        />
        <Route
          path="/client/register"
          element={pharmacist ? <ClientRegister /> : <Navigate to="/pharmacist/login" />}
        />

        <Route
          path="/patients/patientInfo/:id"
          element={doctor ? <PatientInfo /> : <Navigate to="/doctor/login" />}
        />
        <Route
          path="/client/clientInfo/:id"
          element={pharmacist ? <ClientInfo /> : <Navigate to="/pharmacist/login" />}
        />
        <Route
          path="/patients/patientInfon/:id"
          element={nurse ? <PatientInfon /> : <Navigate to="/nurse/login" />}
        />

        {/* Doctor Routes */}
        <Route
          path="/doctor/register"
          element={doctor ? <Navigate to="/" /> : <DoctorSignup />}
        />
        <Route
          path="/doctor/login"
          element={doctor ? <Navigate to="/" /> : <DoctorSignin />}
        />

        {/* Nurse Routes */}
        <Route
          path="/nurse/register"
          element={nurse ? <Navigate to="/HomeNurse" /> : <NurseSignup />}
        />
        <Route
          path="/nurse/login"
          element={nurse ? <Navigate to="/HomeNurse" /> : <NurseSignin />}
        />

        {/* Pharmacist Routes */}
        <Route
          path="/pharmacist/register"
          element={pharmacist ? <Navigate to="/HomePha" /> : <PharmacistSignup />}
        />
        <Route
          path="/pharmacist/login"
          element={pharmacist ? <Navigate to="/HomePha" /> : <PharmacistSignin />}
        />

        {/* Report Routes */}
        <Route
          path="/patient/:id/create_report"
          element={doctor ? <CreateReport /> : <Navigate to="/doctor/login" />}
        />
        <Route
          path="/allReports"
          element={doctor ? <Reports /> : <Navigate to="/doctor/login" />}
        />
        <Route
          path="/reports/:status"
          element={doctor ? <Reports /> : <Navigate to="/doctor/login" />}
        />
        <Route
          path="/reports/:phone/:nameOfPatient"
          element={doctor ? <Reports /> : <Navigate to="/doctor/login" />}
        />

        {/* VS Routes */}
        <Route
          path="/patient/:id/create_VS"
          element={nurse ? <CreateVS /> : <NurseSignin />}
        />
        <Route
          path="/allVS"
          element={nurse ? <VS /> : <Navigate to="/nurse/login" />}
        />
        <Route
          path="/VS/:Diabetic_status"
          element={nurse ? <VS /> : <Navigate to="/nurse/login" />}
        />
        <Route
          path="/VS/:phone/:nameOfPatient"
          element={nurse ? <VS /> : <Navigate to="/nurse/login" />}
        />

        {/* FC Routes */}
        <Route
          path="/client/:id/create_FC"
          element={pharmacist ? <CreateFC /> : <Navigate to="/pharmacist/login" />}
        />
        <Route
          path="/allFC"
          element={pharmacist ? <FC /> : <Navigate to="/pharmacist/login" />}
        />
        <Route
          path="/FC/:status"
          element={pharmacist ? <FC /> : <Navigate to="/pharmacist/login" />}
        />
        <Route
          path="/FC/:phone/:nameOfClient"
          element={pharmacist ? <FC /> : <Navigate to="/pharmacist/login" />}
        />

        {/* Settings Routes */}
        <Route
          path="/settings/:id"
          element={doctor ? <Setting /> : <Navigate to="/doctor/login" />}
        />
        <Route
          path="/settingsPha/:id"
          element={pharmacist ? <SettingPha /> : <Navigate to="/pharmacist/login" />}
        />
        <Route
          path="/settingsN/:id"
          element={nurse ? <SettingN /> : <Navigate to="/nurse/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
