import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './TripsFilter.css';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import type { Trip } from '../../types/trip.js';
import { getVisitedCountries, getContinent } from '../../utils/trips.js';

type TripFilterState = {
  year?: number,
  type?: string,
  rating?: number | null,
  continent?: string
};

function TripsFilter({ trips, filter, setFilter }: { trips: Trip[], filter: TripFilterState, setFilter: Function }) {
  const yearOptions = [...new Set(trips.map((trip) => trip.startDate.getFullYear()))];
  const typeOptions = [...new Set(trips.map((trip) => trip.tripType))];
  const ratingOptions = [...new Set(trips.map((trip) => trip.rating).filter((rating) => rating !== null))];
  const continentOptions = [...new Set(getVisitedCountries(trips).map((c) => getContinent(c)))];
  const handleFilterYear = (event: SelectChangeEvent) => {
    setFilter({ ...filter, year: event.target.value });
  };
  const handleFilterType = (event: SelectChangeEvent) => {
    setFilter({ ...filter, type: event.target.value });
  };
  const handleFilterRating = (event: SelectChangeEvent) => {
    setFilter({ ...filter, rating: event.target.value });
  };
  const handleFilterContinent = (event: SelectChangeEvent) => {
    setFilter({ ...filter, continent: event.target.value });
  };

  return (
    <div className="TripsFilter">
      <FilterAltIcon className="TripsFilter-filterIcon" />
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          label="Year"
          onChange={handleFilterYear}
        >
          <MenuItem value={undefined}>None</MenuItem>
          {yearOptions.map((year) => <MenuItem value={year}>{year}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          label="Type"
          onChange={handleFilterType}
        >
          <MenuItem value={undefined}>None</MenuItem>
          {typeOptions.map((type) => <MenuItem value={type}>{type}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Rating</InputLabel>
        <Select
          label="Rating"
          onChange={handleFilterRating}
        >
          <MenuItem value={undefined}>None</MenuItem>
          {ratingOptions.map((rating) => <MenuItem value={rating}>{rating}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Continent</InputLabel>
        <Select
          label="Continent"
          onChange={handleFilterContinent}
        >
          <MenuItem value={undefined}>None</MenuItem>
          {continentOptions.map((continent) => <MenuItem value={continent}>{continent}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  );
}

export default TripsFilter;
