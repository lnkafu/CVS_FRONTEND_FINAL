
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import RegisterComponent from './components/register/register.component';
import AddToCartComponent from './components/addToCart/AddToCart.component';
import PerformSaleComponent from './components/performSale/performSale.component';
import MyModal from './testData/modal.component';
import LoginPage from './pages/loginPage/loginpage';
import AdminDashBoard from './pages/dashboards/admin';
import ManagerDashBoard from './pages/dashboards/manager';
import InvestorDashBoard from './pages/dashboards/investor';
import RegulatorDashBoard from './pages/dashboards/regulator';
import ViewInventoryEnRouteComponent from './components/viewInventory/ViewInventoryEnRoute.component';
import ViewInventoryEnRouteCustomerVersionComponent from './components/viewInventory/ViewInventoryEnRoute.componentCustomerVersion';

function App() {
  return (
    <Router>
      <Switch>
        
        <Route path='/Login'>
          <LoginPage />
        </Route>
        <Route path='/AdminDashboard'>
          <AdminDashBoard />
        </Route>
        <Route path='/ManagerDashboard'>
          <ManagerDashBoard />
        </Route>
        <Route path='/InvestorDashboard'>
          <InvestorDashBoard />
        </Route>
        <Route path='/RegulatorDashboard'>
          <RegulatorDashBoard />
        </Route>
        <Route path='/InventoryEnRoute'>
          <ViewInventoryEnRouteCustomerVersionComponent />
        </Route>
        <Redirect exact path="/" to ='Login'>
          <LoginPage />
        </Redirect>
      </Switch>
    </Router>
  );
}

export default App;
