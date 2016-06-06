const React = require('react');
const transparentBg = require('../styles').transparentBg;
const Prompt = require('../components/Prompt');

const PromptContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      username: ''
    };
  },
  handleUpdateUser: function(e) {
    this.setState({
      username: e.target.value
    });
  },
  handleSubmitUser: function(e) {
    e.preventDefault();

    const username = this.state.username;
    this.setState({
      username: ''
    });

    const time_for_battle = this.props.routeParams.playerOne;
    console.log(this.context);
    if(time_for_battle) {
      // Go to battle
      this.context.router.push({
        pathname: '/battle',
        query: {
          playerOne: this.props.routeParams.playerOne,
          playerTwo: this.state.username
        }
      });
    } else{
      // Go to /playerTwo
      this.context.router.push('/playerTwo/' + this.state.username);
    }
  },
  render: function() {
    return (
      <Prompt
        onSubmitUser={this.handleSubmitUser}
        onUpdateUser={this.handleUpdateUser}
        header={this.props.route.header}
        username={this.state.username}/>
    );
  }
});

module.exports = PromptContainer;
