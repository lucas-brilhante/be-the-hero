import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from 'pages/home';
import Register from 'pages/register';
import Incidents from 'pages/incidents';
import NewIncident from 'pages/new-incident';

import './global.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/register' component={Register} />
          <Route path='/incidents' component={Incidents} />
          <Route path='/new-incident' component={NewIncident} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
