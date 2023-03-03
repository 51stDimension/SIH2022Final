## Installation

Project requires flask, react and next

Install the dependencies and devDependencies and start the node server.

```sh
cd SIH2022
npm install
npm run dev
```

Start the flask server
```sh
flask run
```

Make sure you download all the packages mentioned in ```app.py```
Might face some issues while ```pip install geopandas ```

Download these two files and run pip install on them locally for gdal and fiona
```GDAL-3.4.1-cp38-cp38-win_amd64.whl ```
```Fiona-1.8.21-cp38-cp38-win_amd64.whl```

Install the files by going to the path where it is installed and running ```pip install GDAL-3.4.1-cp38-cp38-win_amd64.whl``` and ```pip install Fiona-1.8.21-cp38-cp38-win_amd64.whl```

## Potential Errors
Instructions on how to install the above mentioned files

| For | Link | File Name
| ------ | ------ | ------ |
| Fiona | https://www.lfd.uci.edu/~gohlke/pythonlibs/#fiona | Fiona-1.8.21-cp38-cp38-win_amd64.whl
| GDAL | https://www.lfd.uci.edu/~gohlke/pythonlibs/#gdal | GDAL-3.4.1-cp38-cp38-win_amd64.whl

## Metamask Setup

For making any kind of transactions you will need metamask chrome extension
| For | Link |
| ------ | ------ |
| MetaMask Setup:(Make sure you save the secret message mnemonic somewhere)| https://www.youtube.com/watch?v=afATAw7iuUM
| Filling up your metamask account with Ether:| https://faucets.chain.link/rinkeby
| To see all the deployed assets on Rinkeby TestNet: | https://rinkeby.etherscan.io/
