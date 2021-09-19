/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import fetch from 'isomorphic-fetch';
import Map from './Map.jsx';
import LogIn from './LogIn.jsx';
import Welcome from './Welcome.jsx';
import FavoriteList from './FavoriteList.jsx';
import NewsFeed from './NewsFeed.jsx';

function App() {
  const [currentFavorites, setFavorites] = useState([]);
  const [loginStatus, changeLoginStatus] = useState(false);
  const [loginAttempt, changeAttempt] = useState(null);
  const [currentUser, changeUser] = useState(null);
  const [divListening, makeDivListen] = useState(false);
  const [currentCountryClick, setCurrentCountryClick] = useState(null);

  const deleteFavorite = (e) => {
    console.log(e.target.id);
  };

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
          // console.log(Array.isArray(data))
          if (Array.isArray(data)) {
            setFavorites(data);
            changeUser(username.value);
            changeLoginStatus(true);
            makeDivListen(false);
          }
        })
        .catch((err) => changeAttempt('Incorrect username or password!'));
    }
  };

  useEffect(() => {
    if (!divListening && loginStatus) {
      const config = { attributes: true, childList: true, subtree: true };
      const secretDiv = document.querySelector('#secret');
      secretDiv.innerHTML = '';

      const callback = function (mutationsList, observer) {
        if (mutationsList[0].addedNodes[0] !== undefined) {
          const subwayStation = mutationsList[0].addedNodes[0].data;
          setFavorites((currentFavorites) => [...currentFavorites, subwayStation]);
          const user = {
            currentUser,
            subwayStation,
          };
          fetch(`/api/addFav/${subwayStation}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
          });

          secretDiv.innerHTML = '';
        }
      };
      const observer = new MutationObserver(callback);

      observer.observe(secretDiv, config);
    }
    if (loginStatus) makeDivListen(true);
  });

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

  return (
    <div className="wrapper">

      {/* {currentCountryHover && } */}

      <Map
        currentFavorites={currentFavorites}
        setFavorites={setFavorites}
        setCurrentCountryClick={setCurrentCountryClick}
      />
      <NewsFeed currentCountryClick={currentCountryClick} />

    </div>
  );
}

export default App;
