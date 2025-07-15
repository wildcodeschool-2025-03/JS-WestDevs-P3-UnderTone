import { useRef } from "react";
import "./SocialNetworksForm.css";

const socialNetworksOptions = [
  {
    name: "Facebook",
    value: "facebook_link",
  },
  {
    name: "Instagram",
    value: "instagram_link",
  },
  {
    name: "X",
    value: "x_link",
  },
];

export class SocialNetwork {
  name: string;
  value: string;
  link: string;

  constructor(name: string, value: string, link: string) {
    this.name = name;
    this.value = value;
    this.link = link;
  }
}

function SocialNetworksForm({
  socialNetworks,
  setSocialNetworks,
}: {
  socialNetworks: SocialNetwork[];
  setSocialNetworks: React.Dispatch<React.SetStateAction<SocialNetwork[]>>;
}) {
  const selectInputRef = useRef<HTMLSelectElement>(null);
  const socialNetworkLinkInputRef = useRef<HTMLInputElement>(null);

  let linkId = 0;

  const handleSocialNetworkValidation = () => {
    if (
      !selectInputRef.current?.value ||
      !socialNetworkLinkInputRef.current?.value
    ) {
      alert("Veuillez sélectionner un réseau et fournir un lien.");
      return;
    }

    linkId++;
    const newSocialNetwork = new SocialNetwork(
      selectInputRef.current?.selectedOptions[0].label,
      selectInputRef.current?.selectedOptions[0].value,
      socialNetworkLinkInputRef.current.value,
    );

    const filteredSocialNetworks = socialNetworks.filter(
      (sn) => sn.name !== newSocialNetwork.name,
    );

    setSocialNetworks([...filteredSocialNetworks, newSocialNetwork]);

    if (selectInputRef.current) {
      selectInputRef.current.value = "";
    }
    if (socialNetworkLinkInputRef.current) {
      socialNetworkLinkInputRef.current.value = "";
    }
  };
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nameToDelete = (e.currentTarget as HTMLButtonElement).dataset.name;
    setSocialNetworks(socialNetworks.filter((sn) => sn.name !== nameToDelete));
  };

  return (
    <>
      <section className="social-networks">
        <select name="" id="" ref={selectInputRef}>
          <option value="">-- Choisissez un réseau --</option>
          {socialNetworksOptions.map((sn) => (
            <option value={sn.value} key={sn.name}>
              {sn.name}
            </option>
          ))}
        </select>
        <input
          type="url"
          name="link"
          id="social-network-link"
          maxLength={200}
          ref={socialNetworkLinkInputRef}
        />
        <button type="button" onClick={handleSocialNetworkValidation}>
          Valider
        </button>
        <ul>
          {socialNetworks.map((sn) => (
            <li key={sn.name}>
              <p>{sn.name}</p>
              <button type="button" onClick={handleDelete} data-name={sn.name}>
                X
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default SocialNetworksForm;
