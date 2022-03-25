import React, { Component } from 'react';
import factory from '../ethereum/factory';
import 'semantic-ui-css/semantic.min.css';
import {Card, Button, Checkbox, Form, Message, Icon, Modal } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react'
import Layout from '../components/Layout';
import {Link} from '../routes';
import SearchExampleStandard from './searchdist';
import { Input } from 'semantic-ui-react';
import FoliumMap from './folium';


class CheckStats extends Component{

    state = {
        stateName:'',
        crimeName:'',
        errorMessage:'',
        mapVisible: false,
        imageURL:'',
        open:false,
        size:undefined,
        lat:19.83509174603177,
        long:85.86698989898981,
        yourlat:0,
        yourlong:0,
        geostatus:'',
        loadNow:false
    };

    constructor(props){
        super(props);
    }

    // http://127.0.0.1:5000/getmap?state=Maharashtra&case=Murder
    getURL(){
        return `http://127.0.0.1:5000/getmap?state=${this.state.stateName}&case=${this.state.crimeName}`;
    }

    onSubmit = (event) => {
        event.preventDefault();//Will keep the browser from attempting to submit the form
        this.setState({imageURL:this.getURL()});
    };


    getLocation = async () =>{
        if (!navigator.geolocation) {
            this.setState({geostatus:'Geolocation is not supported by your browser'});
        } 
        else {
            this.setState({loadNow:true , geostatus:'locating..'});
            await navigator.geolocation.getCurrentPosition((position) => {
                this.setState({geostatus:'Updating Data' , yourlat:position.coords.latitude , yourlong:position.coords.longitude});
            },() => {
                this.setState({geostatus:'Unable to retrieve your location'});
            });
            this.setState({loadNow:false});
        }
    }

    render(){
        let mapImage; 
        mapImage = <img src={this.state.imageURL}/>
        console.log(this.state.yourlat,this.state.yourlong);
        return(
        <Layout>
            <h3>Select State and Crime Type</h3>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>State</label>
                    <input
                        placeholder='Select state'
                        value={this.state.stateName}
                        onChange={event => this.setState({stateName:event.target.value})}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Case Type</label>
                    <input
                        placeholder='Select Case Type'
                        value={this.state.crimeName}
                        onChange={event => this.setState({crimeName:event.target.value})}
                    />
                </Form.Field>
                <Message error header="Oopsie!" content={this.state.errorMessage}/>
                <Button type='submit'>Submit</Button>
            </Form>
            {mapImage}
            <hr></hr>
            <h3>View Crime Hotspots around you</h3>
            <Input
                label={{ basic: true, content: 'Your Latitude' }}
                labelPosition='left'
                value={this.state.yourlat}
                onChange={event => this.setState({yourlat:event.target.value})}
            />
            <Input
                label={{ basic: true, content: 'Your Longitude' }}
                labelPosition='left'
                value={this.state.yourlong}
                style={{padding:'15px'}}
                onChange={event => this.setState({yourlong:event.target.value})}
            />
            <Button onClick={this.getLocation} loading={this.state.loadNow}>Load with my Coordinates</Button>
            <FoliumMap lat={this.state.yourlat} long={this.state.yourlong}></FoliumMap>
            <hr/>
            <h3>Analyze District</h3>
            <SearchExampleStandard></SearchExampleStandard>
        </Layout>
        );
    }
}
export default CheckStats;
