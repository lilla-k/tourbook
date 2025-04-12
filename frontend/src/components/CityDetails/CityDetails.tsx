import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';

import './CityDetails.css';

import type { Trip } from '../../types/trip';
import type City from '../../types/city';

function CityDetails({ trip, city }: { trip: Trip, city: City }) {
  const [selectedTab, setSelectedTab] = useState('city');
  const navigate = useNavigate();

  return (
    <div className="CityDetails">
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={selectedTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={(event, newValue) => { setSelectedTab(newValue); }} aria-label="lab API tabs example">
              <Tab label={`Discover ${city.cityName}`} value="city" />
              <Tab label="attractions" value="attractions" />
            </TabList>
          </Box>
          <TabPanel value="city">
            {city.cityInformation
                        || <Button variant="outlined" onClick={() => navigate(`/trips/${trip.id}/${city?.cityId}/edit`)}>+ Add information</Button> }
          </TabPanel>
          <TabPanel value="attractions">
            <div className="CityDetails-attractions">
              {city.attractions.filter((attr) => attr !== '').map((attraction) => <div className="CityDetails-attraction" key={attraction}>{attraction}</div>)}
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default CityDetails;
