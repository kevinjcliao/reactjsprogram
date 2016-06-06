const React = require('react');
const Results = require('../components/Results');
const githubHelpers = require('../utils/githubHelpers');

const ResultsContainer = React.createClass({
  getInitialState: function() {
    return {
      isLoading: true,
      scores: []
    }
  },
  componentDidMount: function() {
    const playersInfo = this.props.location.state.playersInfo;
    githubHelpers.battle(playersInfo)
      .then(function(scores) {
        this.setState({
          scores: scores,
          isLoading: false
        });
      }.bind(this));
  },
  render: function() {
    return (
      <Results isLoading={this.state.isLoading}
        scores={this.state.scores}
        playersInfo={this.props.location.state.playersInfo}/>
    );
  }
});

module.exports = ResultsContainer;
