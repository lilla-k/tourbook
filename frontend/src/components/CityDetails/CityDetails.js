import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import './CityDetails.css';

function CityDetails({ selectedCity }) {

    console.log(selectedCity);
    const [selectedTab, setSelectedTab] = useState("city");

    return (
        <div className="CityDetails">
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={selectedTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={(event, newValue) => { setSelectedTab(newValue) }} aria-label="lab API tabs example">
                            <Tab label={`Discover ${selectedCity.cityName}`} value="city" />
                            <Tab label="attractions" value="attractions" />
                        </TabList>
                    </Box>
                    <TabPanel value="city">{selectedCity.cityInformation}</TabPanel>
                    <TabPanel value="attractions">
                        <div className="CityDetails-attractions">
                            {selectedCity.attractions.map(attraction => <div className="CityDetails-attraction">{attraction}</div>
                      )}
                        </div>
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}

export default CityDetails;