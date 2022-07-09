require( "@nomiclabs/hardhat-waffle" );
require( "@nomiclabs/hardhat-etherscan" );
require( 'dotenv' ).config();
require( "@nomiclabs/hardhat-etherscan" );

const ALCHEMY_API_KEY = 'VxUqn4se2WJB5c1cjJp9697wrWvV6AlH';
const RINKEBY_URL = '471e19c170100aefcaa1721a76ef86682752c8343c9373caebbc790482cc0787';

module.exports = {
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ ALCHEMY_API_KEY }`,
      accounts: [ RINKEBY_URL ],
    },
  },
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    artifacts: '../src/artifacts',
  },
  etherscan: {
    apiKey: "CJJTBF2QU4T4S8GIHRND9TF8TJQ7TAEKFQ"
  }

}