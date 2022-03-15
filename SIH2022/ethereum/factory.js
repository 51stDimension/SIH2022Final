import web3 from "./web3";
import FIRFactory from './build/FIRFactory.json'

const instance  = new web3.eth.Contract(
     FIRFactory.abi,
    '0xa5AF1b601Dd11AA149D1479C3be7c9b661d23816'
);

export default instance;
