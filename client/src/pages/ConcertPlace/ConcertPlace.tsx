import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Address from "../../components/Address/Address";
import Carousel from "../../components/Carousel/Carousel";
import Maps from "../../components/Map/Maps";
import Menu from "../../components/Menu/Menu";
import OpeningHours from "../../components/OpeningHours/OpeningHours";
import ProfilePicturePlayFavorite from "../../components/ProfilePicturePlayFavorite/ProfilePicturePlayFavorite";
import SocialNetworks from "../../components/SocialNetworks/SocialNetworks";
import StylesTypes from "../../components/StylesTypes/StylesTypes";
import "./ConcertPlace.css";

function ConcertPlace() {
  const params = useParams();
  const [concertPlace, setConcertPlace] = useState<null | ConcertPlace>();
  useEffect(() => {
    fetch(`http://localhost:3310/api/concert-place/${params.id}`)
      .then((res) => res.json())
      .then((data) => setConcertPlace(data));
  }, [params.id]);

  const [socialNetworks, setSocialNetworks] = useState<null | SocialNetworks>();
  useEffect(() => {
    concertPlace &&
      setSocialNetworks({
        facebook_link: concertPlace.facebook_link,
        instagram_link: concertPlace.instagram_link,
        x_link: concertPlace.x_link,
      });
  }, [concertPlace]);

  return (
    <main className="concert-place-page">
      {concertPlace && (
        <>
          <section>
            <h1>{concertPlace.name}</h1>

            <ProfilePicturePlayFavorite
              profilePicture={concertPlace.profile_picture}
              name={concertPlace.name}
            />

            {concertPlace.types && (
              <StylesTypes stylesTypes={concertPlace.types} />
            )}

            {concertPlace.description && <p>{concertPlace.description}</p>}

            {concertPlace.web_site && (
              <a href={concertPlace.web_site} target="_blank" rel="noreferrer">
                {concertPlace.name
                  .normalize("NFD")
                  .replace(/\p{Mn}/gu, "")
                  .split(" ")
                  .join("-")}
                <span>.com</span>
              </a>
            )}
          </section>

          <section>
            {socialNetworks && (
              <SocialNetworks profileDatas={{ ...socialNetworks }} />
            )}
          </section>

          <section className="menu">
            {concertPlace.menu && <Menu menu={concertPlace.menu} />}
          </section>

          <section className="carousel">
            {concertPlace.concertPlacePhotos && (
              <Carousel photosDatas={concertPlace.concertPlacePhotos} />
            )}
          </section>

          <section className="address-opening-hours">
            {concertPlace.address && <Address address={concertPlace.address} />}

            {concertPlace.openingHours &&
              concertPlace.openingHours.length > 0 && (
                <OpeningHours hours={concertPlace.openingHours} />
              )}

            <Maps />
          </section>
        </>
      )}
    </main>
  );
}

export default ConcertPlace;
