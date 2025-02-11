import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';

import './CountryDetails.css';

function CountryDetails({ selectedTrip }) {


    const [selectedTab, setSelectedTab] = useState("your experience");
    const navigate = useNavigate();

    return (
        <div className="CountryDetails">
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={selectedTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={(event, newValue)=>{setSelectedTab(newValue)}} aria-label="lab API tabs example">
                            <Tab label="your experience" value="your experience" /> 
                            <Tab label={`About ${selectedTrip.country}`} value="country" />
                        </TabList>
                    </Box>
                    <TabPanel value="country" sx={{pl: "2px"}}>{selectedTrip.countryInformation} </TabPanel>
                    <TabPanel value="your experience">
                        {selectedTrip.tripExperience|| 
                        <Button variant="outlined" onClick={() => navigate(`/trips/${selectedTrip.id}/edit`)} >+ Add information</Button> }
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}

export default CountryDetails;