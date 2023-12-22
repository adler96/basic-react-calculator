import './assets/style.css';

function Keypad({ keysArray, clickCallback }) {

  const handleClick = (e) => {
    clickCallback(e);
  }

  const deleting = keysArray
    .filter((item, index) => index < 2)
    .map((elt, index) => <input type="button" className='btn' key={index} onClick={handleClick} value={elt} />);

  return (
    <div className='keypad'>
      <div className="row1">{ deleting }</div>
      <div className="row2">
        <div className="col1">
          {keysArray
            .filter((item, index) => index >= 2 && index <= 13)
            .map((element, index) => {
              return <input type='button' className='btn' key={index} onClick={handleClick} value={element} />;
            })}
        </div>
        <div className="col2">
          {keysArray
            .filter((item, index) => index > 13)
            .map((element, index) => {
              return <input type="button" className='btn' key={index} onClick={handleClick} value={element} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default Keypad;
