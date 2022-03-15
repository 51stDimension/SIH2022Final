import React, { Component } from 'react';
import factory from '../ethereum/factory';
import { Card,Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Layout from '../components/Layout';
import {Link} from '../routes';


class FIRIndex extends Component {
    static async getInitialProps() {
        const firs = await factory.methods.getDeployedFIRs().call();

        return { firs: firs };
    }

    // async componentDidMount(){
    //     const campaigns = await factory.methods.getDeployedCampaigns().call();
    //     console.log(campaigns);
    // }
    renderFIRs() {
        const items = this.props.firs.map(address => {
            return {
                header: address,
                description:(
                  <Link route={`/firs/${address}`}>
                    <a>View FIR</a>
                  </Link>
                ),
                fluid: true
            }
        });

        return <Card.Group items={items} />;
    }

    render() {
        return(
            <Layout>
                <div>
                    <h3>All Open FIRs</h3>
                    <Link route="/firs/new">
                        <Button floated="right" content='File a FIR' icon='add circle' labelPosition='left' primary />
                    </Link>
                    {this.renderFIRs()}
                </div>
            </Layout>
        );
    }
}

export default FIRIndex;
