import { useState } from "react";
import "./ArtistProfile.css";
import InputDescription from "../../components/FormInputs/InputDescription/InputDescription";
import InputName from "../../components/FormInputs/InputName/InputName";
import InputPhotos from "../../components/FormInputs/InputPhotos/InputPhotos";
import InputProfilePicture from "../../components/FormInputs/InputProfilePicture/InputProfilePicture";
import InputWebsite from "../../components/FormInputs/InputWebsite/InputWebsite";
import SocialNetworksForm, {
  type SocialNetwork,
} from "../../components/FormInputs/SocialNetworksForm/SocialNetworksForm";
import InputDemo from "./DemoUploader/InputDemo";
import MusicalInfluencesForm from "./MusicalInfluencesForm/MusicalInfluencesForm";

function ArtistProfile() {
  const [selectedStyles, setSelectedStyles] = useState<StyleArtistCreation[]>(
    [],
  );
  const [socialNetworks, setSocialNetworks] = useState<SocialNetwork[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    formData.append("selectedStyles", JSON.stringify(selectedStyles));
    formData.append("socialNetworks", JSON.stringify(socialNetworks));

    fetch("http://localhost:3310/api/new/artist", {
      method: "POST",
      body: formData,
    }).then((res) => console.log("Ma réponse : ", res.ok));
  };

  return (
    <main className="artist-profile-page">
      <section className="artist-card">
        <h1>Profil Artiste</h1>
        <form onSubmit={handleSubmit}>
          <InputName label={"Nom d'artiste"} />
          <InputProfilePicture />

          <MusicalInfluencesForm
            selectedStyles={selectedStyles}
            setSelectedStyles={setSelectedStyles}
          />
          <InputDescription />
          <SocialNetworksForm
            socialNetworks={socialNetworks}
            setSocialNetworks={setSocialNetworks}
          />
          <InputWebsite />

          <InputDemo />
          <InputPhotos />

          <button type="submit">Valider</button>
        </form>
      </section>
    </main>
  );
}

export default ArtistProfile;
