import type { User as FirebaseUser } from 'firebase/auth';

export type User = FirebaseUser;

export type UserSettings = {
  publicProfile?: boolean;
  location?: Location;
};

export type UserData = User & UserSettings;

type Location = {
  lat: number;
  lng: number;
  name: string;
};
