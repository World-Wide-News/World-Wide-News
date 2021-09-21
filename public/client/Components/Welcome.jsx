/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import Button from './Button.jsx';


function Welcome(props) {
  const { currentUser,signOut } = props;
  return (
    <div id = 'welcomeDiv'>
      Welcome
      <div>
        {currentUser}
      </div>
      <Button key={1} signOut={signOut} />

    </div>
  );
}

export default Welcome;
