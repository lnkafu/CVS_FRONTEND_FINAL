
import React from 'react'
import axios from 'axios'
import url from '../config/url'

export default class PromotePreInventoryToInventoryComponent extends React.Component {
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
                <td><button className='btn btn-success' onClick={() => this.undo(item)}><b>Undo</b></button></td>

            </tr>
        })
    }

    add = async (item) => {
        let cart = this.state.cart
        cart.push(item)


        let preInventoryTemp = []
        preInventoryTemp = await this.state.preInventory.filter(itm => item.itemID !== itm.itemID)

        this.setState({
            ...this.state,
            cart: cart,
            preInventory: preInventoryTemp
        })
    }


    undo = async (item) => {
        let preInventory = this.state.preInventory
        preInventory.push(item)

        let cartTemp = []
        cartTemp = await this.state.cart.filter(itm => item.itemID !== itm.itemID)


        this.setState({
            ...this.state,
            preInventory: preInventory,
            cart: cartTemp
        })
    }

    printPreInventory = () => {
        let preInventory = this.state.preInventory.reverse()
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
                    <td><button className='btn btn-primary' onClick={() => this.add(item)}><b>+</b></button></td>
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
                        <td><button className='btn btn-primary' onClick={() => this.add(item)}><b>+</b></button></td>
                    </tr>
                }

            })
        }


    }

    promotePreInventory = () => {
        let preInventoryToBeUpdated = this.state.cart
        axios.put(url.url + "/promotePreInventory", preInventoryToBeUpdated)
            .then(result => {
                console.log('result of promoted preInventory is:', result)
                this.setState({...this.state, cart: []})
            }).catch(err => {
                console.log("error", err)
            })
    }

    componentDidMount() {
        axios.get(url.url + "/getPreInventories")
            .then(result => {
                //console.log('inventory is ', result.data.Data)
                var preInventoryTemp = result.data.Data
                this.setState({ ...this.state, preInventory: preInventoryTemp })
                // console.log('salesTemp is ', salesTemp)
            })
            .catch(err => {
                console.log('err occurred ', err)
            })
    }
    componentDidUpdate() {

    }
    reGetPreInventory = ()=> {
        axios.get(url.url + "/getPreInventories")
            .then(result => {
                //console.log('inventory is ', result.data.Data)
                var preInventoryTemp = result.data.Data
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
                    <div className='card-header bg-warning'>
                        <h4> Current Items in preInventory State <button className='btn btn-dark btn-rounded' onClick={this.reGetPreInventory}> Refresh List</button> </h4>
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
                    <div className='card-header bg-warning'>
                        <h6>Items to be Promoted From PreInventory State to Inventory Database.</h6>
                        <button className='btn btn-primary' onClick={this.promotePreInventory}>Move Items From PreInventory to Inventory</button>
                    </div>
                    <div className='card-body'>
                        <table className='table table-striped table-warning table-hover table-bordered'>
                            <thead className='thead-primary'>
                                <th>Item ID</th>
                                <th>Item Description</th>
                                <th>Quantity</th>
                                <th>Action</th>
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