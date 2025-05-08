import './TitleInput.css';

function TitleInput({ value, onChange }: { value: string, onChange: (input: string) => void }) {
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
