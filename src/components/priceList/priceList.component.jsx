import React from 'react'

export default class PriceListComponent extends React.Component {

    constructor() {
        super()
        this.state = {
            firstGenLaptopi3: '',
            secondThirdGenLaptopi5: '',
            forthFifthGenLaptop: '',
            sixthGenLaptop: '',
            seventhGenLaptop: '',
            eightGenLaptop: '',


        }
    }
    render() {
        return <div className='row'>
            <div className='col-5  card'>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-5'>
                            <div className='table table-striped table-hover table-primary'>
                                <thead>
                                    <tr>
                                        <th> Laptop </th>
                                        <th> Base Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr >
                                        <td> 1st Gen i3</td>
                                        <td> 60,000 frs</td>
                                    </tr>
                                    <tr>
                                        <td> 1st Gen i5</td>
                                        <td> 65,000 frs</td>
                                    </tr>
                                    <tr>
                                        <td> 1st Gen i7</td>
                                        <td> 70,000 frs</td>
                                    </tr>
                                    <tr>
                                        <td> 2nd/3rd Gen i3</td>
                                        <td> 60,000 frs</td>
                                    </tr>
                                    <tr>
                                        <td> 2nd/3rd Gen i5</td>
                                        <td> 70,000 frs</td>
                                    </tr>
                                    <tr>
                                        <td> 2nd/3rd Gen i7</td>
                                        <td> 80,000 frs</td>
                                    </tr>
                                    <tr>
                                        <td> 4th/5th Gen i3</td>
                                        <td> 90,000 frs</td>
                                    </tr>
                                    <tr>
                                        <td> 4th/5th Gen i5</td>
                                        <td> 100,000 frs</td>
                                    </tr>
                                    <tr>
                                        <td> 4th/5th Gen i7</td>
                                        <td> 120,000 frs</td>
                                    </tr>
                                </tbody>
                            </div>
                        </div>
                        <div className='col-5'>
                            <div className='table table-striped table-hover table-primary'>
                                <thead>
                                    <tr>
                                        <th> Laptop </th>
                                        <th> Base Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> 6th Gen i3</td>
                                        <td> 120,000 frs</td>
                                    </tr>
                                    <tr>
                                        <td> 6th Gen i5</td>
                                        <td> 140,000 frs</td>
                                    </tr>
                                    <tr>
                                        <td> 6th Gen i7</td>
                                        <td> 140,000 frs</td>
                                    </tr>
                                    <tr>
                                        <td> 7th Gen i3</td>
                                    </tr>
                                    <tr>
                                        <td> 7th Gen i5</td>
                                    </tr>
                                    <tr>
                                        <td> 7th Gen i7</td>
                                    </tr>
                                    <tr>
                                        <td> 8th Gen i3</td>
                                    </tr>
                                    <tr>
                                        <td> 8th Gen i5</td>
                                    </tr>
                                    <tr>
                                        <td> 8th Gen i7</td>
                                    </tr>

                                </tbody>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className='col-5  card'>
                <div className='card-body'>
                    <div className='table table-striped table-hover table-primary '>
                        <thead className="thead-dark">
                            <tr>
                                <th> Accessories And Additions</th>
                                <th> Base Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> Charger</td>
                                <td> 5,000 frs</td>
                            </tr>
                            <tr>
                                <td> Mouse</td>
                                <td> 1,000 frs</td>
                            </tr>
                            <tr>
                                <td> Keyboard</td>
                                <td> 1,000 frs</td>
                            </tr>
                            <tr>
                                <td> VGA Cable</td>
                                <td> 500 frs</td>
                            </tr>
                            <tr>
                                <td> Power Cable</td>
                                <td> 300 frs</td>
                            </tr>
                            <tr>
                                <td> 4th/5th Generation Laptop with graphics card</td>
                                <td> 10,000 frs</td>
                            </tr>
                            <tr>
                                <td> 6th Generation and Above Laptop with graphics card</td>
                                <td> xx,000 frs</td>
                            </tr>
                        </tbody>
                    </div>
                </div>
            </div>
        </div>
    }

}