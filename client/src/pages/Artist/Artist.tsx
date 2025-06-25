import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Carousel from "../../components/Carousel/Carousel";
import MusicStyles from "../../components/MusicStyles/MusicStyles";
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
          {id && <MusicStyles params={id} />}
          <p style={{ whiteSpace: "pre-wrap" }}>{artist.description}</p>
          <SocialNetworks artist={artist} />
          <a href={artist.web_site} target="_blank" rel="noreferrer">
            {artist.name.split(" ").join("-")}.com
          </a>
          <Carousel />
        </>
      )}
    </main>
  );
}

export default Artist;
