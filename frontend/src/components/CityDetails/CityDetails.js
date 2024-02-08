import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import './CityDetails.css';

function CityDetails({selectedCity}){
    console.log("cityrun");
    console.log(selectedCity);
    const [cityDetail, setCityDetail] = useState("city");

    return(
        <div className="CityDetails">
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={cityDetail}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={(event, newValue)=>{setCityDetail(newValue)}} aria-label="lab API tabs example">
                            <Tab label={`Discover ${selectedCity.cityName}`} value="city" />
                            <Tab label="report" value="report" />
                        </TabList>
                    </Box>
                    <TabPanel value="city">{selectedCity.details}</TabPanel>
                    <TabPanel value="report">Attractions</TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}

export default CityDetails;