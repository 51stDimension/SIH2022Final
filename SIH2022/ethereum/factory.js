import web3 from "./web3";
import FIRFactory from './build/FIRFactory.json'

const instance  = new web3.eth.Contract(
     FIRFactory.abi,
    '0x4fD1165C15Ce7AB5550d985f11D45f3d7c79F3fd'
);

export default instance;
