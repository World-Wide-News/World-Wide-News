import React, { useEffect, useState } from 'react';
import Post from './Post.jsx';

const Newsfeed = (props) => {
  const {
    currentCountryClick, posts, currentFavorites, setFavorites, addFavorite, deleteFavorite,
  } = props;

  const createPosts = (postData) => {
    const arrOut = postData.map((post, index) => (
      <Post
        key={index}
        title={post.title}
        summary={post.summary}
        link={post.link}
        currentFavorites={currentFavorites}
        setFavorites={setFavorites}
        addFavorite={addFavorite}
        deleteFavorite={deleteFavorite}
      />
    ));
    return arrOut;
  };

  return (

    <section name="Articles" id="articleDiv">
      {posts.length === 0 ? 'Click on a country to see its news!'
        : createPosts(posts)}
    </section>

  );
};

export default Newsfeed;
