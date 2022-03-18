import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Fir from '../../ethereum/fir';
import {Card} from 'semantic-ui-react';
import { Button, Checkbox, Form, Message } from 'semantic-ui-react';
import {Link} from '../../routes';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';


class FIRUpdate extends Component{

  state = {
    fullName:'',
    caseUpdateLog:'',
    errorMessage:'',
    loading:false
  };

  static async getInitialProps(props){
    return {
      address:props.query.address
    };
  }

  onSubmit = async (event,props) => {
    event.preventDefault();//Will keep the browser from attempting to submit the form

    this.setState({loading:true,errorMessage:''});
    try{
      const accounts = await web3.eth.getAccounts();
      const fir = Fir(this.props.address);
      await fir.methods.updateCaseStatus(this.state.fullName,this.state.caseUpdateLog)
      .send({
        from:accounts[0]
      });
      Router.pushRoute('/');
    } catch(err){
      this.setState({errorMessage:err.message})
    }
    this.setState({loading:false});
  };

  render(){
    return(
      <Layout>
        <h3>Update Case Status</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <label>Full Name</label>
              <input
                placeholder='Type your full name'
                value={this.state.fullName}
                onChange={event => this.setState({fullName:event.target.value})}
              />
            </Form.Field>
            <Form.Field>
              <label>Case Update Log</label>
              <input
                placeholder='Type Case Update Comment'
                value={this.state.caseUpdateLog}
                onChange={event => this.setState({caseUpdateLog:event.target.value})}
              />
            </Form.Field>
            <Message error header="Oopsie!" content={this.state.errorMessage}/>
            <Button loading={this.state.loading} type='submit'>Submit</Button>
        </Form>
      </Layout>
    );
  }
}
export default FIRUpdate;
