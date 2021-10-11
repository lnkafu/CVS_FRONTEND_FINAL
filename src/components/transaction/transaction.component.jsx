import React from 'react'


export default class TransactionComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            transactionType: '',
            amount:'',
            name: '',
            repaymentAmount: ''
        }
    }

    componentDidMount() { }

    handleChange = (evt)=> {
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
            name: this.state.name,
            amount: this.state.amount,
            repaymentAmount: this.state.repaymentAmount
        }
        alert('success')
        console.log(transaction)
        return <div className="alert alert-success" >
            Success
            <p>Success</p>
        </div>
    }
    render() {
        return <div>
            <form onSubmit={this.saveToDatabase}>
                <div className='row mx-3'>
                    <div className='col-10 card'>

                        <div className='card-header bg-info'> Adding Transaction </div> <br />
                        <div className='row'>
                            <div className='col-3 '>Transaction Type:<span className='text-danger'>**</span></div>
                            <div className='col-8'>
                                <select className="form-control" name='transactionType' value={this.state.transactionType} onChange={this.handleChange} required>
                                    <option> </option>
                                    <option value='transfer'>Transfer</option>
                                    <option value="employee pay">Employee Pay</option>
                                    <option value="rent">Rent</option>
                                    <option value="debt">Debt</option>
                                    <option value="debt settlement">Debt Settlement</option>
                                    <option value="deposit">Deposit</option>
                                </select>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-3 '>Amount:</div>
                            <div className='col-8'>
                                <input className='form-control' type="number" name="amount" value={this.state.amount} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-3 '>Name Associated:</div>
                            <div className='col-8'>
                                <input className='form-control' type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-3 '>Repayment Amount:  </div>
                            <div className='col-8'>
                                <input className='form-control' type="number" name="repaymentAmount" value={this.state.repaymentAmount} onChange={this.handleChange} required />
                            </div>
                        </div>
                       
                        <div className='row'>
                            <div className='col-3 '></div>
                            <div className='col-8'>
                                <button type="submit" className="btn btn-dark btn-block">Save to Database</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    }
}