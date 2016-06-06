const React = require('react');
const styles = require('../styles');

function MainContainer(props) {
  return (
    <div className="jumbotron col-sm-12 text-center" styles={styles.transparentBg}>
    {props.children}
    </div>
  );
};

module.exports = MainContainer;
