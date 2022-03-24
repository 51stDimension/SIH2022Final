import React, { Component } from 'react'
import Layout from '../../components/Layout'
import QRCode from "qrcode.react";


export default class getqr extends Component {
    static async getInitialProps(props){
        return {
            address:props.query.address
        };
    }
    render() {
        return (
            <Layout>
                <h3>QR Code</h3>
                <div>
                    <QRCode
                    value={"http://localhost:3000/firs/" + this.props.address} style={{ marginRight: 50 }}/>
                    <p>This QR can be used to directly access the FIR filed</p>
                </div>
                {/* <h1>{this.props.address}</h1> */}
            </Layout>
        )
    }
}