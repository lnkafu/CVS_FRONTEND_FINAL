
import React from 'react'
import axios from 'axios'
import url from '../config/url'

export default class ViewCustomersComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customers: [],
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
    printCustomers = () => {
        let customers = this.state.customers
      //  console.log('customers are: ', customers)
        if (this.state.searchField === '') {
            return customers.map((customer, index) => {
                return <tr key={index}>
                    <td>{customer.date}</td>
                    <td>{customer.name}</td>
                    <td>{customer.phoneNumber}</td>
                    <td>{customer.address}</td>
                    <td>{customer.email}</td>
                    <td>{customer.storeName}</td>
                </tr>
            })
        } else {
            return customers.map((customer, index) => {
                if (customer.name.toLowerCase().includes(this.state.searchField.toLowerCase()) ) {
                    return <tr key={index}>
                        <td>{customer.date}</td>
                        <td>{customer.name}</td>
                        <td>{customer.phoneNumber}</td>
                        <td>{customer.address}</td>
                        <td>{customer.email}</td>
                        <td>{customer.storeName}</td>
                    </tr>
                }


            })
        }


    }

    componentDidMount() {
        axios.get(url.url+"/customers")
            .then(result => {
                var customersTemp = result.data.Data
                this.setState({ ...this.state, customers: customersTemp })
               // console.log('customerTemp is ', customersTemp)
            })
            .catch(err => {
                console.log('err occurred ', err)
            })
    }
    componentDidUpdate() {

    }
    render() {
        return <div>
            <div className='card-header bg-info'>
                <h4>  Customers</h4>
                <div className="input-group mb-3">
                    <input type="text" name='searchField' onChange={this.handleChange} className="form-control" placeholder="Type customer's name to search" aria-describedby="basic-addon2" />
                </div>
            </div>
            <div>
                <table className='table table-striped table-dark table-hover'>
                    <thead className='thead-primary'>
                        <tr>
                            <th>Date</th>
                            <th>Customer Name</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Store Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printCustomers()}
                    </tbody>
                </table>
            </div>
        </div>
    }
}