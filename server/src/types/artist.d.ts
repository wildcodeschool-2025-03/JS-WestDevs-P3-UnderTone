type Photo = {
  id: number;
  imgSrc: string;
  date: string;
};

type MusicStyle = {
  id: number;
  name: string;
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
  styles: MusicStyle[];
};

type ArtistToInsert = {
  name: string;
  description: string;
  demo: string;
  web_site: string;
  profile_picture: string;
  facebook_link: string;
  instagram_link: string;
  x_link: string;
  deezer_link: string;
  spotify_link: string;
  youtube_link: string;
};

type SelectedStyle = {
  id: number;
  label: number;
};
