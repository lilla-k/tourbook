import './Loading.css';

function Loading({ hidden = false }) {
  return (
    <div className={`lds-ellipsis ${hidden ? 'hidden' : ''}`}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}

export default Loading;
