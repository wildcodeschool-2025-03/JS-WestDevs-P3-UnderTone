import { useState } from "react";
import InputAddress from "../../components/FormInputs/InputAddress/InputAddress";
import InputDescription from "../../components/FormInputs/InputDescription/InputDescription";
import InputMenu from "../../components/FormInputs/InputMenu/InputMenu";
import InputName from "../../components/FormInputs/InputName/InputName";
import InputPhotos from "../../components/FormInputs/InputPhotos/InputPhotos";
import InputProfilePicture from "../../components/FormInputs/InputProfilePicture/InputProfilePicture";
import InputWebsite from "../../components/FormInputs/InputWebsite/InputWebsite";
import InputsType from "../../components/FormInputs/InputsType/InputsType";
import OpeningHoursForm from "../../components/FormInputs/OpeningHoursForm/OpeningHoursForm";
import SocialNetworksForm, {
  type SocialNetwork,
} from "../../components/FormInputs/SocialNetworksForm/SocialNetworksForm";
import "./ConcertPlaceCreation.css";

function ConcertPlaceCreation() {
  const [openingHours, setOpeningHours] = useState<SingleDayOpeningHours[]>([]);
  const [socialNetworks, setSocialNetworks] = useState<SocialNetwork[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    formData.append("openingHours", JSON.stringify(openingHours));
    formData.append("socialNetworks", JSON.stringify(socialNetworks));

    fetch("http://localhost:3310/api/new/concert-place", {
      method: "POST",
      body: formData,
    }).then((res) => console.log("Ma réponse : ", res.ok));
  };

  return (
    <main className="concert-place-creation">
      <section>
        <form method="post" onSubmit={handleSubmit}>
          <InputName label={"Nom de l'établissement"} />
          <InputProfilePicture />
          <InputsType />
          <InputDescription />
          <OpeningHoursForm
            openingHours={openingHours}
            setOpeningHours={setOpeningHours}
          />
          <InputAddress />
          <SocialNetworksForm
            socialNetworks={socialNetworks}
            setSocialNetworks={setSocialNetworks}
          />
          <InputWebsite />
          <InputMenu />
          <InputPhotos />

          <button type="submit">Valider</button>
        </form>
      </section>
    </main>
  );
}

export default ConcertPlaceCreation;
