type EventData = {
  id: number;
  name: string;
  date_hour: string;
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

interface EventFormDataType {
  date: string;
}
