
import React from 'react'
import axios from 'axios'
import url from './config/url'

export default class ViewSaleComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            sales: [],
            searchField: '',
            total: 0
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
    calculateTotal = () => {
        let total = 0
        this.state.sales.forEach(item => {
            total = total + item.total
        })
        return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'frs'
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
                    <td>{item.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} frs</td>
                    <button className='btn btn-success' onClick={() => this.printReceiptCopy(item)}> Print</button>
                </tr>
            })
        } else {
            return sales.reverse().map((item, index) => {
                if (item.customerName.toLowerCase().includes(this.state.searchField.toLowerCase()) || item.itemsSoldSummary.toLowerCase().includes(this.state.searchField.toLowerCase())) {
                    return <tr key={index} >
                        <td>{item.date}</td>
                        <td>{item.confirmationNumber}</td>
                        <td>{item.customerName}</td>
                        <td>{item.customerNumber}</td>
                        <td>{item.itemsSoldSummary}</td>
                        <td>{item.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} frs</td>
                        <button className='btn btn-success' onClick={() => this.printReceiptCopy(item)}> Print</button>
                    </tr>
                }

            })
        }


    }

    componentDidMount() {
        axios.get(url.url + "/getSales")
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
    reGetSales = () => {
        axios.get(url.url + "/getSales")
            .then(result => {
                var salesTemp = result.data.Sales
                this.setState({ ...this.state, sales: salesTemp })
                // console.log('salesTemp is ', salesTemp)
            })
            .catch(err => {
                console.log('err occurred ', err)
            })
    }
    printReceiptCopy = (result) => {
        // let soldItemsSaved = result.data.ItemsSold
        let itemsTemp = result.itemsSoldSummary

        console.log(result)
        let items = []
        items = itemsTemp.split('-')

        var a = window.open('', '');

        //a.document.body.style.backgroundImage = `url(${backgroundImg})`;
        a.document.write('<html >');
        a.document.write(`<body class='printDivContent' > <br>`);

        a.document.write('<h3 align="center"> Computer Village Store </h3>');
        a.document.write(`<h5 align="center"> Située au COLLEGE L'AGAPE CITE CICAM, Tel: (+237) 679 700 008 / 657 951 753</h5>`);
        a.document.write(`<p align="center"> <b> Merci Pour Votre Achat/ Thank You For Your Purchase. </b>  </p>`);

        a.document.write(`<hr>`);

        a.document.write('<table >');
        a.document.write('<tr>');
        a.document.write(`<td><u>Confirmation Number</u>: <i> ${result.confirmationNumber} </i>  </td>  `);
        a.document.write(`<td><u>Nom Du Client (Customer Name)</u>: <i>${result.customerName} </i>  </td>  `);
        a.document.write(`<td><u>Contact</u>: <i> ${result.customerNumber} </i> </td>`);
        a.document.write('</tr>');
        a.document.write('</table>');
        a.document.write('<br>');


        a.document.write('<table >');
        items.forEach(ele => {
            if (ele !== " ") {
                a.document.write(`<tr> <td> -  ${ele}frs </td>  </tr>`);
            }
        })
        a.document.write('</table>');

        a.document.write(`<p> <b>Total</b> ${result.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} frs </p>`);

        a.document.write(`</body>`);

        a.document.write(`<hr>`);

        a.document.write('<footer>');
        a.document.write('<p>Votre entreprise est très appréciée. Nous espérons vous revoir bientôt. Pour la validité de cet achat, veuillez nous contacter avec votre numéro de confirmation. </p>');
        a.document.write('<p>Your business is highly appreciated. We hope to see you again. For validity of this purchase, please contact us with your confirmation number. </p>');

        a.document.write(`<p> Vendu par/ (Sold By): ${result.soldBy}</p>`);
        a.document.write(`<p> Date: ${result.date}</p>`);
        a.document.write('</footer>');
        a.document.write('</html >');
        a.document.close();
        a.print();

    }

    render() {
        return <div className='row mx-2'>
            <div className='card-header bg-info mx-2'>
                <h4> SALES PERFORMED
                    <button className='btn btn-dark btn-rounded' onClick={this.reGetSales}> Refresh List</button>
                    <div align= 'center'> Total: {this.calculateTotal()}</div>
                </h4>
                <div className="input-group">
                    <input type="text" name='searchField' onChange={this.handleChange} className="form-control" placeholder="Search Sale Record By Customer Name Or Items Sold" aria-describedby="basic-addon2" />
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
                            <th>Action</th>
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