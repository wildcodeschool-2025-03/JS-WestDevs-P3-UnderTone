import FavoriteButton from "./FavoriteButton/FavoriteButton";
import PlayPause from "./PlayPause/PlayPause";
import "./ProfilePicturePlayFavorite.css";

interface Props {
  profilePicture: string;
  name: string;
  demo: string;
}

function ProfilePicturePlayFavorite({ profilePicture, name, demo }: Props) {
  return (
    <figure>
      <FavoriteButton />
      <img src={profilePicture} alt={name} />
      <div className="gradient" />
      {demo && <PlayPause demo={demo} />}
    </figure>
  );
}

export default ProfilePicturePlayFavorite;
