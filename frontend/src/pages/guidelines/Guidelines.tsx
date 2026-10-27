import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./guidelines.scss";

const HospitalGuide: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="hospital-guide">
        <div className="guide-wrapper">
          <section className="guide-section card">
            <h2 className="card-content">Introduction</h2>
            <p className="card-content">
              Welcome to the Clinic Management System — a modern platform
              dedicated to delivering exceptional healthcare and a warm,
              supportive environment for every patient.
            </p>
            <img
              src="/assets/images/img-1.jpg"
              alt="Clinic Management System"
              className="hospital-image"
            />
          </section>
          <section className="guide-section card">
            <h2 className="card-content">General Information</h2>
            <div className="card-content">
              <h3>Address &amp; Contact:</h3> 123 Health Street, Medicity
              <br />
              <h3>Opening Hours:</h3> Open 24 / 7
              <br />
              <h3>Emergency Access:</h3> Located in the north wing.
            </div>
          </section>
          <section className="guide-section card">
            <h2 className="card-content">Services Offered</h2>
            <div className="card-content">
              <h3>Medical Departments:</h3> Surgery, Internal Medicine,
              Pediatrics, and more.
              <br />
              <h3>Medical Specialties:</h3> Cardiology, Orthopedics, Neurology,
              and more.
              <br />
              <h3>Emergency Services:</h3> Always open for urgent cases.
            </div>
          </section>
          <section className="guide-section card">
            <h2 className="card-content">Medical Staff</h2>
            <div className="card-content">
              <h3>Doctors Directory:</h3> Available on our website.
              <br />
              <h3>Consultation Schedules:</h3> Displayed at the reception desk.
              <br />
              <h3>Nurse Contact:</h3> Press the call button in your room.
            </div>
          </section>
          <section className="guide-section card">
            <h2 className="card-content">Admission &amp; Registration</h2>
            <div className="card-content">
              <h3>Admission Process:</h3> Please check in at the reception desk.
              <br />
              <h3>Required Documents:</h3> National ID card and health insurance
              card.
              <br />
              We accept most major insurance providers.
            </div>
          </section>
          <section className="guide-section card">
            <h2 className="card-content">Facilities &amp; Equipment</h2>
            <div className="card-content">
              <h3>Facility Overview:</h3> Modern rooms equipped with advanced
              medical technology.
              <br />
              <h3>Medical Equipment:</h3> State-of-the-art and regularly
              updated.
              <br />
              <h3>Rooms &amp; Amenities:</h3> Private rooms with en-suite
              bathrooms.
            </div>
          </section>
          <section className="guide-section card">
            <h2 className="card-content">Rules &amp; Regulations</h2>
            <div className="card-content">
              Visiting Hours: 10 AM – 8 PM, one visitor at a time.
              <br />
              <h3>Patient Instructions:</h3> Please follow all medical
              guidelines provided by staff.
              <br />
              <h3>Safety Protocols:</h3> Comply with all evacuation and safety
              procedures.
            </div>
          </section>
          <section className="guide-section card">
            <h2 className="card-content">Patient Services</h2>
            <div className="card-content">
              <h3>Social Services:</h3> Assistance available for patients and
              families.
              <br />
              <h3>Nutrition Services:</h3> Menus tailored to medical
              requirements.
              <br />
              <h3>Physiotherapy Services:</h3> Available by appointment.
            </div>
          </section>
          <section className="guide-section card">
            <h2 className="card-content">Waiting Area &amp; Cafeteria</h2>
            <div className="card-content">
              Waiting Area Rules: Please keep noise to a minimum and respect
              patient privacy.
              <br />
              <h3>Cafeteria Location:</h3> Ground floor.
              <br />
              <h3>Dining Options:</h3> Healthy meals available throughout the
              day.
            </div>
          </section>
          <section className="guide-section card">
            <h2 className="card-content">Contact &amp; Feedback</h2>
            <div className="card-content">
              General Enquiries: info@clinic-management-system.com
              <br />
              Feedback Process: Online form available on our website.
              <br />
              Social Media &amp; Website: Follow us on Facebook and Twitter.
            </div>
          </section>
          <section className="guide-section card">
            <h2 className="card-content">Useful Resources</h2>
            <div className="card-content">
              Medical Resource Links: Online health library available on our
              portal.
              <br />
              <h3>Patient Associations:</h3> Recommended local support groups.
              <br />
              <h3>Medical Glossary:</h3> Common medical terms explained in plain
              language.
            </div>
          </section>
          <section className="guide-section card">
            <h2 className="card-content">Frequently Asked Questions (FAQ)</h2>
            <div className="card-content">
              <h3>Common Patient Questions:</h3> Find helpful answers below.
              <br />
              <h3>Useful Answers:</h3> Information on services, schedules, and
              more.
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HospitalGuide;
