import type { User as FirebaseUser } from 'firebase/auth';

export type User = FirebaseUser;

export type UserSettings = {
  visibility?: string;
  location?: Location;
};

export type UserData = User & UserSettings;

type Location = {
  lat: number;
  lng: number;
  name: string;
};
