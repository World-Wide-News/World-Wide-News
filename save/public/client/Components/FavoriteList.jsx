import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

function FavoriteList(props) {
  const { currentFavorites, deleteFavorite } = props;

  

  const faTimesX = <span id ="delete" onClick = {deleteFavorite}><FontAwesomeIcon icon={faTimes}/></span>;

  const favoriteList = currentFavorites.map((elem, index) => {
    return <li key={elem}>{elem} {faTimesX}</li>
  });

  return (
    <div className="favoritesList">
      {favoriteList} 
    </div>
  );
}

export default FavoriteList;
