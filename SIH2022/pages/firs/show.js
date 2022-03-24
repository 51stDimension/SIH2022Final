import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Fir from '../../ethereum/fir';
import {Card} from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import {Link} from '../../routes';
import ProgressExampleIndicating from './progress';

class FIRShow extends Component{

  state = {
    desc:'No progress yet'
  }

  static async getInitialProps(props){
    console.log(props.query.address);
    const fir = Fir(props.query.address);
    const firDetails = await fir.methods.getDetails().call();
    // console.log(firDetails);

    const stat = await fir.methods.getStatus().call();
    const logs = await fir.methods.getAllUpdateLogs().call();
    // this.setState({desc:this.props.logs);
    
    return {
      address:props.query.address,
      victimAddress:firDetails[0],
      caseSummary:firDetails[1],
      victimName:firDetails[2],
      status:stat,
      logs:logs
    };
  }

  renderCards(){
    const {
      victimAddress,
      caseSummary,
      victimName
    } = this.props;
    const items = [
      {
        header:victimName,
        description:"Victim's full name",
        style:{overflowWrap:'break-word'}
      },
      {
        header:victimAddress,
        meta:'Address of Victim',
        description:"Victim has complete access to this FIR's stats",
        style:{overflowWrap:'break-word'}
      },
      {
        header:caseSummary,
        meta:"Brief about Victim's Case",
        description:"This is just a summary of victim's case to get an Idea about the case",
        style:{overflowWrap:'break-word'}
      }
    ];

    return <Card.Group items={items} />;
  }

  renderUpdates(){
    const items = this.props.logs.map(aboutUpdate => {
        return {
            header:'Updated by: '+aboutUpdate[1],
            description:aboutUpdate[2],
            meta:'Address: '+aboutUpdate[0],
            fluid: true
        }
    });
    // this.setState({desc:items[items.length-1].description});
    console.log(this.props.logs);
    return <Card.Group items={items} />;
  }

  render(){
    return(
      <Layout>
        <h3>About FIR</h3>
        {this.renderCards()}
        <h3>Current status of the FIR: {this.props.logs[this.props.logs.length - 1][2]}</h3>
        
        <Link route={`/firs/${this.props.address}/update`}>
            <Button content='Update Case Status' icon='sort amount up' labelPosition='left' primary />
        </Link>
        <h3>All transactions/Updates related to this contract will be shown here:</h3>
        <hr/>
        {this.renderUpdates()}
      </Layout>
    );
  }
}
export default FIRShow;
