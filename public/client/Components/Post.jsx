import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarFilled } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';


const Post = (props) => {
  const {
    title, summary, link, currentFavorites, addFavorite, deleteFavorite,
  } = props;

  let favorited = false;

  if (currentFavorites[title] === link) favorited = true;

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

Post.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentFavorites: PropTypes.object.isRequired,
};
export default Post;
