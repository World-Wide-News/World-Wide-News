import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarFilled } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

const Post = (props) => {
  const {
    title, summary, link, currentFavorites, addFavorite, deleteFavorite,
  } = props;

  let favorited = false;
  const titleNoSpace = title.replace(/[' ']/g, '');

  if (currentFavorites[titleNoSpace] === link) favorited = true;
  
  const starEmpty = <span id="emptyStar" onClick={() => addFavorite(title, link)}><FontAwesomeIcon icon={faStarEmpty} /></span>;
  const starFull = <span id="fullStar" onClick={() => deleteFavorite(title)}><FontAwesomeIcon icon={faStarFilled} /></span>;

  return (
    <section name="Post" id="individualPostWrapper">
      <div name="Post Title" id="title">
        Title:
        {' '}
        <a href={link}>{title}</a>
        {' '}
        {favorited ? starFull : starEmpty}
        <p name="Article Summary" id="summary">
          {summary}
        </p>
      </div>
    </section>
  );
};
export default Post;
