import React from "react";
import NavbarPha from "../../components/navbar/NavbarPha";
import Header from "../../components/header/Header";
import Features from "../../components/features/Features";
import Pharmacist from "../../components/pharmacist/Pharmacist";
import Footer from "../../components/footer/Footer";

const HomePha = () => {
  return (
    <div className="homePha">
      <NavbarPha />
      <Header />
      <Features />
    
      <Pharmacist/>
      
      <Footer/>
    </div>
  );
};

export default HomePha;