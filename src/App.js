import logo from './logo.svg';
import './App.css';
import React from "react";
// import SignInScreen from "./auth.js"
import One from './viewOne'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
var config = {
    apiKey: "AIzaSyD5L7Fp-pO-QewHvRIKLiZfVuSsvRp2Pno",
    authDomain: "startupsys-44116.firebaseapp.com",
    projectId: "startupsys-44116",
    storageBucket: "startupsys-44116.appspot.com",
    messagingSenderId: "398812717174",
    appId: "1:398812717174:web:b1e7e91318879638a8bf57"
  };

firebase.initializeApp(config);


class Main extends React.Component {
  // TODO no need for constructor?
  // The component's Local state.
  state = {
    isSignedIn: false, // Local signed-in state.
    idToken: false
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };
  // Listen to the Firebase Auth state and set the local state.
   componentDidMount() {
     this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({
          isSignedIn: !!user,
          idToken: firebase.auth().currentuser?.getIdToken()
            }
        )

    );
  }
  //Not sure why there are so many callables here....

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div>
        <h1>My App</h1>
        <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        <p>Your Email is {firebase.auth().currentUser.email}</p>
          {setTimeout(console.log('look',this.state.idToken),3000)}
        <One idToken = {this.state.idToken} />
          {console.log('1',this.state.idToken)}
          {console.log('2',firebase.auth().currentuser?.getIdToken())}
        {/*<div className="control">*/}
        {/*      <button onClick={() =>window.location.href='/converter'} className="button is-primary">Go</button>*/}
        {/*</div>*/}
        <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
      </div>
    );
  }
}

// let idToken = firebase.auth().onAuthStateChanged(()=>{firebase.auth().currentuser?.getIdToken()})

// q why when i imported the signing view, did i get a blank screen?
// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

// class RouterComponent extends React.Component {
//   render() {
//     return (
//         <Router>
//             <Switch>
//               <Route exact path="/">
//                 <SignInScreen />
//               </Route>
//               <Route path="/signup">
//                 <SignInScreen/>
//               </Route>
//               <Route path="/converter">
//                 <One/>
//               </Route>
//             </Switch>
//         </Router>
//     );
//   }
// }


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Main/>
      </header>
    </div>
  );
}

export default App;
