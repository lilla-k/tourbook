import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import './CountryDetails.css';

function CountryDetails({ selectedTrip }) {


    const [selectedTab, setSelectedTab] = useState("country");

    return (
        <div className="CountryDetails">
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={selectedTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={(event, newValue)=>{setSelectedTab(newValue)}} aria-label="lab API tabs example">
                            <Tab label={`About ${selectedTrip.country}`} value="country" />
                            <Tab label="your experience" value="your experience" />
                        </TabList>
                    </Box>
                    <TabPanel value="country">{selectedTrip.countryInformation}</TabPanel>
                    <TabPanel value="report">{selectedTrip.tripExperience}</TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}

export default CountryDetails;