export type User = {
  publicProfile?: boolean;
  location?: Location;
};

type Location = {
  lat: number;
  lng: number;
  name: string;
};
