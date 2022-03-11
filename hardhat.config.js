require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-etherscan')
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
  networks: {
    polygon: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/2oZJkZRNl41dCSNJX7REyWT04wanFhgF',
      accounts: [
        '0x3aa8c280f6a6e07b0eb5d046eaa92330a51f226d6f4a47945145bb613f4dbc31',
      ],
    },
  },
  // etherscan: { apiKey: 'SV9BIA5J7UBGZN9G8QUAR455AGVJU3HNN7' },
  etherscan: { apiKey: 'JTTN4EDBCXRHEV39ZCFGNFWV8PEXE1AY8B' },
}
