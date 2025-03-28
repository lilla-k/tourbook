import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './AttractionsForm.css';

function AttractionsForm({ attractions, setAttractions }) {
  return (
    <div className="AttractionsForm-attractions">
      {attractions.map((attraction, index) => (
        <div>
          <TextField
            label="Visited attraction"
            variant="outlined"
            value={attraction}
            autoFocus={attractions.length > 1 && attractions.length === (index + 1) && attractions[attractions.length - 1] === ''}
            onChange={(e) => {
              attractions[index] = e.target.value;
              setAttractions([...attractions]);
            }}
            onBlur={(e) => {
              if (e.target.value === '') {
                setAttractions(attractions.slice(0, Math.max(attractions.length - 1, 1)));
              }
            }}
          />
          {attractions.length === (index + 1) && attractions[attractions.length - 1] !== '' && (
            <Button
              disabled={attractions[index].length === 0}
              onClick={(e) => setAttractions([...attractions, ''])}
              sx={{ margin: '20px 0' }}
            >
              <AddCircleOutlineIcon className="AttractionsForm-addAttractionIcon" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

export default AttractionsForm;
