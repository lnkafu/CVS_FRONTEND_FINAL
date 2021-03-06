
import React from 'react'
import axios from 'axios'
import url from '../config/url'

export default class AddToCartComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            setOpen: false,
            itemType: 'Laptop',
            brand: '',
            itemModel: '',
            processor: '',
            ramSize: '',
            hddSize: '',
            quantity: '',
            unitPrice: '',
            generation: '',
            shipmentCode: 'cvb',
            quantitySold: 0,
            addedBy: 'Lawrence',
            cart: []
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
        // console.log(this.state)
    }

    componentDidMount() {
        let data = sessionStorage.getItem('user')
        if (data != null) {
            data = JSON.parse(data)
            //console.log('User is', data)
            this.setState({ ...this.state, addedBy: data.lastName + " " + data.firstName })
        }
    }

    addItem = () => {
        let tempCart = this.state.cart
        let item = {
            itemType: this.state.itemType,
            brand: " " + this.state.brand,
            itemModel: " " + this.state.itemModel,
            processor: " " + this.state.processor,
            ramSize: " " + this.state.ramSize,
            hddSize: " " + this.state.hddSize,
            quantity: " " + this.state.quantity,
            unitPrice: " " + this.state.unitPrice,
            generation: " " + this.state.generation,
            shipmentCode: this.state.shipmentCode,
            quantitySold: this.state.quantitySold,
            addedBy: this.state.addedBy,
            itemDescription: this.state.brand + " " + this.state.itemModel + " " +
                this.state.processor + " " + this.state.ramSize + " " + this.state.hddSize + " " +
                this.state.generation + " " + this.state.itemType
        }
        tempCart.push(item)

        this.setState(
            {
                ...this.state,
                cart: tempCart,
            }
        )
        console.log(this.state.cart)

    }
    deleteItem = (indx) => {
        let tempCart = this.state.cart
        let finalCart = tempCart.filter((item, index) => {
            return index !== indx
        })
        this.setState(
            {
                ...this.state,
                cart: finalCart,

            }
        )
    }
    saveToDatabase = () => {
        let supposedInventory = this.state.cart
        axios.post(url.url + "/saveInventory", supposedInventory)
            .then(result => {
                console.log(result)
                alert("Item Added to Inventory")
                this.setState({
                    ...this.state,
                   // itemType: '',
                    brand: '',
                    itemModel: '',
                    processor: '',
                    ramSize: '',
                    hddSize: '',
                    quantity: '',
                    unitPrice: '',
                    generation: '',
                    quantitySold: 0,
                    cart: []
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    printCart = () => {
        let cart = this.state.cart
        //console.log(cart)
        return cart.map((item, index) => {
            let { itemType, brand, itemModel, processor, ramSize, hddSize, quantity, unitPrice, generation } = item
            return <tr>
                <td>{index + 1}</td>
                <td key={index}> {quantity + brand + itemModel + processor + ramSize + hddSize + itemType + generation}</td>
                <td> {quantity * unitPrice} </td>
                <td>
                    <button type='button' onClick={() => this.deleteItem(index)} className='btn btn-danger'>X</button>
                </td>
            </tr>
        })

    }

    render() {
        return <div className='container'>
            <div className='row'>
                <div className='col-5 card'>
                    {//first div for inputs
                    }
                    <div className='card-header bg-info'> Adding to Inventory</div>
                    <div className='row'>
                        <div className='col-3 '>Shipment Code:</div>
                        <div className='col-8'>
                            <input className='form-control' type="date" name="shipmentCode" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 '>Item Type:</div>
                        <div className='col-8'>
                            <select className="form-control" value={this.state.itemType} name='itemType' onChange={this.handleChange} >
                                <option value="Laptop">Laptop</option>
                                <option value="Tower">Tower</option>
                                <option value="Desktop">Desktop</option>
                                <option value="All-in-one">All-in-one</option>
                                <option value="Monitor">Monitor</option>
                                <option value="Labtop Charger">Labtop Charger</option>
                                <option value="TV">TV</option>
                                <option value="RAM">RAM</option>
                                <option value="HDD">HDD</option>
                                <option value="Projector">Projector</option>
                                <option value="Keyboard">Keyboard</option>
                                <option value="Printer">Printer</option>
                                <option value="Mouse">Mouse</option>
                                <option value="Power Cable">Power Cable</option>
                                <option value="VGA/Display Cable">VGA/Display Cable</option>
                                <option value="Other Accessories">Other Accessories</option>
                                <option value="Monitor Stand">Monitor Stand</option>
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 '>Brand:</div>
                        <div className='col-8'>
                            <select className="form-control" value={this.state.brand} name='brand' onChange={this.handleChange} >
                                <option> </option>
                                <option>Dell</option>
                                <option>HP</option>
                                <option>Lenovo</option>
                                <option>Apple</option>
                                <option>Acer</option>
                                <option>Asus</option>
                                <option>Microsoft</option>
                                <option>Toshiba</option>
                                <option>Phillips</option>
                                <option>Sony</option>
                                <option>Gateway</option>
                                <option>Nobilise</option>
                                <option>IBM</option>
                                <option>MSI</option>
                                <option>Samsung</option>
                                <option>Antect</option>
                                <option>Alienware</option>
                                <option>Transource</option>
                                <option>Epson</option>
                                <option>Canon</option>
                                <option>Xerox</option>
                                <option>Nec</option>
                                <option>LG</option>
                                <option>HCL</option>
                                <option>Others</option>
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 '>Item Model:</div>
                        <div className='col-8'>
                            <input className='form-control' value={this.state.itemModel} type="text" name="itemModel" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 '>Processor:</div>
                        <div className='col-8'>
                            <select className="form-control" value={this.state.processor} name='processor' onChange={this.handleChange}>
                                <option></option>
                                <option>pentium 4</option>
                                <option>pentium</option>
                                <option>Celeron</option>
                                <option>Core 2</option>
                                <option> i3</option>
                                <option> i5</option>
                                <option> i7</option>
                                <option> i9</option>
                                <option> Xeon</option>
                                <option>AMD</option>
                                <option>AMD E1</option>
                                <option>AMD A4</option>
                                <option>AMD A6</option>
                                <option>AMD A8</option>
                                <option>AMD A9</option>
                                <option>AMD A12</option>
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 '>Ram_Size:</div>
                        <div className='col-8'>
                            <select className="form-control" value={this.state.ramSize} name="ramSize" onChange={this.handleChange}>
                                <option> </option>
                                <option>1GB</option>
                                <option>2GB</option>
                                <option>3GB</option>
                                <option>4GB</option>
                                <option>5GB</option>
                                <option>6GB</option>
                                <option>8GB</option>
                                <option>12GB</option>
                                <option>16GB</option>
                                <option>24GB</option>
                                <option>32GB</option>
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 '>HDD_Size:</div>
                        <div className='col-8'>
                            <select className="form-control" value={this.state.hddSize} name="hddSize" onChange={this.handleChange}>
                            <option> </option>
                                <option>SSD</option>
                                <option>HDD</option>
                                <option>60GB</option>
                                <option>100GB</option>
                                <option>118GB</option>
                                <option>120GB</option>
                                <option>128GB</option>
                                <option>150GB</option>
                                <option>160GB</option>
                                <option>180GB</option>
                                <option>200GB</option>
                                <option>240GB</option>
                                <option>250GB</option>
                                <option>500GB</option>
                                <option>512GB</option>
                                <option>750GB</option>
                                <option>1000GB</option>
                                <option>1TB</option>
                                <option>2TB</option>
                                <option>3TB</option>
                                <option>4TB</option>
                                <option>5TB</option>
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 '>Generation:</div>
                        <div className='col-8'>
                            <select className="form-control" value={this.state.generation} name="generation" onChange={this.handleChange}>
                                <option> </option>
                                <option>1st gen</option>
                                <option>2nd/3rd gen</option>
                                <option>4th gen</option>
                                <option>5th gen</option>
                                <option>6th gen</option>
                                <option>7th gen</option>
                                <option>8th gen</option>
                                <option>9th gen</option>
                                <option>10th gen</option>
                                <option>11th gen</option>
                                <option>12th gen</option>
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 '> Quantity:</div>
                        <div className='col-8'>
                            <input className='form-control' value={this.state.quantity} type="number" name="quantity" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3 '>Unit Price:</div>
                        <div className='col-8'>
                            <input className='form-control' value={this.state.unitPrice} type="number" name="unitPrice" onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-3'></div>
                        <div className='col-8'> <br />
                            <button onClick={this.addItem} type="button" className="btn btn-primary btn-block">Add To Cart</button>
                        </div>
                    </div>
                </div>
                <div className='col-7 card'>
                    <table>
                        <thead className='card-header bg-info'>
                            <tr>
                                <th><h2>Items to be added to Inventory</h2> </th>
                                <th>
                                    <button onClick={this.saveToDatabase} type="button" className="btn btn-dark btn-block">Save to Database</button>
                                </th>
                            </tr>
                        </thead>
                    </table>
                    <hr />
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Item_Description</th>
                                <th>Total_Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.printCart()
                            }
                        </tbody>
                    </table>
                </div>
            </div>



        </div>
    }
}