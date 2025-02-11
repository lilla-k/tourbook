import './TitleInput.css';

function TitleInput({ value, onChange }) {
  return (
    <div>
      <input
        className="TitleInput"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default TitleInput;
