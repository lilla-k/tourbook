import { useOutletContext, useNavigate, useSearchParams } from 'react-router-dom';
import TripCard from '../TripCard/TripCard.js';
import './TripsPage.css';
import TripsFilter from '../TripsFilter/TripsFilter.js';
import { getContinent } from '../../utils/trips.js';
import type Context from '../../types/context.js';
import type { Trip } from '../../types/trip.js';
import { getDistanceFromLocation } from '../../utils/location.js';

function TripsPage() {
  const navigate = useNavigate();
  const { trips, userData } = useOutletContext<Context>();
  const [searchParams] = useSearchParams();

  const selectedYear = Number(searchParams.get('year'));
  const selectedType = searchParams.get('type');
  const selectedRating = Number(searchParams.get('rating'));
  const selectedContinent = searchParams.get('continent');
  const selectedSortType = searchParams.get('sortBy');

  const filteredTrips = trips.filter((trip) => (
    (selectedYear ? trip.startDate.getFullYear() === selectedYear : true)
    && (selectedType ? trip.tripType === selectedType : true)
    && (selectedRating ? trip.rating === selectedRating : true)
    && (selectedContinent ? selectedContinent === getContinent(trip.country) : true)
  ));

  filteredTrips.sort((a: Trip, b: Trip) => {
    if (selectedSortType === 'rating') {
      return (b.rating || -2) - (a.rating || -2);
    }
    if (selectedSortType === 'name') {
      return (a.country.localeCompare(b.country));
    }
    if (selectedSortType === 'distance' && userData.location?.name) {
      return (getDistanceFromLocation(userData.location.name, a.country) - (getDistanceFromLocation(userData.location.name, b.country)));
    }
    return (b.startDate.getTime() - a.startDate.getTime());
  });

  return (
    <div className="TripsPage">
      <div className="TripsPage-title">My trips</div>
      <TripsFilter
        trips={trips}
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
