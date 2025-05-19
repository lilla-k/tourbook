import { useOutletContext, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TripCard from '../TripCard/TripCard.js';
import './TripsPage.css';
import TripsFilter from '../TripsFilter/TripsFilter.js';
import type Context from '../../types/context.js';

function TripsPage() {
  const navigate = useNavigate();
  const { trips } = useOutletContext<Context>();
  const yearOptions = [...new Set(trips.map((trip) => trip.startDate.getFullYear()))];
  const [selectedYear, setSelectedYear] = useState(undefined);

  return (
    <div className="TripsPage">
      <div className="TripsPage-title">My trips</div>
      <TripsFilter yearOptions={yearOptions} setSelectedYear={setSelectedYear} />
      <div className="TripsPage-container">
        {trips.length === 0
          ? <button className="TripsPage-addFirstTrip" onClick={() => navigate('/addTrip')} type="button">+ Add your first trip</button>
          : trips.filter((trip) => {
            if (selectedYear) {
              return trip.startDate.getFullYear() === selectedYear;
            }
            return trip;
          }).map((trip) => (
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
