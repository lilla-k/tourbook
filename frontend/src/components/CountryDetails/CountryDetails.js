import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import './CountryDetails.css';

function CountryDetails({ selectedTrip }) {

    const [detail, setDetail] = useState("country");

    return (
        <div className="CountryDetails">
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={detail}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={(event, newValue)=>{setDetail(newValue)}} aria-label="lab API tabs example">
                            <Tab label={`Discover ${selectedTrip.country}`} value="country" />
                            <Tab label="report" value="report" />
                        </TabList>
                    </Box>
                    <TabPanel value="country">{selectedTrip.countryDetails}</TabPanel>
                    <TabPanel value="report">{selectedTrip.experience}</TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}

export default CountryDetails;