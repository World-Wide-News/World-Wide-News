import React from 'react';
import PropTypes from 'prop-types';
import FavoritedPost from './FavoritedPost.jsx';

function FavoriteList(props) {
  const { currentFavorites, deleteFavorite } = props;

  const favoritedPosts = [];
  let counter = 0;
  for (const [title, link] of Object.entries(currentFavorites)) {
    favoritedPosts.push(<FavoritedPost key={counter++} title={title} link={link} deleteFavorite={deleteFavorite} />);
  }

  return (
    <div>
    <div className="favoritesList">
      Click on an article to favorite it!
      {favoritedPosts}
    </div>
    </div>
  );
}

FavoriteList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  currentFavorites: PropTypes.object.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
};

export default FavoriteList;
