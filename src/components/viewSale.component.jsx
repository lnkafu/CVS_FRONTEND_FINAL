
import React from 'react'
import axios from 'axios'
import url from './config/url'

export default class ViewSaleComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            sales: [],
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
    printSales = () => {
        let sales = this.state.sales
        if (this.state.searchField === '') {
            return sales.reverse().map((item, index) => {
                return <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.confirmationNumber}</td>
                    <td>{item.customerName}</td>
                    <td>{item.customerNumber}</td>
                    <td>{item.itemsSoldSummary}</td>
                    <td>{item.total}</td>
                </tr>
            })
        } else {
            return sales.reverse().map((item, index) => {
                if (item.customerName.toLowerCase().includes(this.state.searchField.toLowerCase())  || item.itemsSoldSummary.toLowerCase().includes(this.state.searchField.toLowerCase()) ) {
                    return <tr key={index} >
                        <td>{item.date}</td>
                        <td>{item.confirmationNumber}</td>
                        <td>{item.customerName}</td>
                        <td>{item.customerNumber}</td>
                        <td>{item.itemsSoldSummary}</td>
                        <td>{item.total}</td>
                    </tr>
                }

            })
        }


    }

    componentDidMount() {
        axios.get(url.url+"/getSales")
            .then(result => {
                var salesTemp = result.data.Sales
                this.setState({ ...this.state, sales: salesTemp })
               // console.log('salesTemp is ', salesTemp)
            })
            .catch(err => {
                console.log('err occurred ', err)
            })
    }
    componentDidUpdate() {

    }
    reGetSales = ()=>{
        axios.get(url.url+"/getSales")
            .then(result => {
                var salesTemp = result.data.Sales
                this.setState({ ...this.state, sales: salesTemp })
               // console.log('salesTemp is ', salesTemp)
            })
            .catch(err => {
                console.log('err occurred ', err)
            })
    }
    render() {
        return <div className='row mx-2'>
            <div className='card-header bg-info mx-2'>
                <h4> SALES PERFORMED <button className='btn btn-dark btn-rounded' onClick={this.reGetSales}> Refresh List</button></h4>
                <div className="input-group">
                    <input type="text" name='searchField' onChange={this.handleChange} className="form-control" placeholder="Search Sale Record" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <button className="btn btn-outline-dark" type="button" onClick={this.handleShowSearchCustomer}>Search</button>
                    </div>
                </div>
            </div>
            <div>
                <table className='table table-striped table-dark table-hover'>
                    <thead className='thead-primary'>
                        <tr>
                            <th>Date</th>
                            <th>Confirmation #</th>
                            <th>Customer Name</th>
                            <th>Phone #</th>
                            <th>Items Sold</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printSales()}
                    </tbody>
                </table>
            </div>
          
        </div>
    }
}