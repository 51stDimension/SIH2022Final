import web3 from "./web3";
import FIRFactory from './build/FIRFactory.json'

const instance  = new web3.eth.Contract(
     FIRFactory.abi,
    '0x95DDBadFba05ce399a83e3557c2110601A57a3B5'
);

export default instance;
