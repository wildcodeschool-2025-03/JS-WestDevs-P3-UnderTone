type Photo = {
  id: number;
  imgSrc: string;
  date: string;
};

type Artist = {
  user_id: number;
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
  artistPhoto?: Photo[];
};
