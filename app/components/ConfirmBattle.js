const React = require('react');
const PropTypes = React.PropTypes;
const Link = require('react-router').Link;

const styles = require('../styles');
const UserDetails = require('./UserDetails');
const UserDetailsWrapper = require('./UserDetailsWrapper');

const ConfirmBattle = React.createClass ({
  propTypes: {
    isLoading: PropTypes.bool.isRequired,
    playersInfo: PropTypes.array.isRequired,
    onInitiateBattle: PropTypes.func.isRequired
  },
  puke: function(object) {
    return <pre>{JSON.stringify(object, null, ' ')}</pre>;
  },
  render: function() {
    console.log(styles.transparentBg);
    return this.props.isLoading === true
         ? <p> LOADING!</p>
         :
         <div className="jumbotron col-sm-12 text-center" style={styles.transparentBg}>
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
         </div>
  }
});

module.exports = ConfirmBattle;

