import web3 from "./web3";
import FIR from './build/FIR.json'

export default (address) => {
    return new web3.eth.Contract(FIR.abi,address);
};
