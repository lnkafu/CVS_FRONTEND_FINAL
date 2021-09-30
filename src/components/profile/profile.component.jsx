import React from 'react'

export default class ProfileComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            role: ''
        }
        

    }
  

    render() {
        let {user} = this.props
        let {firstName,username, lastName, email, phoneNumber, role} = user
       
        if (firstName === null || !firstName) {
            firstName = ' '
            lastName= ""
            email= ''
            phoneNumber= ''
            role= ''
            username = ''
        }
      
        return <div className='container'>

            <div className="input-group">
                <div className="input-group-prepend">
                    <div class="input-group-text" id="btnGroupAddon">First Name:</div>
                </div>
                <input type="text" class="form-control" value={firstName} name='firstName' aria-label="Input group example" aria-describedby="btnGroupAddon" onChange={this.handleChange} disabled />
            </div> <br />
            <div className="input-group">
                <div className="input-group-prepend">
                    <div class="input-group-text" id="btnGroupAddon">Last Name:</div>
                </div>
                <input type="text" class="form-control" value={lastName} name='lastName' aria-label="Input group example" aria-describedby="btnGroupAddon" onChange={this.handleChange} disabled />
            </div> <br />
            <div className="input-group">
                <div className="input-group-prepend">
                    <div class="input-group-text" id="btnGroupAddon">Username:</div>
                </div>
                <input type="text" class="form-control" value={username} name='username' aria-label="Input group example" aria-describedby="btnGroupAddon" onChange={this.handleChange} disabled />
            </div> <br />

            <div className="input-group">
                <div className="input-group-prepend">
                    <div class="input-group-text" id="btnGroupAddon">Phone Number:</div>
                </div>
                <input type="text" class="form-control" value={phoneNumber} name='phoneNumber' aria-label="Input group example" aria-describedby="btnGroupAddon" onChange={this.handleChange} disabled />
            </div> <br />
            <div className="input-group">
                <div className="input-group-prepend">
                    <div class="input-group-text" id="btnGroupAddon">Email:</div>
                </div>
                <input type="text" class="form-control" value={email} name='email' aria-label="Input group example" aria-describedby="btnGroupAddon" onChange={this.handleChange} disabled />
            </div> <br />
            <div className="input-group">
                <div className="input-group-prepend">
                    <div class="input-group-text" id="btnGroupAddon">Role:</div>
                </div>
                <input type="text" class="form-control" value={role} name='role' aria-label="Input group example" aria-describedby="btnGroupAddon" onChange={this.handleChange} disabled />
            </div> <br />
        </div>
    }
}