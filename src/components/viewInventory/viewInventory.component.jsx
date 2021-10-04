
import React from 'react'
import axios from 'axios'
import url from '../config/url'

export default class ViewInventoryComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            inventory: [],
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
        let inventory = this.state.inventory
        if (this.state.searchField === '') {
            return inventory.map((item, index) => {
                return <tr key={index}>
                    <td>{index+1}</td>
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
                    <td>{item.quantitySold}</td>
                </tr>
            })
        } else {
            return inventory.map((item, index) => {
                if (item.itemType.toLowerCase().includes(this.state.searchField.toLowerCase()) || item.itemModel.toLowerCase().includes(this.state.searchField.toLowerCase())) {
                    return <tr key={index}>
                        <td>{index+1}</td>
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
                        <td>{item.quantitySold}</td>
                    </tr>
                }

            })
        }


    }

    componentDidMount() {
        axios.get(url.url+"/getInventories")
            .then(result => {
                //console.log('inventory is ', result.data.Data)
                var inventoryTemp = result.data.Data
                this.setState({ ...this.state, inventory: inventoryTemp })
                // console.log('salesTemp is ', salesTemp)
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
                <h4> Current Inventory</h4>
                <div className="input-group mb-3">
                    <input type="text" name='searchField' onChange={this.handleChange} className="form-control" placeholder="Search Inventory Record By Item type OR Item Model" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <button className="btn btn-outline-dark" type="button" onClick={this.handleShowSearchCustomer}>Search</button>
                    </div>
                </div>
            </div>
            <div>
                <table className='table table-striped table-dark table-hover'>
                    <thead className='thead-primary'>
                        <tr>
                            <th>#</th>
                            <th>Item ID</th>
                            <th>Shipment Code</th>
                            <th>Item Type</th>
                            <td>Item Brand</td>
                            <td>Item Model</td>
                            <td>Processor</td>
                            <th>Ram Size</th>
                            <th>HDD Size</th>
                            <th>Generation</th>
                            <th>Quantity</th>
                            <th>Quantity Sold</th>
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