
import React from 'react'
import axios from 'axios'
import url from '../config/url'

export default class ViewInventoryEnRouteCustomerVersionComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            preInventory: [],
            cart: [],
            searchField: '',
            ojjTotal: 0
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
   

  

    printPreInventory = () => {
        let preInventory = this.state.preInventory
        if (this.state.searchField === '') {
            return preInventory.map((item, index) => {
                return <tr key={index}>
                    <td>{item.itemType}</td>
                    <td>{item.brand}</td>
                    <td>{item.itemModel}</td>
                    <td>{item.processor}</td>
                    <td>{item.ramSize}</td>
                    <td>{item.hddSize}</td>
                    <td>{item.generation}</td>
                    <td>{item.quantity}</td>
                </tr>
            })
        } else {
            return preInventory.map((item, index) => {
                if (item.itemID.toLowerCase().includes(this.state.searchField.toLowerCase()) || item.itemType.toLowerCase().includes(this.state.searchField.toLowerCase()) || item.itemModel.toLowerCase().includes(this.state.searchField.toLowerCase())) {
                    return <tr key={index}>
                        <td>{item.itemType}</td>
                        <td>{item.brand}</td>
                        <td>{item.itemModel}</td>
                        <td>{item.processor}</td>
                        <td>{item.ramSize}</td>
                        <td>{item.hddSize}</td>
                        <td>{item.generation}</td>
                        <td>{item.quantity}</td>
                     </tr>
                }

            })
        }


    }

   

    componentDidMount() {
        this.reGetList()
    }
    componentDidUpdate() {

    }
    reGetList = async ()=> {
        await  axios.get(url.url+"/getInventoryEnRoute")
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
            
            <div className='col-12'>
                <div className='card'>
                    <div className='card-header bg-success'>
                    <div align='center' ><h1>CVS Store</h1></div>
                    <div align='center' ><h5>Située au COLLEGE L'AGAPE CITE CICAM, </h5></div>
                    <div align='center' ><h5>Numero de Magasin/ Store Number: 651-692-518</h5></div>
                    <div align='center' ><h6>Whatsapp: 79543644\679-700-008</h6></div>
                        <h4> <button className='btn btn-dark btn-rounded' onClick={this.reGetList}> Refresh List </button> Inventaire/Inventory En Route </h4>
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
                                    <th>Item Type</th>
                                    <td>Item Brand</td>
                                    <td>Item Model</td>
                                    <td>Processor</td>
                                    <th>Ram Size</th>
                                    <th>HDD Size</th>
                                    <th>Generation</th>
                                    <th>Quantity</th>
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

        </div>
    }
}