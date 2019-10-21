import React, { Component } from 'react';
import CountryDetail from '../countryDetails/CountryDetail'
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

let maxHeight = '80vh'; 
if (window.innerWidth < 412) {
  maxHeight = '40vh';
}

const styles = {
  maxHeight,
  overflow: 'scroll', 
};

class App extends Component {
  constructor(){
    super();
    this.state = {
      countriesList: [],
    }
    this.getAllCountries = this.getAllCountries.bind(this);
  }

  getAllCountries() {
    axios.get('https://raw.githubusercontent.com/mledoze/countries/master/countries.json')
      .then((response) => {
        this.setState({
          countriesList: response.data
        })
      });
  }
  
  componentDidMount() {
    this.getAllCountries();
  }

  render() {
    return (
      <div className="App">
          <nav className="navbar navbar-dark bg-primary mb-3">
            <div className="container">
              <Link className="navbar-brand" to="/">WikiCountries</Link>
            </div>
          </nav>
          <div className="container">
            <div className="row">
              <div className="col-md-5 col-sm-12" style={styles}>
                <div className="list-group">
                {
                  this.state.countriesList.map(country => <Link key={country.cca3} className="list-group-item list-group-item-action" to={`/${country.cca3}`}><span>{country.flag} {" " + country.name.common}</span></Link>)
                }
                </div>
              </div>
              <Switch>
                <Route path='/:id' render={(props) => this.state.countriesList.length !== 0 
                  ? <CountryDetail {...props} countriesList={this.state.countriesList} />
                  : null
                } />
              </Switch>
            </div>
          </div>
        </div>
    );
  }
}

export default App;