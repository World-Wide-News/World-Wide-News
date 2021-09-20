/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import fetch from 'isomorphic-fetch';
import Map from './Map.jsx';
import LogIn from './LogIn.jsx';
import Welcome from './Welcome.jsx';
import FavoriteList from './FavoriteList.jsx';
import NewsFeed from './NewsFeed.jsx';
import Button from './Button.jsx';

function App() {
  const [currentFavorites, setFavorites] = useState({});
  const [loginStatus, changeLoginStatus] = useState(false);
  const [loginAttempt, changeAttempt] = useState(null);
  const [currentUser, changeUser] = useState(null);
  const [currentCountryClick, setCurrentCountryClick] = useState(null);
  const [posts, setPosts] = useState([]);

  const loginButton = (e) => {
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');

    if (username.value === '' || password.value === '') {
      const result = 'Please fill out the username and password fields to log in.';
      changeAttempt(result);
    } else {
      const user = {
        username: username.value,
        password: password.value,
      };
      fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),

      })
        .then((res) => res.json())
        .then((data) => {
          if (!Array.isArray(data)) throw Error('wrong');
          if (Array.isArray(data)) {
            setFavorites({});
            const favoritesObj = {};
            data.forEach((elem) => {
              favoritesObj[elem.title] = elem.link;
            });
            setFavorites(favoritesObj);
            changeUser(username.value);
            changeLoginStatus(true);
          }
        })
        .catch((err) => changeAttempt('Incorrect username or password!'));
    }
  };

  const signUp = (e) => {
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');

    if (username.value === '' || password.value === '') {
      const result = 'Please fill out the username and password fields to sign up.';
      changeAttempt(result);
    } else if (password.value.length < 5) {
      const result = 'Please create a password longer than 5 characters';
      changeAttempt(result);
    } else {
      const user = {
        username: username.value,
        password: password.value,
      };
      fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
        .then((res) => {
          if (res.status === 200) {
            changeLoginStatus(true);
            changeUser(username.value);
          }
        })

        .catch((err) => console.log(err));
    }
  };

  const getPosts = (countryName) => {
    setTimeout(async () => {
      const postFetchData = await fetch(`/api/getArticles/${countryName}`);
      const postsArr = await postFetchData.json();
      setPosts(postsArr);
    },
    1000);
  };

  const addFavorite = (title, link) => {
    const currentFavoritesCopy = { ...currentFavorites };
    const favoriteUpdate = Object.assign(currentFavoritesCopy, { [title]: link });
    setFavorites(favoriteUpdate);
    fetch('/api/addFav', {
      method: 'POST',
      body: JSON.stringify({ currentUser, title, link }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const deleteFavorite = (title, link) => {
    const currentFavoritesCopy = { ...currentFavorites };
    delete currentFavoritesCopy[title];
    setFavorites(currentFavoritesCopy);
    fetch('/api/deleteFav', {
      method: 'DELETE',
      body: JSON.stringify({ currentUser, title, link }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const signOut = () => {
    console.log('test');
    changeLoginStatus(false);
    changeAttempt(null);
    setFavorites({});
    changeUser(null);
    setCurrentCountryClick(null);
    setPosts([]);
  };

  return (
    <div className="wrapper">
      {!loginStatus
        ? <LogIn loginButton={loginButton} signUp={signUp} loginAttempt={loginAttempt} />
        : [<Welcome key={1} currentUser={currentUser} />,
          <Button key={1} signOut={signOut} />,
        ]}
      <Map
        setCurrentCountryClick={setCurrentCountryClick}
        setPosts={setPosts}
        getPosts={getPosts}
      />
      <NewsFeed
        currentCountryClick={currentCountryClick}
        posts={posts}
        currentFavorites={currentFavorites}
        setFavorites={setFavorites}
        addFavorite={addFavorite}
        deleteFavorite={deleteFavorite}
      />

      <FavoriteList
        currentFavorites={currentFavorites}
        deleteFavorite={deleteFavorite}
      />
    </div>
  );
}

export default App;
