import React from 'react';
import './App.css';
import axios from 'axios';
import {Route, NavLink} from 'react-router-dom';

class App extends React.Component {
  render() {
  return (
    <div className="App">
      <h1>The Nichijou React-App!</h1>
      <header className="App-header">
      <h3>Navigation</h3>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/api/users'>List of Users</NavLink>
        <NavLink to='/api/restricted/students'>List of Teachers</NavLink>
        <NavLink to='/api/restricted/teachers'>List of Students</NavLink>
      </nav>
      </header>
      <div>
        <p>Well, click a link already!</p>
      </div>
      {/* Routes placed here */}
      <Route exact path='/' />
      <Route path='/api/users' />
      <Route path='/api/restricted/students'/>
      <Route path='/api/restricted/teachers'/>
      {/* End of Route Placement */}
    </div>
  );
  }
}

export default App;
