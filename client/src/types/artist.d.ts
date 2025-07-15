type Photo = {
  id: number;
  image: string;
  date: string;
};

type Artist = {
  user_id: number;
  name: string;
  description: string | null;
  demo: string | null;
  web_site: string | null;
  profile_picture: string | null;
  facebook_link: string | null;
  instagram_link: string | null;
  x_link: string | null;
  deezer_link: string | null;
  spotify_link: string | null;
  youtube_link: string | null;
  artistPhotos?: Photo[];
  styles?: StyleTypes[];
};

type ProfilePicturePlayFavoriteProps = {
  profilePicture: string | null;
  name: string;
  demo?: string | null;
};

type ArtistFormDataType = {
  name: string;
  musicStyle: string;
};
