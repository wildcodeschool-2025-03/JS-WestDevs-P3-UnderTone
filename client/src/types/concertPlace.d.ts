type Types = {
  id: number;
  name: string;
};

type SingleDayOpeningHours = {
  id?: number;
  weekDay: string;
  openingHourNoon: string | null;
  closingHourNoon: string | null;
  openingHourEvening: string | null;
  closingHourEvening: string | null;
};

type ConcertPlace = {
  user_id: number;
  name: string;
  description: string | null;
  web_site: string | null;
  profile_picture: string | null;
  facebook_link: string | null;
  instagram_link: string | null;
  x_link: string | null;
  menu: string | null;
  concertPlacePhotos: Photo[];
  types: Types[];
  address: string;
  openingHours: SingleDayOpeningHours[];
};

type OpeningHoursProps = {
  hours: {
    weekDay: string;
    openingHourNoon: string | null;
    closingHourNoon: string | null;
    openingHourEvening: string | null;
    closingHourEvening: string | null;
  }[];
};
