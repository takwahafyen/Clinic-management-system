// HospitalGuide.jsx

import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./guidelines.scss";

const HospitalGuide = () => {
  return (
    <div>
      <Navbar />
      <div className="hospital-guide">
        <div className="guide-wrapper">
          <section className="guide-section card">
            <h2 className="card-content"> Introduction</h2>
            <p className="card-content">
              Bienvenue à l'Hôpital Medwin Cares, où nous nous engageons à
              fournir des soins de santé exceptionnels et un environnement
              chaleureux pour nos patients.
            </p>
            <img
              src="http://localhost:3000/assets/images/img-1.jpg"
              alt="Hôpital Medwin Cares"
              className="hospital-image"
            />
          </section>
          <section className="guide-section card">
            <h2 className="card-content"> Informations Générales</h2>
            <p className="card-content">
              <h3>Adresse et Coordonnées : </h3> 123 Rue de la Santé, Villeville
              <br />
              <h3>Heures d'Ouverture :</h3>   Ouvert 24/7
              <br />
              <h3> Accès aux Urgences :</h3>  Situé à l'aile nord.
            </p>
          </section>
          <section className="guide-section card">
            <h2 className="card-content"> Services Offerts</h2>
            <p className="card-content">
            <h3>Départements Médicaux : </h3>  Chirurgie, Médecine interne, Pédiatrie,
              etc.
              <br />
              <h3> Spécialités Médicales :</h3>  Cardiologie, Orthopédie, Neurologie, etc.
              <br />
              <h3>Services d'Urgence :</h3>  Ouvert en permanence pour les urgences.
            </p>
          </section>
          <section className="guide-section card">
            <h2 className="card-content"> Personnel Médical</h2>
            <p className="card-content">
            <h3>Liste des Médecins :</h3>       Disponible sur notre site web.
              <br />
              <h3> Horaires de Consultation :</h3>     Affichés à la réception.
              <br />
              <h3>  Contact des Infirmières :</h3>   Appuyez sur le bouton d'appel dans la
              chambre.
            </p>
          </section>
          <section className="guide-section card">
            <h2 className="card-content"> Admission et Enregistrement</h2>
            <p className="card-content">
            <h3>Processus d'Admission :</h3>  Présentez-vous à la réception.
              <br />
              <h3>Documents Nécessaires :</h3>    Carte d'identité, carte d'assurance
              maladie.
              <br />
              Acceptons la plupart des assurances.
            </p>
          </section>
          <section className="guide-section card">
            <h2 className="card-content"> Installation et Équipement</h2>
            <p className="card-content">
              <h3>Description des Installations :</h3> Salles modernes avec équipement
              avancé.
              <br />
             <h3> Équipement Médical : </h3> De pointe et régulièrement mis à jour.
              <br />
             <h3>Chambres et Commodités :</h3>  Chambres individuelles avec salle de
              bains privée.
            </p>
          </section>
          <section className="guide-section card">
            <h2 className="card-content"> Règles et Réglementations</h2>
            <p className="card-content">
              Politiques de Visite : De 10h à 20h, un visiteur à la fois.
              <br />
             <h3>Instructions pour les Patients :</h3>  Respectez les consignes
              médicales.
              <br />
              <h3>Protocoles de Sécurité :</h3> Conformez-vous aux procédures
              d'évacuation.
            </p>
          </section>
          <section className="guide-section card">
            <h2 className="card-content"> Services aux Patients</h2>
            <p className="card-content">
             <h3>Services Sociaux :</h3>  Aide aux patients et aux familles.
              <br />
            <h3>Services de Nutrition :</h3>  Menus adaptés aux besoins médicaux.
              <br />
             <h3>Services de Physiothérapie :</h3>  Disponibles sur rendez-vous.
            </p>
          </section>
          <section className="guide-section card">
            <h2 className="card-content"> Salle d'Attente et Cafétéria</h2>
            <p className="card-content">
              Règles de la Salle d'Attente : Gardez le calme et respectez la
              confidentialité.
              <br />
             <h3>Emplacement de la Cafétéria :</h3>  Au rez-de-chaussée.
              <br />
             <h3>Options de Restauration :</h3>  Repas sains disponibles.
            </p>
          </section>
          <section className="guide-section card">
            <h2 className="card-content"> Contact et Rétroaction</h2>
            <p className="card-content">
              Coordonnées pour les Questions : info@medwincares-hospital.com
              <br />
              Procédure de Rétroaction : Formulaire en ligne sur notre site.
              <br />
              Réseaux Sociaux et Site Web : Suivez-nous sur Facebook et Twitter.
            </p>
          </section>
          <section className="guide-section card">
            <h2 className="card-content"> Ressources Utiles</h2>
            <p className="card-content">
              Liens vers des Ressources Médicales : Bibliothèque en ligne sur la
              santé.
              <br />
             <h3>Informations sur les Associations de Patients :</h3>  Associations
              locales recommandées.
              <br />
              <h3>Glossaire Médical :</h3> Termes médicaux courants expliqués.
            </p>
          </section>
          <section className="guide-section card">
            <h2 className="card-content"> Foire aux Questions (FAQ)</h2>
            <p className="card-content">
              <h3>Questions Courantes des Patients :</h3> Trouvez des réponses utiles
              ici.
              <br />
              <h3>Réponses Utiles : </h3>Informations sur les services, les horaires,
              etc.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HospitalGuide;
