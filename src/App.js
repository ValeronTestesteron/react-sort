import React, { Component } from 'react';
import './App.css';
import Table from './Components/Table/Table';
import Loader from './Components/Loader/Loader';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersToTen: [],
      userToTwenty: [],
      userToThirty: [],
      isLoad: true,
    };
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/?results=500&nat=us')
      .then((result) => result.json())
      .then(
        (result) => {
          const allUsersData = result.results;

          const usersToTen = [];
          const userToTwenty = [];
          const userToThirty = [];

          for (let i = 0; i < allUsersData.length; i++) {
            if (allUsersData[i].registered.age <= 10) {
              usersToTen.push(allUsersData[i]);
            } else if (
              allUsersData[i].registered.age <= 20 &&
              allUsersData[i].registered.age > 10
            ) {
              userToTwenty.push(allUsersData[i]);
            } else if (allUsersData[i].registered.age > 20) {
              userToThirty.push(allUsersData[i]);
            }
          }

          this.setState({
            usersToTen: usersToTen,
            userToTwenty: userToTwenty,
            userToThirty: userToThirty,
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
        <div className="description">
          Данные взяты из https://randomuser.me/api/ <br /> Данные рассортированы по дате
          регистрации (registered.age) в группы, которые можно свернуть и развернуть.
          <br /> Есть поиск, который так же показывает вхождение и сортирует по группам <br /> И
          можно перенести карточку Drag and Drop ом в избранное
        </div>
        <div className="table-container">
          {this.state.isLoad ? (
            <Loader />
          ) : (
            <Table
              isLoad={this.state.isLoad}
              usersToTen={this.state.usersToTen}
              userToTwenty={this.state.userToTwenty}
              userToThirty={this.state.userToThirty}
            />
          )}
        </div>
      </div>
    );
  }
}
