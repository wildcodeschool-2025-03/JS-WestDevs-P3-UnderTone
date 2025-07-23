import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import InputDescription from "../../components/FormInputs/InputDescription/InputDescription";
import "./EventCreation.css";
import InputName from "../../components/FormInputs/InputName/InputName";
import InputEventPicture from "./InputEventPicture/InputEventPicture";
import InputInviteArtist from "./InputInviteArtist/InputInviteArtist";
import InputsDateHour from "./InputsDateHour/InputsDateHour";

function EventCreation() {
  const [artistsToInvite, setArtistsToInvite] = useState<
    { id: number; label: string }[]
  >([]);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!artistsToInvite.length) {
      toast.error("Un artiste doit être invité au minimum ! ❌");
      return;
    }

    const formData = new FormData(e.currentTarget);

    formData.append("artistsToInvite", JSON.stringify(artistsToInvite));

    fetch("http://localhost:3310/api/new/event", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.includes("enregistrées")) {
          toast.success(data);
          toast.info("Vous allez être redirigé·e");
          setTimeout(() => {
            navigate("/app/research");
          }, 1500);
        } else {
          toast.error(data);
        }
      });
  };

  return (
    <main className="event-creation">
      <section>
        <h1>Mon évènement</h1>
        <form onSubmit={handleSubmit}>
          <InputName label="Nom de l'évènement" />
          <InputsDateHour />
          <InputEventPicture />
          <InputInviteArtist
            artistsToInvite={artistsToInvite}
            setArtistsToInvite={setArtistsToInvite}
          />
          <InputDescription />
          <button type="submit">Valider</button>
        </form>
      </section>
    </main>
  );
}

export default EventCreation;
