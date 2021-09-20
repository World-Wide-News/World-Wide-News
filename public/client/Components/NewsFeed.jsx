import React, { useEffect, useState } from 'react';

const Newsfeed = (props) => {
  const { currentCountryClick } = props;

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const getPosts = async (countryName) => {
    try {
      const fetchedPosts = await fetch(`/api/getArticles/${currentCountryClick}`);
      setPosts(fetchedPosts)
      console.log(fetchedPosts.json());
      console.log(fetchedPosts)
    } catch (err) {
      console.log(err);
    }
    // fetch(`/api/population/${currentCountryClick}`)
    //   .then((data) => console.log(data.json()))
    //   .then((data) => setPosts(data));
  };

  let renderedPosts;

  useEffect(() => {
    console.log('test')
    if (currentCountryClick) getPosts(currentCountryClick);
  });

  return (
    <div>
      {(currentCountryClick)}
    </div>
  );
};

export default Newsfeed;
