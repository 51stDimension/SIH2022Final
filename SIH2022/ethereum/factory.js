import web3 from "./web3";
import FIRFactory from './build/FIRFactory.json'

const instance  = new web3.eth.Contract(
     FIRFactory.abi,
    '0x0be368bC7C0B2d46D7aFf69b12948Da5C921B4be'
);

export default instance;
