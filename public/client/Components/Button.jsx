import React from 'react';

function Button(props) {
  const { onClick } = props;
  return (
    <div>
      <button id = 'signOutButton' onClick={onClick}>
        Sign Out
      </button>
    </div>
  );
}

export default Button;
