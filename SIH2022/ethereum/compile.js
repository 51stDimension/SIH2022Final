const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");//Short for file system

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const firPath = path.resolve(__dirname, "contracts", "FIR.sol");
const source = fs.readFileSync(firPath, "utf8");
const input = {
  language: 'Solidity',
  sources: {
    'FIR.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['FIR.sol'];

fs.ensureDirSync(buildPath);//Recreate the build folder
for (let contract in output) {
  console.log(contract);
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
