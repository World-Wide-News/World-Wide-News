import React, { useEffect, useState } from 'react';

const Newsfeed = (props) => {
  const { title, summary, link } = props;

  return (
    <section name = "Post" id="individualPostWrapper">
      <div name = "Post Title" id="title">
        Title: <a href = {link}>{title}</a>
        <p name = "Article Summary" id="summary">
          {summary}
        </p>
      </div>
    </section>
  );
};
export default Newsfeed;
