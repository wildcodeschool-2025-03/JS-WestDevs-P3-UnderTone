type EventData = {
  concertPlaceId: number;
  id: number;
  name: string;
  date: Date;
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

type EventLinkData = {
  id: number;
  name: string;
  date?: Date;
  hour: string;
  image?: string;
  concert_place: string;
  artistList: Array<{
    id: number;
    name: string;
  }>;
};

type EventSearchResultProps = {
  eventList: EventLinkData[];
};
