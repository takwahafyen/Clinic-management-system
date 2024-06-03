import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Features from "../../components/features/Features";
import Speciality from "../../components/speciality/Speciality";
import Pharmacist from "../../components/pharmacist/Pharmacist";
import Nurse from "../../components/nurse/Nurse";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Header />
      <Features />
      <Speciality/>
      <Pharmacist/>
      <Nurse/>
      <Footer/>
    </div>
  );
};

export default Home;
