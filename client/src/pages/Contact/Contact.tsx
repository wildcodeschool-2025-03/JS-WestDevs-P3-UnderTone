import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "../../assets/styles/forms.css";
import "./Contact.css";

function Contact() {
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Message envoyé avec succès ✉️");
    setTimeout(() => {
      navigate("/app/home");
    }, 1500);
  };
  return (
    <main className="contact-page">
      <h1>Contactez-nous</h1>

      <div className="contact-content">
        <section className="contact-form-container">
          <form onSubmit={handleSubmit}>
            <h3>Formulaire de contact</h3>

            <div className="input-group">
              <input type="text" name="nom" id="nom" required placeholder="" />
              <label htmlFor="nom">Nom</label>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="prenom"
                id="prenom"
                required
                placeholder=""
              />
              <label htmlFor="prenom">Prénom</label>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder=""
              />
              <label htmlFor="email">Email</label>
              <p>Email non valide.</p>
            </div>
            <div className="input-group">
              <textarea
                name="message"
                id="message"
                required
                placeholder=""
                maxLength={500}
              />
              <label htmlFor="message">Votre message</label>
              <p>Merci de renseigner un message.</p>
            </div>
            <button type="submit">Envoyer</button>
            {sent && (
              <p className="success-message">
                Votre message a bien été envoyé !
              </p>
            )}
          </form>
        </section>

        <section className="contact-map-block">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43433.54264642648!2d-1.5866515!3d47.2186371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4805eec447f61f25%3A0x40dc8d7053c41f0!2sNantes!5e0!3m2!1sfr!2sfr!4v1721300000000"
            title="Carte Nantes"
            allowFullScreen
            loading="lazy"
          />
          <div>
            <p>
              <strong>Adresse :</strong>
              <br />
              Place Westdevs, 44000 Nantes
            </p>
            <p>
              <strong>Téléphone :</strong>
              <br />
              02 00 00 01 41
            </p>
            <p>
              <strong>Email :</strong>
              <br />
              contactundertone@gmail.com
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Contact;
