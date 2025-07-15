import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import InputProfilePicture from "../../components/FormInputs/InputProfilePicture/InputProfilePicture";
import { useAuth } from "../../services/AuthContext";
import InputBirthDate from "./InputBirthDate/InputBirthDate";
import "./UserCreation.css";

function UserCreation() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = (formData: FormData) => {
    fetch("http://localhost:3310/api/new/user", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        toast.success("🎊 Vos données ont bien été enregistrées 🎊");
        toast.info("Vous allez être redirigé !");
        setTimeout(() => {
          switch (user?.status) {
            case "user":
              navigate("/app/reserach");
              break;
          }
        }, 2000);
      }
    });
  };

  return (
    <main className="new-user">
      <section>
        <h1>Mon Profil</h1>
        <form action={handleSubmit}>
          <InputProfilePicture />
          <InputBirthDate />
          <button type="submit">Valider</button>
        </form>
      </section>
    </main>
  );
}

export default UserCreation;
