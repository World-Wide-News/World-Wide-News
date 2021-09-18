import React from 'react';

function SubwayCard(props) {
  return (
    <div id="subwayCard">
      <img className="subwayID" src={`https://api.mta.info/lineIcons/${props.subwayTitle}.svg`} alt="test" />
      <div id="uptownTrain">
        Uptown Train
        <div />
      </div>
      <div id="uptownTrain">
        Downtown Train
      </div>

    </div>
  );
}

export default SubwayCard;
