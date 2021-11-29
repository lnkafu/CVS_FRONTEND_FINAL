
import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom';
import ProfileComponent from '../../components/profile/profile.component'
import AddToInventoryEnRouteComponent from '../../components/savingToInventory/InventoryEnRoute.component'
import UpdateInventoryEnRouteComponent from '../../components/updateInventory/updateInventoryEnRoute.component'
import PromoteInventoryEnRouteComponent from '../../components/updateInventory/PromoteInventoryEnRoute.component'
import ViewInventoryEnRouteComponent from '../../components/viewInventory/ViewInventoryEnRoute.component';

class InvestorDashBoard extends React.Component {
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
            <Tabs animation="false" defaultActiveKey="InventoryEnRoute" id="uncontrolled-tab-example" className="mb-3">

                <Tab eventKey="InventoryEnRoute" title="Inventory En Route">
                    <Tabs animation="false" defaultActiveKey="addInventoryEnRoute" className="mb-3">
                        <Tab eventKey="addInventoryEnRoute" title="Add Inventory En Route">
                            <AddToInventoryEnRouteComponent />
                        </Tab>
                        <Tab eventKey="viewInventoryEnRoute" title="View/Update Inventory En Route">
                            <ViewInventoryEnRouteComponent/>
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

export default withRouter(InvestorDashBoard);