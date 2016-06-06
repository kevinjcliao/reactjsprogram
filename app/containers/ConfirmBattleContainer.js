const React = require('react');
const ConfirmBattle = require('../components/ConfirmBattle');
const githubHelpers = require('../utils/githubHelpers');

const ConfirmBattleContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      isLoading: true,
      playersInfo: [],
    };
  },
  componentDidMount: function() {
    const query = this.props.location.query;
    console.log("QUERY: " + query);
    // Fetch info from Github
    githubHelpers.getPlayersInfo([query.playerOne, query.playerTwo])
      .then(function(players) {
        console.log("request complete.");
        this.setState({
          isLoading: false,
          playersInfo: [players[0], players[1]],
        });
      }.bind(this));
  },
  handleInitiateBattle: function() {
    this.context.router.push({
      pathname: '/results',
      state: {
        playersInfo: this.state.playersInfo
      }
    });
  },
  render: function() {
    return (
      <ConfirmBattle
        isLoading={this.state.isLoading}
        playersInfo={this.state.playersInfo}
        onInitiateBattle={this.handleInitiateBattle}/>
    );
  }
});

module.exports = ConfirmBattleContainer;

