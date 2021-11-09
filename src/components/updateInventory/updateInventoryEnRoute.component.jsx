
import React from 'react'
import axios from 'axios'
import url from '../config/url'

export default class UpdateInventoryEnRouteComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            preInventory: [],
            cart: [],
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
    printCart = () => {
        let cart = this.state.cart
        return cart.map((item, index) => {
            return <tr>
                <td>{item.itemID}</td>
                <td>{item.itemDescription}</td>
                <td>{item.quantity}</td>
            </tr>
        })
    }

    increaseQuantity = (item) => {
        let cart = this.state.cart
        let added = false
        if (cart.length === 0) {
            item.quantity = item.quantity + 1
            cart.push(item)
            added = true
        }
        else {
            cart.forEach((itm, index) => {
                if (itm.itemID === item.itemID) {
                    itm.quantity = itm.quantity + 1
                    added = true
                }
            })
        }
        if (!added) {
            item.quantity = item.quantity + 1
            cart.push(item)
        }
        this.setState({ ...this.state, cart: cart })
        console.log(this.state.cart)
    }


    decreaseQuantity = (item) => {
        let cart = this.state.cart
        let added = false
        if (cart.length === 0) {
            item.quantity = item.quantity - 1
            cart.push(item)
            added = true
        }
        else {
            cart.forEach((itm, index) => {
                if (itm.itemID === item.itemID) {
                    itm.quantity = itm.quantity - 1
                    added = true
                }
            })
        }
        if (!added) {
            item.quantity = item.quantity - 1
            cart.push(item)
        }
        this.setState({ ...this.state, cart: cart })
        console.log(this.state.cart)
    }

    printPreInventory = () => {
        let preInventory = this.state.preInventory
        if (this.state.searchField === '') {
            return preInventory.map((item, index) => {
                return <tr key={index}>
                    <td>{item.itemID}</td>
                    <td>{item.shipmentCode}</td>
                    <td>{item.itemType}</td>
                    <td>{item.brand}</td>
                    <td>{item.itemModel}</td>
                    <td>{item.processor}</td>
                    <td>{item.ramSize}</td>
                    <td>{item.hddSize}</td>
                    <td>{item.generation}</td>
                    <td>{item.quantity}</td>
                    <td><button className='btn btn-primary' onClick={() => this.increaseQuantity(item)}><b>+</b></button></td>
                    <td><button className='btn btn-danger ' onClick={() => this.decreaseQuantity(item)}><b>-</b></button></td>
                </tr>
            })
        } else {
            return preInventory.map((item, index) => {
                if (item.itemID.toLowerCase().includes(this.state.searchField.toLowerCase()) || item.itemType.toLowerCase().includes(this.state.searchField.toLowerCase()) || item.itemModel.toLowerCase().includes(this.state.searchField.toLowerCase())) {
                    return <tr key={index}>
                        <td>{item.itemID}</td>
                        <td>{item.shipmentCode}</td>
                        <td>{item.itemType}</td>
                        <td>{item.brand}</td>
                        <td>{item.itemModel}</td>
                        <td>{item.processor}</td>
                        <td>{item.ramSize}</td>
                        <td>{item.hddSize}</td>
                        <td>{item.generation}</td>
                        <td>{item.quantity}</td>
                        <td><button className='btn btn-primary' onClick={() => this.increaseQuantity(item)}><b>+</b></button></td>
                        <td><button className='btn btn-danger' onClick={() => this.decreaseQuantity(item)}><b>-</b></button></td>
                    </tr>
                }

            })
        }


    }

    updatePreInventory =  ()=>{
        let preInventoryToBeUpdated = this.state.cart
        axios.put(url.url+"/updateInventoryEnRoute", preInventoryToBeUpdated)
        .then(result => {
            console.log('result of update Inventory En Route is:', result)
            alert('Item Updated Successfully.')
        }).catch(err => {
            console.log("error", err)
            alert("Item Not Updated. Please retry later or contact Admin")
        })
    }

    componentDidMount() {
        axios.get(url.url+"/getInventoryEnRoute")
            .then(result => {
                //console.log('inventory is ', result.data.Data)
                var preInventoryTemp = result.data.Data.reverse()
                this.setState({ ...this.state, preInventory: preInventoryTemp })
                // console.log('salesTemp is ', salesTemp)
            })
            .catch(err => {
                console.log('err occurred ', err)
            })
    }
    componentDidUpdate() {

    }
    reGetList = ()=> {
        axios.get(url.url+"/getInventoryEnRoute")
        .then(result => {
            //console.log('inventory is ', result.data.Data)
            var preInventoryTemp = result.data.Data.reverse()
            this.setState({ ...this.state, preInventory: preInventoryTemp })
            // console.log('salesTemp is ', salesTemp)
        })
        .catch(err => {
            console.log('err occurred ', err)
        })
    }

    render() {
        return <div className='row'>
            <div className='col-8'>
                <div className='card'>
                    <div className='card-header bg-success'>
                        <h4> Current Items in Inventory En Route State <button className='btn btn-dark btn-rounded' onClick={this.reGetList}> Refresh List</button> </h4>
                        <div className="input-group mb-3">
                            <input type="text" name='searchField' onChange={this.handleChange} className="form-control" placeholder="Search Inventory Record By ID, Item type OR Item Model" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-outline-dark" type="button" onClick={this.handleShowSearchCustomer}>Search</button>
                            </div>
                        </div>
                    </div>
                    <div className='card table-responsive'>
                        <table className='table table-striped table-dark table-hover ' >
                            <thead className='thead-primary'>
                                <tr>
                                    <th>ID</th>
                                    <th>Shipment Code</th>
                                    <th>Item Type</th>
                                    <td>Item Brand</td>
                                    <td>Item Model</td>
                                    <td>Processor</td>
                                    <th>Ram Size</th>
                                    <th>HDD Size</th>
                                    <th>Generation</th>
                                    <th>Quantity</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.printPreInventory()}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>

                </div>
            </div>


            <div className='col-4'>
                <div className='card'>
                    <div className='card-header bg-success'>
                        <h6>Items to be Updated in the Inventory En Route</h6>
                        <button className='btn btn-primary' onClick={this.updatePreInventory}>Save And Update PreInventory</button>
                    </div>
                    <div className='card-body'>
                        <table className='table table-striped table-warning table-hover table-bordered'>
                            <thead className='thead-primary'>
                                <th>Item ID</th>
                                <th>Item Description</th>
                                <th>Quantity</th>
                            </thead>
                            <tbody>
                                {this.printCart()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    }
}