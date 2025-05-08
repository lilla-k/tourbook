type Country = {
  properties: {
    name: string,
    label_x: number,
    label_y: number,
    continent: string,
    wikidataid: string,
    pop_est: number,
  },
  geometry: {
    coordinates: number[][][] | number[][][][];
  }
};

export default Country;
