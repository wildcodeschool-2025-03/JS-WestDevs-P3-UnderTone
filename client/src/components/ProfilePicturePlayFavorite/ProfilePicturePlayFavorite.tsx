import { useAuth } from "../../services/AuthContext";
import FavoriteButton from "./FavoriteButton/FavoriteButton";
import PlayPause from "./PlayPause/PlayPause";
import "./ProfilePicturePlayFavorite.css";

function ProfilePicturePlayFavorite({
  profilePicture,
  name,
  demo,
}: ProfilePicturePlayFavoriteProps) {
  const srcNoProfilePicture = "public/images/noProfilePictureArtist.jpg";
  const { isLogged } = useAuth();

  return (
    <figure className="profile-picture-play-favorite">
      {isLogged && <FavoriteButton />}
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
