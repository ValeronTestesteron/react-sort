import React, { Component } from 'react';
import './App.css';
import Table from './Components/Table/Table';
import Loader from './Components/Loader/Loader';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      isLoad: true,
    };
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/?results=5000&nat=us')
      .then((result) => result.json())
      .then(
        (result) => {
          this.setState({
            allUsers: result.results,
            isLoad: !this.state.isLoad,
          });
        },
        (error) => {
          console.log(error);
        },
      );
  }

  render() {
    return (
      <div className="App">
        <div className="table-container">
          {this.state.isLoad ? (
            <Loader />
          ) : (
            <Table isLoad={this.state.isLoad} allUsers={this.state.allUsers} />
          )}
        </div>
      </div>
    );
  }
}
