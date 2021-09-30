
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import RegisterComponent from './components/register/register.component';
import AddToCartComponent from './components/addToCart/AddToCart.component';
import PerformSaleComponent from './components/performSale/performSale.component';
import MyModal from './testData/modal.component';
import LoginPage from './pages/loginPage/loginpage';
import AdminDashBoard from './pages/dashboards/admin';
import ManagerDashBoard from './pages/dashboards/manager';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/Register'>
          <RegisterComponent />
        </Route>
        <Route path='/AddToCart'>
          <AddToCartComponent />
        </Route>
        <Route path='/PerformSale'>
          <PerformSaleComponent />
        </Route>
        <Route path='/Modal'>
          <MyModal />
        </Route>
        <Route path='/Login'>
          <LoginPage />
        </Route>
        <Route path='/AdminDashboard'>
          <AdminDashBoard />
        </Route>
        <Route path='/ManagerDashboard'>
          <ManagerDashBoard />
        </Route>
        <Redirect exact path="/" to ='Login'>
          <LoginPage />
        </Redirect>
      </Switch>
    </Router>
  );
}

export default App;
