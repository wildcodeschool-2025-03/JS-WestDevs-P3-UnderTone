type FormDataType = {
  name: string;
  musicStyle: string;
  date: string;
};

type FilteredArtistList = {
  id: number;
  name: string;
  profile_picture?: string;
  musicStyles?: StyleType[];
};
