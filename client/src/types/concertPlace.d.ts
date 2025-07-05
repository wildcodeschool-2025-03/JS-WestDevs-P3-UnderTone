type Types = {
  id: number;
  name: string;
};

type SingleDayOpeningHours = {
  id: number;
  weekDay: string;
  openingHourNoon: string | null;
  closingHourNoon: string | null;
  openingHourEvening: string | null;
  closingHourEvening: string | null;
};

type DayOpeningHours = {
  week_day: string;
  opening_hour_noon: string | null;
  closing_hour_noon: string | null;
  opening_hour_evening: string | null;
  closing_hour_evening: string | null;
};

type ConcertPlace = {
  DayOpeningHours: DayOpeningHours[];
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
  openingHours: SingleDayOpeningHours[];
};

type OpeningHoursProps = {
  hours: DayOpeningHours[];
};
