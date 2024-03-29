// import Data from './data.json';
import './App.css';
import React from 'react';
import './input.css';
// import {idToken} from "./auth";
// import firebase from "firebase";
// static data for dev
// import Data from './data.json';

// const idToken = fbase.auth().onAuthStateChanged(()=>{console.log('work?',fbase.auth().currentuser?.getIdToken())})
// setInterval(fbase.auth().onAuthStateChanged(()=>{console.log('work?',fbase.auth().currentuser?.getIdToken())}),2000)
// setInterval(console.log('idktoek',idToken()),1000)

class Input extends React.Component {

// SET INTERVAL THE BEST WAY TO DO IT? WEB HOOK?

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        this._getRates();
        setInterval(this._getRates,3000)
        console.log('3',this.props)
    }
    //
    _getRates () {
         // console.log('id',idToken)
         fetch('dev/converter', {
             method: 'GET',
             headers: {
                 'Authorization': 0 //this.props.idToken THIS IS WHAT CAUSES THE CANNOT GET
                 // PROPERTY OF UNDEFINED ERROR
          }
         }).then((res) => {
            if (res.status === 401) {
                      return console.log('unauthorized')
                    }
            let resj = res.json();
             console.log('response =', res);
             console.log('data = ', resj);
             return resj
         }).then((DatafromApi) => {
             this.setState({
                    usdeurX : DatafromApi[0].p,
                    usdjpyX : DatafromApi[1].p,
                    eurjpyX : DatafromApi[2].p})
         })
             .catch((err) => {
                 console.log(err)
             })
        }





    render () {
        let label = this.props.label;
        let xmonies = this.props.monies ? parseFloat(this.props.monies) : 0
        let monies = () => {
                if (label === this.props.lastChangedCurrency) {return xmonies}
                else if (this.props.lastChangedCurrency === "USD" ) {return this._conUsd(xmonies,label)}
                else if (this.props.lastChangedCurrency === "EUR" ) {return this._conEur(xmonies,label)}
                else if (this.props.lastChangedCurrency === "JPY" ) {return this._conJpy(xmonies,label)}
                return 'end of monies';
            }
        console.log(label, monies())
        return (
            <div className="field has-addons">
                <p className="control">
                    <input
                        className="input"
                        type="text"
                        value={monies()}
                        onChange={(event)=>this._handlerOfChange(event,label)
                        }/>
                </p>
                <p className="control">
                    <button className="button is-static">{label}</button>
                </p>
            </div>
        )
    }


    _handlerOfChange = (event,label)=> {
        event.preventDefault();
        this.props.onValueChange(event.target.value,label);
    };


    _conUsd = (value,label)=> {
        console.log('this is conUSD');
            if (label=="EUR") {
                let x =  value * this.state.usdeurX
                return Math.round(x*1000) /1000
            }
            else if (label=="JPY") {
                let x = value * this.state.usdjpyX
                return Math.round(x*1000) /1000
            }
            return 0
        }

    _conEur = (value,label)=> {
        console.log('this is conEUR');
        if (label=="USD") {
            let x = value / this.state.usdeurX
            return Math.round(x*1000) /1000
            }
        else if (label=="JPY") {
            let x =  value * this.state.eurjpyX
            return Math.round(x*1000) / 1000
            }
        return 0

    }

    _conJpy = (value,label)=> {
        console.log('this is conJPY');
        console.log('label for condition',label);
        // debugger;
        if (label=="EUR") {
            let x = value/this.state.eurjpyX;
            console.log(x);
            return Math.round(x*1000) /1000
        }
        else if (label=="USD") {
            let x = value/this.state.usdjpyX
            console.log(x)
            return Math.round(x*1000) /1000
        }
        return 0
    }


}


class One extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentMonies: 0,
      lastChangedCurrency: 'USD',
      currencies: ['USD','EUR','JPY']
    }
  }

  save_to_wallet (vals) {
      fetch('dev/save', {
             method: 'POST',
             body: vals,
             headers: {
                 'Authorization': this.props.idToken
          }
         }).then((res) => {
            if (res.status === 401) {
                      return console.log('unauthorized')
                    }
            let resj = res.json();
             console.log('response =', res);
             console.log('data = ', resj);
             return resj
         })
             .catch((err) => {
                 console.log(err)
             })
        }


  render() {
    return (

      <div className="One">
          {
            this.state.currencies.map((cur)=>(
              <Input
                label={cur}
                monies = {this.state.currentMonies}
                lastChangedCurrency = {this.state.lastChangedCurrency}
                onValueChange={this._handleUpdate}
                idToken = {this.props.idToken}/>
            ))
          }

          <div className="control">
              <button className="button is-primary" onClick={
                  () => {
                      let values = {};
                      this.props.children.forEach((item) => {
                          values[item.props.label] = item.props.value
                        }
                    )
                }
              }>Save</button>
          </div>
      </div>
    );
  }
  // todo post function for save, add as onclick event callback...


  // handler function to pass in as onMoniesChange=
  // must update state
  _handleUpdate = (monies,currency) => {
    console.log(monies,currency)
    this.setState({
      currentMonies: monies,
      lastChangedCurrency: currency
    })
  }
}

export default One