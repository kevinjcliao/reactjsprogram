const React = require('react');
const PropTypes = React.PropTypes;
const styles = require('../styles');
const Link = require('react-router').Link;

// Local component inclusion:
const UserDetails = require('./UserDetails');
const UserDetailsWrapper = require('./UserDetailsWrapper');
const MainContainer = require('./MainContainer');
const Loading = require('./Loading');

function StartOver() {
  return (
    <MainContainer>
      <Link to="/playerOne">
        <button type="button" className="btn btn-lg btn-danger">
          Start Over
        </button>
      </Link>
    </MainContainer>
  );
}

function Results(props) {
  if(props.isLoading) {
    return <Loading text="One Moment" speed={100} />
  }

  const there_is_a_tie = props.scores[0] === props.scores[1];
  if(there_is_a_tie) {
    return (
      <MainContainer>
        <h1>It's a tie!</h1>
        <StartOver />
      </MainContainer>
    );
  }

  const winningIndex = props.scores[0] > props.scores[1] ? 0 : 1;
  const losingIndex = winningIndex === 0 ? 1 : 0;
  return (
    <MainContainer>
      <h1>Results</h1>
      <div className="col-sm-8 col-sm-offset-2">
        <UserDetailsWrapper header="Winner">
          <UserDetails score={props.scores[winningIndex]}
            info={props.playersInfo[winningIndex]} />
        </UserDetailsWrapper>
        <UserDetailsWrapper header="Loser">
          <UserDetails score={props.scores[losingIndex]}
            info={props.playersInfo[losingIndex]} />
        </UserDetailsWrapper>
      </div>
      <StartOver />
    </MainContainer>
  );
}

Results.PropTypes = {
  isLoading: PropTypes.bool.isRequired,
  scores: PropTypes.array.isRequired,
  playersInfo: PropTypes.array.isRequired
}

module.exports = Results;
