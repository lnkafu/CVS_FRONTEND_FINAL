

import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import './style.scss'
import backgroundImg from '../../images/background.jpg'
import axios from 'axios'
import url from '../config/url'

export default class PerformSaleComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false,
            showFinalizeModal: false,
            itemType: '',
            brand: '',
            itemModel: '',
            processor: '',
            ramSize: '',
            hddSize: '',
            quantity: '',
            unitPrice: '',
            generation: '',
            cart: [],
            laptopBrandVisibility: true,
            currentItem: null,
            currentItemSupposedPrice: 0,
            searchCustomer: '',
            showSearchCustomerModal: false,
            customer: null,
            total: 0,
            inventory: [],
            customers: [],
            soldItemsSaved: '',
            user: ''
        }

        this.handleChange = this.handleChange.bind(this);


    }
    inventory = require('../../testData/inventory')
    // customers = require('../../testData/customers')
    cus = ['larry', 'paul', 'luis']


    inventory2 = async () => {
        await axios.get(url.url + "/getInventories")
            .then(result => {
                var inventoryTemp = result.data.Data
                console.log(inventoryTemp)
                return inventoryTemp
            })
            .catch(err => {
                console.log('err occurred ', err)
            })
    }
    //inventory = this.inventory2



    handleChange = async (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;
        if (value === 'All Brands') {
            this.setState({ ...this.state, brand: '' })
        } else {
            await this.setState({
                ...this.state,
                [name]: value
            });
        }
    }

    saveChosenCustomer = async (cus) => {
        if (cus != null) {
            await this.setState({ ...this.state, customer: cus })
            this.handleCloseSearchCustomer()
        }
    }
    displayChosenCustomer = () => {
        if (this.state.customer != null) {
            return <tr>
                <td> <b>Customer Name:</b> {this.state.customer.name}</td>
                <td> <b>Phone Number:</b> {this.state.customer.phoneNumber} </td>
            </tr>

        }
    }
    printCustomers = () => {
        // console.log('customers are: ', this.state.customers)
        return this.state.customers.map((customer, index) => {
            if (customer.name.toLowerCase().includes(this.state.searchCustomer.toLowerCase())) {
                return <tr key={index}>
                    <td>{customer.name}</td>
                    <td>{customer.phoneNumber}</td>
                    <td><button className='btn btn-primary' onClick={() => this.saveChosenCustomer(customer)} >Select</button> </td>
                </tr>
            }
        })
    }

    laptopBrand = () => {
        return <td>
            <div className='row'>
                <div className='col-12' >
                    <select className="form-control" name='brand' onChange={this.handleChange} >
                        <option>Select Brand</option>
                        <option>All Brands</option>
                        <option>Dell</option>
                        <option>HP</option>
                        <option>Lenovo</option>
                        <option>Apple</option>
                        <option>Acer</option>
                        <option>Asus</option>
                        <option>Toshiba</option>
                        <option>Phillips</option>
                        <option>Sony</option>
                        <option>Gateway</option>
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
                        <option>Unknown</option>
                    </select>
                </div>
            </div>
        </td>
    }

    addItem = async (item) => {
        // console.log(item)
        let tempItem = { ...item }
        let cart = this.state.cart
        let tempCart = []
        let containsItem = false
        if (cart.length === 0) {
            tempItem.quantity = 1
            tempCart.push(tempItem)
        } else {
            await cart.map(itm => {
                if (itm.itemID === tempItem.itemID) {
                    itm.quantity = itm.quantity + 1
                    tempCart.push(itm)
                    containsItem = true
                } else {
                    tempCart.push(itm)
                }
            })
            if (containsItem === false) {
                tempItem.quantity = 1
                tempCart.push(tempItem)
            }
        }
        await this.setState({
            ...this.state,
            cart: tempCart
        });
        // console.log(this.state.cart)
    }

    handleDelete = (indx) => {
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

    pricingForItem = (itm) => {
        if (itm.salesPrice === undefined || itm.salesPrice === 0) {
            return <button className='btn btn-primary' onClick={() => this.handleShow(itm)}>Add Price</button>
        }
        else {
            return itm.salesPrice + ' frs'
        }
    }

    showItemTotal = (itm) => {
        if (itm.salesPrice === undefined || itm.salesPrice === 0) {
            return 0
        }
        return itm.quantity * itm.salesPrice
    }
    printCart = () => {
        // console.log(this.state.cart)
        return this.state.cart.map((itm, index) => {
            return <tr key={index}>
                <td>{index + 1}</td>
                <td>{itm.itemID}</td>
                <td>{itm.itemDescription}</td>
                <td>{itm.quantity}</td>
                <td>
                    {this.pricingForItem(itm)}
                </td>
                <td>
                    {this.showItemTotal(itm)} frs
                </td>
                <td>
                    <button className='btn btn-danger' onClick={() => this.handleDelete(index)}>X</button>
                </td>
            </tr>
        })
    }

    componentDidMount() {
        let data = sessionStorage.getItem('user')
        if (data != null) {
            data = JSON.parse(data)
            //console.log('User is', data)
            this.setState({ ...this.state, addedBy: data.lastName + " " + data.firstName })
        }

        document.title = 'Perform Sale'
        axios.get(url.url + "/getInventories")
            .then(result => {
                var inventoryTemp = result.data.Data
                this.setState({ ...this.state, inventory: inventoryTemp })
            })
            .catch(err => {
                console.log('err occurred ', err)
            })

        axios.get(url.url + "/customers")
            .then(result => {
                // console.log('customers got on front end')
                var customersTemp = result.data.Data
                this.setState({ ...this.state, customers: customersTemp })
            })
            .catch(err => {
                console.log('err occurred getting customers', err)
            })
    }

    printInventory = (neededItemType, neededBrand) => {
        let inventory = []
        // console.log('inventory is ', this.state.inventory)

        return this.state.inventory.map((item, index) => {
            // return this.inventory.map((item, index) => {
            if (item.itemType === neededItemType && this.state.brand === '') {
               
                return <tr key={index}>
                    <td key={index}>{index + 1}</td>
                    <td >{item.itemID}</td>
                    <td >{item.shipmentCode}</td>
                    <td>{item.itemDescription}  </td>
                    <td>{item.quantity}</td>
                    <td>{item.quantitySold}</td>
                    <td>
                        <button type='button' onClick={() => this.addItem(item)} className='btn btn-primary'>+</button>
                    </td>
                </tr>
            } else if (item.itemType === neededItemType && item.brand === this.state.brand) {
                return <tr key={index}>
                    <td key={index}>{index + 1}</td>
                    <td >{item.itemID}</td>
                    <td >{item.shipmentCode}</td>
                    <td>{item.itemDescription}  </td>
                    <td>{item.quantity}</td>
                    <td>
                        <input type="number" name="sellingPrice" id="" onChange={this.handleChange} />
                    </td>
                    <td>
                        <button type='button' onClick={() => this.addItem(item)} className='btn btn-primary'>+</button>
                    </td>
                </tr>
            }
        })
    }

    //***** For handling Modal to add price for an item to be sold ******
    handleClose = () => {
        this.setState({ ...this.state, show: false })
    };
    handleShow = (item) => {
        this.setState({ ...this.state, show: true, currentItem: item })
    };
    handleSavePrice = () => {
        let updateItem = this.state.currentItem
        updateItem.salesPrice = this.state.currentItemSupposedPrice
        //console.log(updateItem)
        this.setState({ ...this.state, show: false })
    }
    //***** End Modal functions for adding price to an item *****


    //***** Modal functions to finalize a customer's purchase ****
    handleCloseFinalizePurchase = () => {
        this.setState({ ...this.state, showFinalizeModal: false })
    };
    handleShowFinalizePurchase = () => {
        this.setState({ ...this.state, showFinalizeModal: true })
    };



    printCustomerOnReceipt = () => {
        if (this.state.customer != null) {
            return <tr>
                <td><b>Customer Name:</b> {this.state.customer.name}</td>
                <td><b>Phone Number1:</b> {this.state.customer.phoneNumber}</td>
            </tr>
        }
    }



    reviewPurchase = () => {

        let subTotal = 0
        let total = 0
        let itemsSoldDescription = ' '
        let cart = this.state.cart.map((item, index) => {
            subTotal = item.quantity * item.salesPrice
            total += subTotal
            itemsSoldDescription = itemsSoldDescription + item.quantity + ' ' + item.itemDescription + ' - '
            return <tr key={index}>
                <td>{item.quantity} {item.itemDescription} </td>
                <td>{subTotal}frs</td>
            </tr>
        })

        return <div>
            <h5>Check the below information for accuracy and completeness. Once transaction is saved, it cannot be undone</h5>
            <h6>Below are the items which the customer wishes to purchase</h6>
            <table className='table table-bordered'>
                <tbody>
                    {
                        this.printCustomerOnReceipt()
                    }

                </tbody>
            </table>
            <table className='table table-bordered'>
                <tbody>
                    {
                        cart
                    }
                </tbody>
            </table>

        </div>
    }


    reset = () => {
        this.setState({
            ...this.state,
            itemType: '',
            brand: '',
            itemModel: '',
            processor: '',
            ramSize: '',
            hddSize: '',
            quantity: '',
            unitPrice: '',
            generation: '',
            cart: [],
            laptopBrandVisibility: true,
            currentItem: null,
            currentItemSupposedPrice: 0,
            searchCustomer: '',
            showSearchCustomerModal: false,
            customer: null,
            total: 0,
           // inventory: [],
            //customers: [],
            soldItemsSaved: ''
        })
    }
    handleSavePurchase = () => {

        let total = 0
        let extractedCart = this.state.cart
        let itemsSoldDescription = ''
        console.log('cart is ', extractedCart)
        extractedCart.map((item, index) => {
            let subTotal = item.quantity * item.salesPrice
            total += subTotal
            itemsSoldDescription = itemsSoldDescription + item.quantity + ' ' + item.itemDescription + ' @' + item.salesPrice + ' - '

        })
        let finalSale = {
            total: total,
            soldBy: " ",
            customer: this.state.customer,
            soldItemsSummary: itemsSoldDescription,
            cart: extractedCart
        }

        var a = window.open('', '');

        axios.post(url.url + "/saveSale", finalSale)
            .then(result => {
               // console.log('sales posted', result)
               // this.setState({ ...this.state, soldItemsSaved: result.data.ItemsSold })

               this.reset()
                let soldItemsSaved = result.data.ItemsSold
                let itemsTemp = soldItemsSaved.itemsSoldSummary
                let items = []
                items = itemsTemp.split('-')


                //a.document.body.style.backgroundImage = `url(${backgroundImg})`;
                a.document.write('<html >');
                a.document.write(`<body class='printDivContent' style='background-image: url(${backgroundImg})'> <br>`);

                a.document.write('<h3 align="center"> Computer Village Store </h3>');
                a.document.write(`<h4 align="center"> Située au COLLEGE L'AGAPE CITE CICAM, Tel: (+237) 679 700 008 / 657 951 753</h4>`);
                a.document.write(`<h5 align="center"> Merci Pour Votre Achat/ Thank You For Your Purchase.  </h5>`);

                a.document.write(`<hr>`);

                a.document.write('<table >');
                a.document.write('<tr>');
                a.document.write(`<td><u>Confirmation Number</u>: <i> ${soldItemsSaved.confirmationNumber} </i>  </td>  `);
                a.document.write(`<td><u>Nom Du Client (Customer Name)</u>: <i>${soldItemsSaved.customerName} </i>  </td>  `);
                a.document.write(`<td><u>Contact</u>: <i> ${soldItemsSaved.customerNumber} </i> </td>`);
                a.document.write('</tr>');
                a.document.write('</table>');
                a.document.write('<br>');


                a.document.write('<table >');
                items.forEach(ele => {
                    if (ele !== " ") {
                        a.document.write(`<tr> <td>  ${ele}frs </td>  </tr>`);
                    }
                })
                a.document.write('</table>');

                a.document.write(`<p> <b>Total</b> ${soldItemsSaved.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} frs </p>`);

                a.document.write(`</body>`);

                a.document.write(`<hr>`);

                a.document.write('<footer>');
                a.document.write('<p>Votre entreprise est très appréciée. Nous espérons vous revoir bientôt. Pour la validité de cet achat, veuillez nous contacter avec votre numéro de confirmation. </p>');
                a.document.write('<p>Your business is highly appreciated. We hope to see you again. For validity of this purchase, please contact us with your confirmation number. </p>');
               
                a.document.write(`<p> Vendu par/ (Sold By): ${this.state.user}</p>`);
               
                a.document.write('</footer>');
                a.document.write('</html >');
                a.document.close();
                a.print();

            })
            .catch(err => {
                console.log('err occurred ', err)
                alert('Sales Not Saved')
            })




        this.setState({ ...this.state, showFinalizeModal: false })
    }
    //**** End of Modal functions to finalize a customer's purchase *****



    //***** Modal functions to search a customer by name or phone number ****
    handleCloseSearchCustomer = () => {
        this.setState({ ...this.state, showSearchCustomerModal: false })
    };
    handleShowSearchCustomer = () => {
        this.setState({ ...this.state, showSearchCustomerModal: true })
    };
    handleChosenCustomer = () => {
        // let updateItem = this.state.currentItem
        // updateItem.salesPrice = this.state.currentItemSupposedPrice

        this.setState({ ...this.state, showSearchCustomerModal: false })
    }
    //**** End of Modal functions to search a customer by name or phone number *****


    printCartTotal = () => {
        let total = 0
        this.state.cart.map(itm => {
            if (itm.salesPrice === undefined) { }
            else {
                total = total + itm.salesPrice * itm.quantity
            }


        })
        return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    render() {
        return <div >
            <div>{
                //Modal. This will be used as popup to assign price to an item
            }



                <Modal animation={false} show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header >
                        <Modal.Title>Adding item price</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input className='form-control' type="Number" name='currentItemSupposedPrice' placeholder='Enter item price' onChange={this.handleChange} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSavePrice}>
                            Save Price
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal className='printDev' animation={false} show={this.state.showFinalizeModal} onHide={this.handleCloseFinalizePurchase} backdrop="static" size='lg'>
                    <Modal.Header >
                        <Modal.Title >Purchase Review. Check For Correctness</Modal.Title>
                    </Modal.Header>
                    <Modal.Body id='receiptBody'>
                        {
                            this.reviewPurchase()
                            //this.reviewPurchase()
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseFinalizePurchase}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSavePurchase}>
                            Save Purchase And Print Receipt
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal animation={false} show={this.state.showSearchCustomerModal} onHide={this.handleCloseSearchCustomer} backdrop="static" size='lg'>
                    <Modal.Header >
                        <Modal.Title>Chose Customer from the List of Customers</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Customer Name</th>
                                    <th>Phone Number</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.printCustomers()
                                }
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseSearchCustomer}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className='row mx-2'>
                    <div className='col-5 card'>
                        <div className='card-header bg-info'><b>Search Item Needed For Purchase</b></div>
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className='row'>
                                            <div className='col-12'>
                                                <select className="form-control" name='itemType' onChange={this.handleChange} >
                                                    <option>Select Item type</option>
                                                    <option>Laptop</option>
                                                    <option>Desktop</option>
                                                    <option>Monitor</option>
                                                    <option>TV</option>
                                                    <option>Projector</option>
                                                    <option>Keyboard</option>
                                                    <option>Printer</option>
                                                    <option>Mouse</option>
                                                    <option>Power Cable</option>
                                                    <option>VGA/Display Cable</option>
                                                    <option>Other Accessories</option>
                                                    <option>Monitor Stand</option>
                                                </select>
                                            </div>
                                        </div>
                                    </td>
                                    {this.laptopBrand()}
                                </tr>
                            </tbody>
                        </table>

                        <br />
                        <div className='row'>
                            <div className='card-header bg-info'><b>Current Inventory</b></div>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Item ID</th>
                                        <th>Shipment Date</th>
                                        <th>Item Description</th>
                                        <th>Initial Stock</th>
                                        <th>Sold</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.printInventory(this.state.itemType, this.state.brand)}
                                </tbody>
                            </table>

                        </div>
                    </div>

                    <div className='col-7 '>
                        <div className='card-header bg-primary'>
                            <div className="input-group mb-3">
                                <input type="text" name='searchCustomer' onChange={this.handleChange} className="form-control" placeholder="Search Customer by Name or Phone Number" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-dark" type="button" onClick={this.handleShowSearchCustomer}>Search</button>
                                </div>

                            </div>
                        </div>
                        <div className='card-header bg-success'>
                            <table className='table '>
                                <tbody>
                                    {this.displayChosenCustomer()}
                                </tbody>
                            </table>
                        </div>
                        <div className='card-header bg-info'>

                            <b style={{ float: 'left' }}>Total: {this.printCartTotal()}frs</b>
                            <button style={{ float: 'right' }} className=' btn-primary' onClick={this.handleShowFinalizePurchase}>Review Purchase</button>
                            <br />
                        </div>

                        <table className='table table-striped table-dark'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Item ID</th>
                                    <th>Item Description</th>
                                    <th>Qty</th>
                                    <th>Unit Price</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.printCart()}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div><br />

        </div>
    }
}