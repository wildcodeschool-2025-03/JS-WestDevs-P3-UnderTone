import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Carousel from "../../components/Carousel/Carousel";
import StylesTypes from "../../components/StylesTypes/StylesTypes";

import ProfilePicturePlayFavorite from "../../components/ProfilePicturePlayFavorite/ProfilePicturePlayFavorite";
import SocialNetworks from "../../components/SocialNetworks/SocialNetworks";
import "./Artist.css";

function Artist() {
  const { id } = useParams();
  const [artist, setArtist] = useState<null | Artist>();

  useEffect(() => {
    fetch(`http://localhost:3310/api/artist/${id}`)
      .then((response) => response.json())
      .then((data) => setArtist(data));
  }, [id]);

  const [socialNetworks, setSocialNetworks] = useState<null | SocialNetworks>();
  useEffect(() => {
    artist &&
      setSocialNetworks({
        facebook_link: artist.facebook_link,
        instagram_link: artist.instagram_link,
        x_link: artist.x_link,
      });
  }, [artist]);

  return (
    <main className="artist-page">
      {artist && (
        <>
          <h1>{artist.name}</h1>

          <ProfilePicturePlayFavorite
            profilePicture={artist.profile_picture}
            name={artist.name}
            demo={artist.demo}
          />

          {artist.styles && <StylesTypes stylesTypes={artist.styles} />}

          <p>{artist.description}</p>

          {socialNetworks && (
            <SocialNetworks profileDatas={{ ...socialNetworks }} />
          )}

          {artist.web_site && (
            <a href={artist.web_site} target="_blank" rel="noreferrer">
              {artist.name.split(" ").join("-")}
              <span>.com</span>
            </a>
          )}

          {artist.artistPhotos && (
            <Carousel photosDatas={artist.artistPhotos} />
          )}
        </>
      )}
    </main>
  );
}

export default Artist;
