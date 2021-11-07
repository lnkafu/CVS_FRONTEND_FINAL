
import React from 'react'
import axios from 'axios'
import url from '../config/url'
import { Chart } from "react-google-charts";

export default class AccountingAnalysisComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            transactions: [],
            sales: [],
            searchField: '',
            calulcatedSales: 0,
            calulcatedDebt: 0,
            calulcatedTransfers: 0,
            calulcatedStoreExpenditures: 0
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

        return transactions.reverse().map((transaction, index) => {
            if (transaction.resolved.toLowerCase() === 'no') {
                return <tr key={index}>
                    <td>{transaction.associatedDate}</td>
                    <td>{transaction.associatedName}</td>
                    <td>{transaction.associatedAmount}</td>
                    <td>{transaction.description}</td>
                </tr>
            }
        })
    }
    printTransfers = () => {
        let transactions = this.state.transactions
        return transactions.reverse().map((transaction, index) => {
            if (transaction.transactionType.toLowerCase() === 'transfer') {
                return <tr key={index}>
                    <td>{transaction.associatedDate}</td>
                    <td>{transaction.associatedName}</td>
                    <td>{transaction.associatedAmount}</td>
                    <td>{transaction.description}</td>
                </tr>
            }
        })



    }
    getTransactions = () => {
        axios.get(url.url + "/transactions")
            .then(result => {
                var transactionsTemp = result.data.Transactions
                this.setState({ ...this.state, transactions: transactionsTemp })
            })
            .catch(err => {
                console.log('err occurred ', err)
            })
    }
    getSales = () => {
        axios.get(url.url + "/getSales")
            .then(result => {
                var salesTemp = result.data.Sales
                this.setState({ ...this.state, sales: salesTemp })
            })
            .catch(err => {
                console.log('err occurred ', err)
            })
    }
    calculateSales = () => {
        let total = 0
        this.state.sales.forEach(item => {
            total = total + item.total
        })
        //this.setState({...this.state, calculatedSales: total})
        return total
    }
    calculateDebts = () => {
        let debtTotal = 0
        this.state.transactions.forEach(item => {
            if (item.transactionType.toLowerCase() === 'debt' && item.resolved.toLowerCase() === 'no') {
                debtTotal = debtTotal + item.associatedAmount
            }
        })
        return debtTotal
    }
    calculateTransfers = () => {
        let transfers = 0
        this.state.transactions.forEach(item => {
            if (item.transactionType.toLowerCase() === 'transfer') {
                transfers = transfers + item.associatedAmount
            }
        })
        return transfers
    }
    calculateStoreExpenditures = () => {
        let storeExpenditures = 0
        this.state.transactions.forEach(item => {
            if (item.transactionType.toLowerCase() === 'store expenditure') {
                storeExpenditures = storeExpenditures + item.associatedAmount
            }
        })
        return storeExpenditures
    }
    calculateExpectedCashAtHand = () => {
        return this.calculateSales() - this.calculateDebts() - this.calculateTransfers() - this.calculateStoreExpenditures()
    }
    refresh = async () => {
        await this.getSales()
        await this.getTransactions()
    }
    componentDidMount() {
        this.getTransactions()
        this.getSales()
    }
    componentDidUpdate() {

    }

    render() {
        return <div>
            <div className='card-header bg-info'>
                <h4>  Accounting Analysis <button className='btn btn-dark' onClick={this.refresh}> Refresh Page</button> </h4>
            </div>
            <div>
                <div className='row'>
                    <div className='col-6 card'>
                        <div className='card-body'>
                            <h6 className=" bg-success text-white">Total Sales: {this.calculateSales().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'frs'}</h6>
                            <h6 className=" bg-danger text-dark">Total Debt: {this.calculateDebts().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'frs'}</h6>
                            <h6 className=" bg-warning text-dark">Total Transfers: {this.calculateTransfers().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'frs'}</h6>
                            <h6 className=" bg-info text-dark">Store Expenditures: {this.calculateStoreExpenditures().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'frs'}</h6>
                            <h6 className=" bg-primary text-dark">Expected Cash At Hand:{this.calculateExpectedCashAtHand().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'frs'}</h6>
                            <hr />
                            <h6>Monthly Rent:</h6>
                            <h6>Annual Rent:</h6>
                            <h6>Employee Pay YTD:</h6>
                            <h6>Annual Employee Pay:</h6>
                        </div>
                    </div>
                    <div className='col-6 card'>
                        <div className='card-body'>
                            <Chart
                                width={'600px'}
                                height={'300px'}
                                chartType="PieChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['Tsk', 'Hours per '],
                                    ['Cash At Hand', 11],
                                    ['Debt', 2],
                                    ['Total Transfer', 2],
                                    ['Watch TV', 2],
                                    ['Sleep', 7],
                                ]}
                                options={{
                                    title: 'Accounting Analysis',
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-6 card'>
                        <div className='card-body'>
                            <table className='table table-striped table-dark table-hover'>
                                <thead className='thead-primary'>
                                    <tr>
                                        <th>Date</th>
                                        <th>Debtor</th>
                                        <th> Amount</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.printTransactions()
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='col-6 card'>
                    <div className='card-body'>
                            <table className='table table-striped table-dark table-hover'>
                                <thead className='thead-primary'>
                                    <tr>
                                        <th>Date</th>
                                        <th>Reciever</th>
                                        <th> Amount</th>
                                        <th>Transfer Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.printTransfers()
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    }
}