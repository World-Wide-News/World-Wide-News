import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { signOut } = props;
  console.log(props)
  return (
      <button id="signOutButton" onClick={signOut}>
        Sign Out
      </button>
  );
}

// Button.propTypes = {
//   // eslint-disable-next-line react/forbid-prop-types
//   signOut: PropTypes.func.isRequired,
// };

export default Button;
