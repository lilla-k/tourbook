import { useOutletContext, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TripCard from '../TripCard/TripCard.js';
import './TripsPage.css';
import TripsFilter from '../TripsFilter/TripsFilter.js';
import { getContinent } from '../../utils/trips.js';
import type Context from '../../types/context.js';
import type { Trip } from '../../types/trip.js';
import { getDistanceFromLocation } from '../../utils/location.js';

type TripFilterState = {
  year?: number,
  type?: string,
  rating?: number | null,
  continent?: string
};

function TripsPage() {
  const navigate = useNavigate();
  const { trips, userData } = useOutletContext<Context>();

  const [filter, setFilter] = useState<TripFilterState>({
    year: undefined,
    type: undefined,
    rating: null,
    continent: undefined,
  });
  const [sortType, setSortType] = useState('date');

  const filteredTrips = trips.filter((trip) => (
    (filter.year ? filter.year === trip.startDate.getFullYear() : true)
    && (filter.type ? trip.tripType === filter.type : true)
    && (filter.rating ? trip.rating === filter.rating : true)
    && (filter.continent ? filter.continent === getContinent(trip.country) : true)
  ));

  filteredTrips.sort((a: Trip, b: Trip) => {
    if (sortType === 'rating') {
      return (b.rating || -2) - (a.rating || -2);
    }
    if (sortType === 'name') {
      return (a.country.localeCompare(b.country));
    }
    if (sortType === 'distance' && userData.location?.name) {
      return (getDistanceFromLocation(userData.location.name, a.country) - (getDistanceFromLocation(userData.location.name, b.country)));
    }
    return (b.startDate.getTime() - a.startDate.getTime());
  });

  return (
    <div className="TripsPage">
      <div className="TripsPage-title">My trips</div>
      <TripsFilter
        trips={trips}
        filter={filter}
        setFilter={setFilter}
        setSortType={setSortType}
        location={userData.location?.name}
      />
      <div className="TripsPage-container">
        {trips.length === 0
          ? <button className="TripsPage-addFirstTrip" onClick={() => navigate('/addTrip')} type="button">+ Add your first trip</button>
          : filteredTrips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
            />
          ))}

      </div>

    </div>

  );
}

export default TripsPage;
