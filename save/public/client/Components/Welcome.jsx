/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React from 'react';

function Welcome(props) {
  const { currentUser } = props;
  return (
    <div>
      Welcome
      <div>
        {currentUser}
      </div>
    </div>
  );
}

export default Welcome;
