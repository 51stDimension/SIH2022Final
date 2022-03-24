import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
import Layout from '../components/Layout'
import {Router} from '../routes';

export default class Test extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
      success: 'Please hold the QR code in front of the camera'
    }

    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    if(data?.text){
        console.log('Redirecting to :' , data.text);
        this.setState({
            success: 'Scan was successful. Redirecting to your FIR status page..',
        })
        Router.push(data.text);
    }
  }
  handleError(err){
    console.error(err)
  }
  render(){
    const previewStyle = {
      height: 1000,
      width: 320,
    }

    return(
     <Layout>
         <div >
            <QrReader
                delay={this.state.delay}
                onError={this.handleError}
                onScan={this.handleScan}
                />
            {/* <p>{this.state.result}</p> */}
        </div>
        <h3>{this.state.success}</h3>
     </Layout>
    )
  }
}