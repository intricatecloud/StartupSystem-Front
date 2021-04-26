import logo from './logo.svg';
import './App.css';
import React from "react";
import SignInScreen from "./auth.js"
import One from './viewOne'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// q why when i imported the signing view, did i get a blank screen?
// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

class RouterComponent extends React.Component {
  render() {
    return (
        <Router>
            <Switch>
              <Route exact path="/">
                <One />
              </Route>
              <Route path="/signup">
                <SignInScreen/>
              </Route>
              <Route path="/converter">
                <One/>
              </Route>
            </Switch>
        </Router>
    );
  }
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RouterComponent />
      </header>
    </div>
  );
}

export default App;
