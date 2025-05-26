import { useSearchParams } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './TripsFilter.css';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import type { Trip } from '../../types/trip.js';
import { getVisitedCountries, getContinent } from '../../utils/trips.js';

function TripsFilter({
  trips, location,
}: {
  trips: Trip[], location: string | undefined
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const yearVariants = [...new Set(trips.map((trip) => trip.startDate.getFullYear()))];
  const typeVariants = [...new Set(trips.map((trip) => trip.tripType))];
  const ratingVariants = [...new Set(trips.map((trip) => trip.rating).filter((rating) => rating !== null))];
  const continentVariants = [...new Set(getVisitedCountries(trips).map((c) => getContinent(c)))];
  const sortVariants = ['date', 'rating', 'name', 'distance'];

  const handleFilterYear = (event: SelectChangeEvent) => {
    const filteredYear = event.target.value;
    setSearchParams((params: URLSearchParams) => {
      if (filteredYear !== undefined) {
        params.set('year', filteredYear);
      } else {
        params.delete('year');
      }
      return params;
    });
  };
  const handleFilterType = (event: SelectChangeEvent) => {
    const filteredType = event.target.value;
    setSearchParams((params: URLSearchParams) => {
      if (filteredType !== undefined) {
        params.set('type', filteredType);
      } else {
        params.delete('type');
      }
      return params;
    });
  };
  const handleFilterRating = (event: SelectChangeEvent) => {
    const filteredRating = event.target.value;
    setSearchParams((params: URLSearchParams) => {
      if (filteredRating !== undefined) {
        params.set('rating', filteredRating);
      } else {
        params.delete('rating');
      }
      return params;
    });
  };
  const handleFilterContinent = (event: SelectChangeEvent) => {
    const filteredContinent = event.target.value;
    setSearchParams((params: URLSearchParams) => {
      if (filteredContinent !== undefined) {
        params.set('continent', filteredContinent);
      } else {
        params.delete('continent');
      }
      return params;
    });
  };
  const handleSorting = (event: SelectChangeEvent) => {
    const filteredSort = event.target.value;
    setSearchParams((params: URLSearchParams) => {
      if (filteredSort !== undefined) {
        params.set('sortBy', filteredSort);
      } else {
        params.delete('sortBy');
      }
      return params;
    });
  };

  return (
    <div className="TripsFilter">
      <FilterAltIcon className="TripsFilter-filterIcon" />
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          label="Year"
          value={searchParams.get('year') || undefined}
          onChange={handleFilterYear}
        >
          <MenuItem value={undefined}>None</MenuItem>
          {yearVariants.map((year) => <MenuItem value={year}>{year}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          label="Type"
          value={searchParams.get('type') || undefined}
          onChange={handleFilterType}
        >
          <MenuItem value={undefined}>None</MenuItem>
          {typeVariants.map((type) => <MenuItem value={type}>{type}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Rating</InputLabel>
        <Select
          label="Rating"
          value={searchParams.get('rating') || undefined}
          onChange={handleFilterRating}
        >
          <MenuItem value={undefined}>None</MenuItem>
          {ratingVariants.map((rating) => <MenuItem value={rating}>{rating}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Continent</InputLabel>
        <Select
          label="Continent"
          value={searchParams.get('continent') || undefined}
          onChange={handleFilterContinent}
        >
          <MenuItem value={undefined}>None</MenuItem>
          {continentVariants.map((continent) => <MenuItem value={continent}>{continent}</MenuItem>)}
        </Select>
      </FormControl>
      <div className="TripsFilter-gap" />
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} className="TripsFilter-sort">
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          label="Sort by"
          value={searchParams.get('sortBy') || undefined}
          onChange={handleSorting}
        >
          {sortVariants.filter((sort) => {
            if (location !== undefined) {
              return sort !== 'distance';
            }
            return true;
          }).map((sort) => <MenuItem value={sort}>{sort}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  );
}

export default TripsFilter;
