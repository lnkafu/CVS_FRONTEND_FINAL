
import React from 'react'
import axios from 'axios'
import url from '../config/url'

export default class AddCustomerComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            email: '',
            phoneNumber: '',
            storeName: '',
            message: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(evt) {
        const value = evt.target.value;
        const name = evt.target.name;
        this.setState({
            ...this.state,
            [name]: value,

        });
    }



    saveToDatabase = (e) => {
        let customer = {
            name: this.state.name,
            address: this.state.address,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            storeName: this.state.storeName
        }
        axios.post(url.url+"/customer", customer)
            .then(result => {
                this.setState({
                    ...this.state,
                    name: "",
                    address: '',
                    email: '',
                    phoneNumber: '',
                    storeName: ''
                })
               // console.log(result)
                alert("Customer Successfully Added")
            })
            .catch(err => {
                console.log(err)
                alert("Customer Not Added")
            })
            e.preventDefault()
    }



    render() {
        return <form onSubmit={this.saveToDatabase}>
            <div className='container'>
            <div className='row'>
                <div className='col-10 card'>

                    <div className='card-header bg-info'> Adding Customer </div> <br />
                    <div className='row'>
                        <div className='col-3 '>Customer Name:<span className='text-danger'>**</span></div>
                        <div className='col-8'>
                            <input className='form-control' type="text" name="name" value={this.state.name} onChange={this.handleChange}  required/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 '>Address:</div>
                        <div className='col-8'>
                            <input className='form-control' type="text" name="address" value={this.state.address} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 '>Email:</div>
                        <div className='col-8'>
                            <input className='form-control' type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 '>Phone Number: <span className='text-danger'>**</span> </div>
                        <div className='col-8'>
                            <input className='form-control' type="text" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange} required/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 '></div>
                        <div className='col-8'>
                            <button  type="submit" className="btn btn-dark btn-block">Save to Database</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </form>
    }
}