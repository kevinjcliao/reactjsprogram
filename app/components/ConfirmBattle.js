const React = require('react');
const PropTypes = React.PropTypes;
const Link = require('react-router').Link;

const UserDetails = require('./UserDetails');
const UserDetailsWrapper = require('./UserDetailsWrapper');
const MainContainer = require('./MainContainer');
const styles = require('../styles');
const Loading = require('./Loading');

const ConfirmBattle = React.createClass ({
  propTypes: {
    isLoading: PropTypes.bool.isRequired,
    playersInfo: PropTypes.array.isRequired,
    onInitiateBattle: PropTypes.func.isRequired
  },
  render: function() {
    return this.props.isLoading === true
         ? <Loading speed={800} text="Waiting" />
         :
           <MainContainer>
           <h1>Confirm Players</h1>
           <div className="col-sm-8 col-sm-offset-2">
             <UserDetailsWrapper header="Player 1">
               <UserDetails info={this.props.playersInfo[0]} />
             </UserDetailsWrapper>
             <UserDetailsWrapper header="Player 2">
               <UserDetails info={this.props.playersInfo[1]} />
             </UserDetailsWrapper>
           </div>
           <div className="col-sm-8 col-sm-offset-2">
             <button type="button" className="btn btn-lg btn-success"
               onClick={this.props.onInitiateBattle}
               style={styles.space}>
               Initiate Battle
             </button>
           </div>
           <div className="col-sm-12" style={styles.space}>
             <Link to="/playerOne">
               <button type="button" className="btn btn-lg btn-danger"
                 style={styles.space}>
                 Reselect Players
               </button>
             </Link>
           </div>
         </MainContainer>

  }
});

module.exports = ConfirmBattle;

