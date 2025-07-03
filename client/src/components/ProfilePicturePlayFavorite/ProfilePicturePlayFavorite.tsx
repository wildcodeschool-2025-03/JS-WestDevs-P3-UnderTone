import { useLocation } from "react-router";
import FavoriteButton from "./FavoriteButton/FavoriteButton";
import PlayPause from "./PlayPause/PlayPause";
import "./ProfilePicturePlayFavorite.css";
import { useEffect, useState } from "react";

function ProfilePicturePlayFavorite({
  profilePicture,
  name,
  demo,
}: ProfilePicturePlayFavoriteProps) {
  const location = useLocation();
  const [srcNoProfilePicture, setSrcNoProfilePicture] = useState("");
  useEffect(() => {
    if (location.pathname.includes("artist")) {
      setSrcNoProfilePicture("/images/noProfilePictureArtist.jpg");
    }
  }, [location]);

  return (
    <figure className="profile-picture-play-favorite">
      <FavoriteButton />
      <img
        src={profilePicture ? profilePicture : srcNoProfilePicture}
        alt={profilePicture ? name : "Avatar"}
      />
      <div className="gradient" />
      {demo && <PlayPause demo={demo} />}
    </figure>
  );
}

export default ProfilePicturePlayFavorite;
