import React, { PureComponent } from 'react'
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios'
import url from '../config/url'

class LoginComponent extends PureComponent {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.login = this.login.bind(this);
        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        }
    }
    componentDidMount() {
        document.title = 'Login';
    }
    handleChange = (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;
        this.setState({
            ...this.state,
            [name]: value
        });
    }
    handleClick() {
        console.log('Click happened');
    }

    users = require('../../testData/users')
   

    login() {
        const { history } = this.props
        let payload = {
            "username": this.state.username,
            "password": this.state.password
        }
        axios.post(url.url+"/login", payload)
            .then(result => {
                console.log('result is: ', result.data)
                const user = result.data.user
                console.log('user is: ', user)
                //saving user in session storage
                sessionStorage.setItem('user',JSON.stringify(user))
                if (user.username === this.state.username && user.password === this.state.password && user.role === 'admin') {
                    console.log('inside admin and about to history.push')
                    history.push('/AdminDashboard')
                }
                else if (user.username === this.state.username && user.password === this.state.password && user.role === 'manager') {
                    history.push('/ManagerDashboard')
                }
                else if (user.username === this.state.username && user.password === this.state.password && user.role === 'investor') {
                    console.log('about to pust to investor dashboard')
                    history.push('/InvestorDashboard')
                }
                else if (user.username === this.state.username && user.password === this.state.password && user.role === 'stock regulator') {
                    console.log('about to pust to investor dashboard')
                    history.push('/InvestorDashboard')
                }
            })
            .catch(err => {
                this.setState({ ...this.state, errorMessage: '!!! Invalid Username or Password. Please try again' })
                console.log('Error occured', err)
            })
    }
    render() {

        return <div className='container'>
            <div className='align-middle'>
                <span className='text-danger'> {this.state.errorMessage}  </span>
            </div> <br />

            <div className="input-group">
                <div className="input-group-prepend">
                    <div class="input-group-text" id="btnGroupAddon">Username:</div>
                </div>
                <input type="text" class="form-control" placeholder="Enter username" name='username' aria-label="Input group example" aria-describedby="btnGroupAddon" onChange={this.handleChange} />
            </div> <br />
            <div className="input-group">
                <div className="input-group-prepend">
                    <div class="input-group-text" id="btnGroupAddon">Password:</div>
                </div>
                <input type="password" class="form-control" placeholder="Enter password" name='password' aria-label="Input group example" aria-describedby="btnGroupAddon" onChange={this.handleChange} />
            </div> <br />

            <button onClick={this.login} type="button" className="btn btn-info w-100">Login</button>
            <br />

            <Link className='d-flex justify-content-center'> Forgot password?</Link>
        </div>
    }
}


export default withRouter(LoginComponent);