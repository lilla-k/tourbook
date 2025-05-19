import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './TripsFilter.css';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function TripsFilter({
  yearOptions, setSelectedYear, typeOptions, setSelectedType,
}:{
  yearOptions: number[], setSelectedYear: Function, typeOptions: string[], setSelectedType: Function,
}) {
  const handleFilterYear = (event: SelectChangeEvent) => {
    setSelectedYear(event.target.value as string);
  };
  const handleFilterType = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value as string);
  };

  return (
    <div className="TripsFilter">
      <FilterAltIcon className="TripsFilter-filterIcon" />
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          label="Year"
          onChange={handleFilterYear}
        >
          <MenuItem value={undefined}>None</MenuItem>
          {yearOptions.map((year) => <MenuItem value={year}>{year}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          label="Type"
          onChange={handleFilterType}
        >
          <MenuItem value={undefined}>None</MenuItem>
          {typeOptions.map((type) => <MenuItem value={type}>{type}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  );
}

export default TripsFilter;
