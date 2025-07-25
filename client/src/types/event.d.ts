type EventData = {
  id: number;
  name: string;
  date: string;
  hour: string;
  description: string;
  image: string;
  invitedArtists: Array<{
    id: number;
    name: string;
    musicStyles: Array<{ id: number; name: string }>;
    profilePicture: string;
  }>;
  concertPlaceName: string;
  address: string;
  menu: string;
};

type EventFormDataType = {
  date: string;
};

type ArtistsToInvite = {
  id: number;
  label: string;
}[];
