
import React from 'react'
import axios from 'axios'
import url from '../config/url'

export default class ViewTransactionsComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            transactions: [],
            searchField: ''
        }

    }
    handleChange = async (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;

        await this.setState({
            ...this.state,
            [name]: value
        });
    }
    printTransactions = () => {
        let transactions = this.state.transactions
        if (this.state.searchField === '') {
            return transactions.reverse().map((transaction, index) => {
                return <tr key={index}>
                    <td>{transaction.associatedDate}</td>
                    <td>{transaction.transactionType}</td>
                    <td>{transaction.associatedName}</td>
                    <td>{transaction.associatedAmount}</td>
                    <td>{transaction.transactionAmount}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.resolved}</td>
                </tr>
            })
        } else {
            return transactions.reverse().map((transaction, index) => {
                if (transaction.associatedName.toLowerCase().includes(this.state.searchField.toLowerCase()) || transaction.transactionType.toLowerCase().includes(this.state.searchField.toLowerCase())) {
                    return <tr key={index}>
                        <td>{transaction.associatedDate}</td>
                        <td>{transaction.transactionType}</td>
                        <td>{transaction.associatedName}</td>
                        <td>{transaction.associatedAmount}</td>
                        <td>{transaction.transactionAmount}</td>
                        <td>{transaction.description}</td>
                        <td>{transaction.resolved}</td>
                    </tr>
                }


            })
        }


    }
    reGetTransactions = () => {
        axios.get(url.url + "/transactions")
        .then(result => {
            var transactionsTemp = result.data.Transactions
            this.setState({ ...this.state, transactions: transactionsTemp })
        })
        .catch(err => {
            console.log('err occurred ', err)
        })
    }

    componentDidMount() {
        this.reGetTransactions()
    }
    componentDidUpdate() {

    }

    render() {
        return <div>
            <div className='card-header bg-info'>
                <h4>  Transactions <button className='btn btn-dark' onClick={this.reGetTransactions}> Refresh List</button> </h4>
                <div className="input-group mb-3">
                    <input type="text" name='searchField' onChange={this.handleChange} className="form-control" placeholder="Enter Transaction Type or name to search. Transaction Types include: debt,employee pay, debt settlement, recieved deposit, recieved moeny" aria-describedby="basic-addon2" />
                </div>
            </div>
            <div>
                <table className='table table-striped table-dark table-hover'>
                    <thead className='thead-primary'>
                        <tr>
                            <th>Date</th>
                            <th>Transaction Type </th>
                            <th>Associated Name</th>
                            <th>Associated Amount</th>
                            <th>Transaction Amount</th>
                            <th>Description</th>
                            <th>Resolved?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printTransactions()}
                    </tbody>
                </table>
            </div>
        </div>
    }
}