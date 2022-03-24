import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Button, Checkbox, Form, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';

class FIRNew extends Component{
  state = {
    fullName:'',
    caseSummary:'',
    errorMessage:'',
    loading:false
  };
  onSubmit = async (event) => {
    event.preventDefault();//Will keep the browser from attempting to submit the form

    this.setState({loading:true,errorMessage:''});
    try{
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createFIR(this.state.caseSummary,this.state.fullName).send({
        from:accounts[0]
      });
      const addr = await factory.methods.getLatestFIR().call();
      console.log('New FIR made at address',addr);
      Router.pushRoute('/firs/getqr/' + addr);
    } catch(err){
      this.setState({errorMessage:err.message})
    }
    this.setState({loading:false});
  };
  
  render(){
    return(
        <Layout>
          <h3>File your FIR</h3>
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
                <label>Case Summary</label>
                <input
                  placeholder='Type your Case Summary'
                  value={this.state.caseSummary}
                  onChange={event => this.setState({caseSummary:event.target.value})}
                />
              </Form.Field>
              <Message error header="Oopsie!" content={this.state.errorMessage}/>
              <Button loading={this.state.loading} type='submit'>Submit</Button>
          </Form>
        </Layout>
    );
  }
}


export default FIRNew;
