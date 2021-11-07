import React from 'react'
import axios from 'axios'
import url from '../config/url'


export default class TransactionComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            transactionType: '',
            resolved: '',
            description: '',
            asociatedName: '',
            associatedAmount: '',
            transactionAmount: '',
            associatedDate: ''
        }
    }

    componentDidMount() { }

    handleChange = (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;
        this.setState({
            ...this.state,
            [name]: value,

        });
    }

    saveToDatabase = (e) => {
        e.preventDefault()
        let transaction = {
            transactionType: this.state.transactionType,
            resolved: this.state.resolved,
            description: this.state.description,
            associatedName: this.state.associatedName,
            associatedAmount: this.state.associatedAmount,
            transactionAmount: this.state.transactionAmount,
            associatedDate: this.state.associatedDate,
        }
        console.log(transaction)

        axios.post(url.url + "/transaction", transaction)
            .then(result => {
                alert("Transaction Successfully Saved")
                console.log(result)
                this.setState({
                    ...this.state,
                    transactionType: '',
                    resolved: '',
                    description: '',
                    associatedName: '',
                    associatedAmount: '',
                    transactionAmount: '',
                    associatedDate: '',
                })

            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        return <div>
            <form onSubmit={this.saveToDatabase}>
                <div className='row mx-3'>
                    <div className='col-10 card'>

                        <div className='card-header bg-info'> <h3>Adding Transaction </h3></div>
                        <div className='card-body'>
                        <p> ** Resolved field is only neccesary for debts. Leave it the way it is if tranaction is not a debt **</p>
                           <hr/>
                            <div className='row'>
                                <div className='col-3 '>Transaction Type:<span className='text-danger'>**</span></div>
                                <div className='col-8'>
                                    <select className="form-control" name='transactionType' value={this.state.transactionType} onChange={this.handleChange} required>
                                        <option> </option>
                                        <option value='Transfer'>Transfer</option>
                                        <option value="Employee Pay">Employee Pay</option>
                                        <option value="Store Expenditure">Store Expenditure</option>
                                        <option value="Rent">Rent</option>
                                        <option value="Debt">Register A Debt</option>
                                        <option value="Debt Settlement">Debt Settlement</option>
                                        <option value="Deposited Money">Deposit (Money was Deposited By You)</option>
                                        <option value="Recieved Money">Deposit (Money was Recieved By You)</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3 '>Description :</div>
                                <div className='col-8'>
                                    <input className='form-control' type="String" name="description" value={this.state.description} onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3 '>Name Associated:</div>
                                <div className='col-8'>
                                    <input className='form-control' type="text" name="associatedName" value={this.state.associatedName} onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3 '>Associated Amount:</div>
                                <div className='col-8'>
                                    <input className='form-control' type="number" name="associatedAmount" value={this.state.associatedAmount} onChange={this.handleChange} required />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-3 '>Transaction Amount:  </div>
                                <div className='col-8'>
                                    <input className='form-control' type="number" name="transactionAmount" value={this.state.transactionAmount} onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3 '>Date:  </div>
                                <div className='col-8'>
                                    <input className='form-control' type="date" name="associatedDate" value={this.state.associatedDate} onChange={this.handleChange} required />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3 '>Resolved:  </div>
                                <div className='col-8'>
                                    <select className="form-control" name='resolved' value={this.state.resolved} onChange={this.handleChange} required>
                                        <option value="Not Applicable"> Not Applicable</option>
                                        <option value='Yes'>Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div> <br/>
                            <div className='row'>
                                <div className='col-3 '></div>
                                <div className='col-8'>
                                    <button type="submit" className="btn btn-dark btn-block">Save to Database</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    }
}