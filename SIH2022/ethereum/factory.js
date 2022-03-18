import web3 from "./web3";
import FIRFactory from './build/FIRFactory.json'

const instance  = new web3.eth.Contract(
     FIRFactory.abi,
    '0x317E9ad7adA04DE8749EAeF4aaA4Ddd65481e55E'
);

export default instance;
