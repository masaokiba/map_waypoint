import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Container from '@material-ui/core/Container';

import Main from 'pages/main';


function App() {
  return (
    <Container className='App'>
      <BrowserRouter>
        <Switch>
          <Route
            path='/'
            component={Main} />
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default React.memo(App);
