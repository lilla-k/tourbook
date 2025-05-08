import { useOutletContext, useNavigate } from 'react-router-dom';
import TripCard from '../TripCard/TripCard.js';
import './TripsPage.css';

import type Context from '../../types/context.js';

function TripsPage() {
  const { trips } = useOutletContext<Context>();
  const navigate = useNavigate();

  return (
    <div className="TripsPage">
      <div className="TripsPage-title">My trips</div>
      <div className="TripsPage-container">
        {trips.length === 0
        && <button className="TripsPage-addFirstTrip" onClick={() => navigate('/addTrip')} type="button">+ Add your first trip</button>}
        {trips.map((trip) => (
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
