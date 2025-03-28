import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './AttractionsForm.css';

type AttractionsFormProps = {
  attractions: Array<string>;
  setAttractions: (attractions: string[]) => void;
};

function AttractionsForm({ attractions, setAttractions }: AttractionsFormProps) {
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
              const newAttractions = attractions.map((a, i) => (i === index ? e.target.value : a));
              setAttractions(newAttractions);
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
              onClick={() => setAttractions([...attractions, ''])}
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
