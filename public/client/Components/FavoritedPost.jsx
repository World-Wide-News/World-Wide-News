import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const FavoritedPost = (props) => {
  const { title, link, deleteFavorite } = props;

  const faTimesX = <span id="fullStar" onClick={() => deleteFavorite(title, link)}><FontAwesomeIcon icon={faTimes} /></span>;

  return (
    <section name="Post" id="individualPostWrapper">
      <div name="Post Title" id="title">
        Title:
        <a href={link}>{title}</a>
      </div>
      {faTimesX}
    </section>
  );
};
export default FavoritedPost;
