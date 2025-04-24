import type { Trip } from './trip.js';
import type { UserData, UserSettings } from './user.js';
import type MapCamera from './map.js';

type Context = {
  trips: Trip[],
  setTrips: (trips: Trip[]) => void,
  setToaster: (message: string) => void,
  // user + userSettings = userData
  userData: UserData,
  setUserSettings: (userSettings: UserSettings) => void,
  mapCamera: MapCamera,
  setMapCamera: (camera: MapCamera) => void,
};

export default Context;
