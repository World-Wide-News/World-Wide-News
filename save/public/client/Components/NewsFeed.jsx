import React from 'react'
import useNewsfeed from './useNewsfeed.js'

const Newsfeed = () => { 
  const {
    state: { loading, posts },
    getPosts
  } = useNewsfeed()

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <h1>{post.title}</h1>
        </div>
      ))}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={getPosts}>Load Posts</button>
      )}
    </div>
  )
}

export default Newsfeed