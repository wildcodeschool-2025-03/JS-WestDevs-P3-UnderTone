type EventType = {
  id: number;
  name: string;
  date: string;
  hour: string;
  description: string | null;
  image: string | null;
  concertPlaceName: string;
  address: string;
  menu: string | null;
  invitedArtists: {
    id: number;
    name: string;
    musicStyles: {
      id: number;
      name: string;
    }[];
  }[];
};
