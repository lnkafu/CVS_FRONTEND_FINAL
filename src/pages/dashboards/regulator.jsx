
import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom';
import ProfileComponent from '../../components/profile/profile.component'
import ViewInventoryComponent from '../../components/viewInventory/viewInventory.component';
import AddToPreInvenotryComponent from '../../components/savingToInventory/AddToPreInventory.component';
import UpdatePreInventoryComponent from '../../components/updateInventory/updatePreInventory.component';
import PromotePreInventoryToInventoryComponent from '../../components/updateInventory/PromotePreInventoryToInventory.component';

class RegulatorDashBoard extends React.Component {
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
                <Tab eventKey="viewCurrentInventory" title="View Current Inventory">
                    <ViewInventoryComponent />
                </Tab>
                <Tab eventKey="addToPreInventory" title="Add Inventory To PreInventory">
                    <AddToPreInvenotryComponent />
                </Tab>
                <Tab eventKey="viewPreInventory" title="View/Update Inventory PreInventory">
                    <UpdatePreInventoryComponent />
                </Tab>
                <Tab eventKey="promotePreInventory" title="Promote PreInventory to Inventory">
                    <PromotePreInventoryToInventoryComponent />
                </Tab>
                <Tab eventKey="profile" title="Profile" >
                    {this.processUser()}
                </Tab>
            </Tabs>
        </div>
    }
}

export default withRouter(RegulatorDashBoard);