import React, { useState } from 'react';

const Newsfeed = (props) => {
  const { currentCountryClick } = props;

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const getPosts = (countryName) => {
    console.log(countryName);
    setLoading(true);
    fetch(`/api/population/${countryName}`)
      .then((data) => console.log(data.json()))
      .then((data) => setPosts(data))
      .then(() => setLoading(false));
  };

  const renderedPosts = posts.map((post, index) => (
    <div key={index}>
      <h1>{post.title}</h1>
    </div>
  ));

  return (
    <div id = 'NewsFeed'>
      {/* {renderedPosts} */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={() => getPosts(currentCountryClick)}>Load Posts</button>
      )}
    </div>
  );
};

export default Newsfeed;
