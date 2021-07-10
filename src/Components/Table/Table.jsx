import React, { Component } from 'react';
import Text from '../text';

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersToTen: props.usersToTen,
      userToTwenty: props.userToTwenty,
      userToThirty: props.userToThirty,
      isLoad: props.isLoad,
      chosenUsers: [],
      dragItem: {},
      searchValue: '',
      dragChooseItem: {},
    };
  }

  checkUsersAr = (arr) => {
    if (arr.length !== 0) {
      return (
        <div className="faq-item">
          <input className="faq-input" type="checkbox" id="faq_3" />
          <label className="faq-title" htmlFor="faq_3">
            21-30
          </label>
          <div className="faq-text">
            {arr.map((item, i) => {
              <p key={i}>
                {item.name.first} {item.name.last}
              </p>;
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="faq-item disable">
          <label className="faq-title" htmlFor="faq_3">
            21-30
          </label>
        </div>
      );
    }
  };

  dragStartHandler(e, cart) {
    if (!e.target.classList.contains('form__drag-choosen-cart')) {
      this.setState({
        dragItem: cart,
      });
    }

    e.target.classList.add('hovered');
    document.querySelector('.form__right-bar').style.background = 'lightgray';

    if (e.target.classList.contains('form__drag-choosen-cart')) {
      this.setState({ dragChooseItem: cart });
    }
  }

  deleteChoosenUser(item) {
    const nweChosenUsers = this.state.chosenUsers.filter((i) => item !== i);
    console.log('e.target :>> ', item);
    this.setState({
      chosenUsers: nweChosenUsers,
    });
  }

  dragLeaveHandler(e) {}

  dragEndHandler(e) {
    e.target.classList.remove('hovered');
    document.querySelector('.form__right-bar').style.background = 'white';
  }

  dragOverHandler(e, cart) {
    e.preventDefault();
  }

  dropHandler(e, cart) {
    e.preventDefault();

    this.setState({
      chosenUsers: [...this.state.chosenUsers, this.state.dragItem],
    });

    e.target.classList.remove('hovered');
    document.querySelector('.form__right-bar').style.background = 'white';

    const currentIndex = this.state.chosenUsers.indexOf(this.state.dragChooseItem);
    //this.setState({ chosenUsers: [this.state.chosenUsers.splice(currentIndex, 1)] });
    //console.log(this.state.chosenUsers.indexOf(e.target));
  }

  render() {
    const allChosenData = this.state.chosenUsers;

    console.log(1);
    //console.log(userToTwenty);
    //console.log(userToThirty);

    const searchUsersToTen = this.state.usersToTen.filter((user) => {
      return (
        user.name.first.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
        user.name.last.toLowerCase().includes(this.state.searchValue.toLowerCase())
      );
    });
    const searchUsersToTwenty = this.state.userToTwenty.filter((user) => {
      return (
        user.name.first.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
        user.name.last.toLowerCase().includes(this.state.searchValue.toLowerCase())
      );
    });

    return (
      <div>
        <h2 className="h2-title">Данные</h2>

        <form className="form">
          <div className="form-header">
            <div className="form-header__search">
              <input
                type="text"
                id="search-input"
                className="input input-search"
                placeholder="Поиск"
                onChange={(e) => this.setState({ searchValue: e.target.value })}
              />
            </div>
            <div className="form-header__chosen">Избранные</div>
          </div>

          <div className="form__area">
            <div className="form__left-bar">
              <div className="form__drag-line">
                <div className="faq-item">
                  <input className="faq-input" type="checkbox" id="faq_1" />
                  <label className="faq-title" htmlFor="faq_1">
                    1-10
                  </label>
                  <div className="faq-text">
                    {searchUsersToTen.map((item, i) => {
                      return (
                        <div key={i} className="form__drag-cell">
                          <div
                            onDragStart={(e) => this.dragStartHandler(e, item)}
                            onDragEnd={(e) => this.dragEndHandler(e)}
                            draggable="true"
                            className="form__drag-cart">
                            <div className="cart__img">
                              <img src={item.picture.thumbnail} alt="" />
                            </div>
                            <div className="cart__info">
                              <div className="cart__title">
                                {item.name.first} {item.name.last}, дата регистрации:{' '}
                                {item.registered.date}
                              </div>
                              <div className="cart_body">{item.email}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="form__drag-line">
                <div className="faq-item">
                  <input className="faq-input" type="checkbox" id="faq_2" />
                  <label className="faq-title" htmlFor="faq_2">
                    11-20
                  </label>
                  <div className="faq-text">
                    {searchUsersToTwenty.map((item, i) => {
                      return (
                        <div key={i} className="form__drag-cell">
                          <div
                            onDragStart={(e) => this.dragStartHandler(e, item)}
                            onDragEnd={(e) => this.dragEndHandler(e)}
                            draggable="true"
                            className="form__drag-cart">
                            <div className="cart__img">
                              <img src={item.picture.thumbnail} alt="" />
                            </div>
                            <div className="cart__info">
                              <div className="cart__title">
                                {item.name.first} {item.name.last}, дата регистрации:{' '}
                                {item.registered.date}
                              </div>
                              <div className="cart_body">{item.email}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {this.checkUsersAr(this.state.userToThirty)}
            </div>

            <div
              className="form__right-bar"
              onDragOver={(e) => this.dragOverHandler(e)}
              onDrop={(e) => this.dropHandler(e)}
              onDragLeave={(e) => this.dragLeaveHandler(e)}>
              <div className="chosen-item">
                {allChosenData.map((item, i) => {
                  return (
                    <div key={i} className="form__drag-cell">
                      <div
                        className="form__drag-cart form__drag-choosen-cart"
                        onDragStart={(e) => this.dragStartHandler(e, item)}
                        onDragEnd={(e) => this.dragEndHandler(e)}
                        onDragOver={(e) => this.dragOverHandler(e)}
                        onDragLeave={(e) => this.dragLeaveHandler(e)}>
                        <div className="cart__img">
                          <img src={item.picture.thumbnail} alt="" />
                        </div>
                        <div className="cart__info">
                          <div className="cart__title">
                            {item.name.first} {item.name.last}, дата регистрации:{' '}
                            {item.registered.date}
                          </div>
                          <div className="cart_body">{item.email}</div>
                        </div>
                        <div className="cart__actions">
                          <div
                            className="cart__actions-delete"
                            onClick={(e) => this.deleteChoosenUser(item)}>
                            ✖
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
