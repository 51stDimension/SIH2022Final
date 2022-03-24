import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card,Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Layout from '../components/Layout';
import {Link} from '../routes';
import Fir from '../ethereum/fir';
import { Loader } from 'semantic-ui-react';

class FIRIndex extends Component {

    state = {
        firCards:[],
        loading:false
    };

    static async getInitialProps() {
        const firs = await factory.methods.getDeployedFIRs().call();
        return { firs: firs };
    }

    async componentDidMount(){
        await this.renderFIRs();
    }
    // async componentDidMount(){
    //     const campaigns = await factory.methods.getDeployedCampaigns().call();
    //     console.log(campaigns);
    // }
    async renderFIRs() {
        const items = [];
        this.setState({loading:true});
        for(let i=0; i < this.props.firs.length; i++){
            let address = this.props.firs[i];
            let fir = Fir(address);
            let firDetails = await fir.methods.getDetails().call();
            items.push({
                        header:('Complainant: ' + firDetails[2]),
                        description:(
                        <Link route={`/firs/${address}`}>
                            <a>View FIR</a>
                        </Link>
                        ),
                        meta:(
                            'Brief: ' + firDetails[1] + ' Address: '+ firDetails[0]
                        ),
                        fluid: true
                    });
        }
        this.setState({loading:false});
        this.setState({firCards: <Card.Group items={items} />});
    }

    render() {
        return(
            <Layout>
                <div>
                    <h3>All Open FIRs</h3>
                    <Loader active={this.state.loading} size='large' inline='centered'>Fetching FIRs..</Loader>
                    <Link route="/firs/new">
                        <Button floated="right" content='File a FIR' icon='add circle' labelPosition='left' primary />
                    </Link>
                    {this.state.firCards}
                </div>
            </Layout>
        );
    }
}

export default FIRIndex;
