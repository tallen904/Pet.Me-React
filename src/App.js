import React, { Component } from 'react';
import { auth } from './fire';
import withStyles from '@material-ui/core/styles/withStyles';
import appStyles from './appStyles';
import LandingPage from './components/LandingPage/';
import { Dimmer, Loader, Container } from 'semantic-ui-react';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        loading: true,
        user: null,
      };
  };

  componentDidMount(){
      auth.onAuthStateChanged(user => {
          console.log('AUTH STATE CHANGE');
          if(user) {
              console.log('USER');
              this.setState({ user, loading: false });
          } else {
              console.log('NO USER');
              this.setState({ user: null, loading: false });
          }
      });
  };

  render() {
      const { classes } = this.props;
    const { user, loading } = this.state;
    return (
        <Container className={classes.app} text>
         {loading === true ?
             <Dimmer active>
                <Loader>Loading</Loader>
             </Dimmer> : <LandingPage user={user} />}
         </Container>
    );
  }
}

export default withStyles(appStyles)(App);
