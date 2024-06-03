import React from "react";
import NavbarNurse from "../../components/navbar/NavbarNurse";
import Header from "../../components/header/Header";
import Features from "../../components/features/Features";
import Nurse from "../../components/nurse/Nurse";
import Footer from "../../components/footer/Footer";

const HomeNurse = () => {
  return (
    <div className="homeNurse">
      <NavbarNurse />
      <Header />
      <Features />
      
      <Nurse/>
      <Footer/>
    </div>
  );
};

export default HomeNurse;
