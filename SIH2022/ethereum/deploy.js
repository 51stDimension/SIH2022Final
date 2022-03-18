const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/FIRFactory.json');

const provider = new HDWalletProvider(
    'meat sadness arrive female rich talk head ball lyrics stay gorilla chuckle',
    'https://rinkeby.infura.io/v3/3f22f0fbf7064b2b857678b272c381ee'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    compiledFactory.abi
  ).deploy({ data: compiledFactory.evm.bytecode.object}).send({ gas: '2000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
