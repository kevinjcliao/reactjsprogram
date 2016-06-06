const axios = require('axios');

const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const param = "?client_id=" + id + "&client_secret" + sec;

function getUserInfo (username) {
  return axios.get('https://api.github.com/users/' + username + param);
}

function getRepos(username) {
  // Fetch username's repos
  return axios.get('https://api.github.com/users/' + username +  "/repos" +
                   param + "&per_page=100");
}

function getTotalStars(repos) {
  // Get all the stars the users has based on their repositories.
  return repos.data.reduce(function(prev, current) {
    return prev + current.stargazers_count;
  }, 0);
}

function getPlayersData(player) {
  // get repos
  // get total stars.
  // return object with that data
  return getRepos(player.login)
    .then(getTotalStars)
    .then(function(totalStars) {
      return {
        followers: player.followers,
        totalStars: totalStars
      }
    });
}

function calculateScores(players) {
  // return an array after doing some fancy algorithm to determine a winner.
  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars
  ]
}

const helpers = {
  getPlayersInfo: function(players) {
    return axios.all(players.map(function(username) {
      return getUserInfo(username);
    })).then(function (info) {
      return info.map(function(user) {
        return user.data;
      });
    }).catch(function(err) {
      console.warn("Error in get PlayersInfo", err);
    });
  },

  battle: function(players) {
    const playerOneData = getPlayersData(players[0]);
    const playerTwoData = getPlayersData(players[1]);

    return axios.all([playerOneData, playerTwoData])
      .then(calculateScores)
      .catch(function(err) {console.warn("Error in battle function.")});
  }
};

module.exports = helpers;
