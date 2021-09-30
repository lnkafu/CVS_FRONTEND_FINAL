import React from 'react'
import LoginComponent from '../../components/login/login.component'
import backgroundImg from '../../images/img4.jpg'

var bg = {
    backgroundImage: `url(${backgroundImg})`,
    height:"100vh",
    backgroundRepeat: 'no'
}

var bg2 = {
    height:"100vh"
}

export default class LoginPage extends React.Component {

    render() {
        return <div className='container'>
            <div className='row'>
                <div className='col-6' style={bg}></div> 
                <div className='col-6'  style={bg2}> <br />
                    <div className=' card d-flex justify-content-center align-middle'> 
                        <div className='card-header bg-info'>
                            <h3 className='align-middle'> <b>Enter Login Credentials To Continue</b> </h3>
                        </div>
                        <div className='card-body'>
                            <LoginComponent />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    }
}