import React, { Component } from 'react';

export default class Table extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allUsers: props.allUsers,
            isLoad: props.isLoad,
        }
    }

    render() {

        const allUsersData = this.state.allUsers;

        return (
            <div>

                <h2 className="h2-title">Данные</h2>

                <table className="table">
                
                <thead className="thead-dark">
                    <tr>
                        <th scope="col"> <input type="text" id="search-input" className='input input-search' placeholder='Поиск' /> </th>
                        <th scope="col">Избранные</th>
                    </tr>
                </thead>

                <tbody>
                    {allUsersData.map( (item, i) => {
                        return (
                            <tr key={i}>
                                <td>{item.name.first} {item.name.last}</td>
                                <td></td>
                            </tr>
                        )
                    } )}
                </tbody>
                </table>
            </div>
        )
    }

}
