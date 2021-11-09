
import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import AddCustomerComponent from '../../components/customer/addCustomer.component'
import ViewCustomersComponent from '../../components/customer/viewCustomers.component'
import PerformSaleComponent from '../../components/performSale/performSale.component'
import AddToInventoryComponent from '../../components/savingToInventory/AddToInventory.component'
import ViewSaleComponent from '../../components/viewSale.component'
import { withRouter, Link } from 'react-router-dom';
import ProfileComponent from '../../components/profile/profile.component'
import ViewInventoryComponent from '../../components/viewInventory/viewInventory.component'
import UpdateInventoryComponent from '../../components/updateInventory/updateInventory.component'
import AddToPreInvenotryComponent from '../../components/savingToInventory/AddToPreInventory.component'
import UpdatePreInventoryComponent from '../../components/updateInventory/updatePreInventory.component'
import ViewTransactionsComponent from '../../components/transaction/viewTransactions.component'
import TransactionComponent from '../../components/transaction/transaction.component'
import AccountingAnalysisComponent from '../../components/transaction/accountingAnalysis'

class ManagerDashBoard extends React.Component {
    constructor(props) {
        super(props)
        const { history } = this.props
        let data = sessionStorage.getItem('user')
        data = JSON.parse(data)
        if (!data) history.push('/Login')
        this.state = {
            user: data
        }
    }

    processUser = () => {
        const { history } = this.props
        let user = this.state.user
        if (user === null) history.push('/Login')
        else {
            return <div>
                <ProfileComponent user={user} />
            </div>
        }
    }

    logout = () => {
        const { history } = this.props
        history.push('/Login')
        sessionStorage.clear();
    }

    getDate = () => {
        const dateObj = new Date()
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let year = dateObj.getFullYear()
        let month = months[dateObj.getMonth()]
        let day = dateObj.getDate()
        let date = month + ' ' + day + ', ' + year
        return date
    }

    getWelcomeGreeting = () => {
        if (this.state.user !== null && this.state.user.firstName !== null) {
            return <div>
                <h6>Welcome: {this.state.user.firstName} , {this.state.user.lastName}</h6>
            </div>
        }

    }

    render() {
        const { history } = this.props
        //console.log('history is: ', history)
        return <div >
            <div className=' text-primary bg-dark'>
                <div className='table'>
                    <thead className='text-primary'>
                        <tr>
                            <th><h2><b>Computer Village Store</b></h2></th>
                        </tr>

                    </thead>
                </div>
            </div>
            <div className='row'>
                <div className='col-4'>
                    {this.getWelcomeGreeting()}
                </div>
                <div className='col-4'>
                    <h6>Date: {this.getDate()} </h6>
                </div>
                <div className='col-4'>
                    <button className=' btn-danger ' onClick={this.logout}> Logout</button>
                </div>
                <hr />
            </div>
            <Tabs animation="false" defaultActiveKey="performSale" id="uncontrolled-tab-example" className="mb-3">


                <Tab eventKey="mysales" title="Sales">
                    <Tabs animation="false" defaultActiveKey="performSale" className="mb-3">
                        <Tab eventKey="performSale" title="Perform Sale">
                            <PerformSaleComponent />
                        </Tab>
                        <Tab eventKey="viewSales" title="View Sales">
                            <ViewSaleComponent />
                        </Tab>
                    </Tabs>
                </Tab>
                <Tab eventKey="inventory" title="Inventory">
                    <Tabs animation="false" defaultActiveKey="currentInventory" className="mb-3">
                        <Tab eventKey="currentInventory" title="Current Inventory">
                            <ViewInventoryComponent />
                        </Tab>
                        <Tab eventKey="addToPreInventory" title="Add To PreInventory">
                            <AddToPreInvenotryComponent />
                        </Tab>
                        <Tab eventKey="viewPreInventory" title="View/Update PreInventory">
                            <UpdatePreInventoryComponent />
                        </Tab>
                    </Tabs>
                </Tab>
                <Tab eventKey="customer" title="Customer">
                    <Tabs animation="false" defaultActiveKey="viewCustomer" className="mb-3">
                        <Tab eventKey="addCustomer" title="Add Customer">
                            <AddCustomerComponent />
                        </Tab>
                        <Tab eventKey="viewCustomer" title="View Customer">
                            <ViewCustomersComponent />
                        </Tab>
                    </Tabs>
                </Tab>

                <Tab eventKey="transaction" title="Transaction/Accounting">
                    <Tabs animation="false" defaultActiveKey="viewCustomer" className="mb-3">
                        <Tab eventKey="viewTransactions" title="View Transactions">
                            <ViewTransactionsComponent />
                        </Tab>
                        <Tab eventKey="addTransactions" title="Add Transactions">
                            <TransactionComponent />
                        </Tab>
                        <Tab eventKey="accountingAnalysis" title="Accounting Analysis">
                            <AccountingAnalysisComponent />
                        </Tab>
                    </Tabs>
                </Tab>
                

                <Tab eventKey="profile" title="Profile" >
                    {this.processUser()}

                </Tab>
            </Tabs>
        </div>
    }
}

export default withRouter(ManagerDashBoard);