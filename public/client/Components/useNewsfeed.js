import { useState } from 'react';

export default () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const getPosts = (countryName) => {
    setLoading(true);
    fetch(`/api/population/${countryName}`)
      .then((data) => data.json())
      .then((data) => setPosts(data))
      .then(() => setLoading(false));
  };

  return {
    state: { loading, posts },
    getPosts,
  };
};
