
import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import PerformSaleComponent from '../../components/performSale/performSale.component'

export default class ManagerDashBoard extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        document.title = 'Manager Dashboard'
    }
    render() {
        return <div className='container'>
            <Tabs defaultActiveKey="performSale" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="performSale" title="Perform Sale">
                    <PerformSaleComponent />
                </Tab>
                <Tab eventKey="viewSales" title="View Sales">
                    <h3>second</h3>
                </Tab>
                <Tab eventKey="profile" title="Profile" >
                    <h3>Your Profile</h3>
                </Tab>
            </Tabs>
        </div>
    }
}