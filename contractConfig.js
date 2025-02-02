// monad-randomizer/contractConfig.js

// Адрес контракта, который у вас задеплоен в Monad Devnet
export const MYNFT_ADDRESS = "0x0D8e5ed789a5E717d557a592bd2b674ADa513583";

// Сокращённый пример ABI
export const MYNFT_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_imageURI", "type": "string" },
      { "internalType": "string", "name": "_phrase", "type": "string" }
    ],
    "name": "mintNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
];